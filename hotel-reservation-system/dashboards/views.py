from rest_framework.views import APIView
from rest_framework.response import Response
from hotel_reservation_system.permissions import IsAdmin, IsReceptionist
from reservations.models import Reservation
from payments.models import Payment
from rooms.models import Room, RoomType
from django.db.models import Sum, Count, Q
from django.utils.dateparse import parse_date
from hotel_reservation_system.permissions import IsCustomer
from django.utils.timezone import now

class AdminDashboardView(APIView):
    permission_classes = [IsAdmin | IsReceptionist]

    def get(self, request):
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        reservations = Reservation.objects.all()
        payments = Payment.objects.all()

        if start_date:
            start_date_parsed = parse_date(start_date)
            reservations = reservations.filter(check_in__gte=start_date_parsed)
            payments = payments.filter(created_at__date__gte=start_date_parsed)
        if end_date:
            end_date_parsed = parse_date(end_date)
            reservations = reservations.filter(check_out__lte=end_date_parsed)
            payments = payments.filter(created_at__date__lte=end_date_parsed)

        total_reservations = reservations.count()
        reservations_by_status = reservations.values('status').annotate(count=Count('id'))

        total_payments = payments.aggregate(total_amount=Sum('amount'))['total_amount'] or 0
        payments_by_status = payments.values('status').annotate(count=Count('id'))

        total_rooms = Room.objects.count()
        occupied_rooms = reservations.filter(status='confirmed').count()
        occupancy_rate = (occupied_rooms / total_rooms * 100) if total_rooms else 0

        revenue_per_room_type = RoomType.objects.annotate(
            revenue=Sum(
                'rooms__reservations__total_price',
                filter=Q(rooms__reservations__status='confirmed') &
                       (Q(rooms__reservations__check_in__gte=parse_date(start_date)) if start_date else Q()) &
                       (Q(rooms__reservations__check_out__lte=parse_date(end_date)) if end_date else Q())
            )
        ).values('name', 'revenue')

        data = {
            "total_reservations": total_reservations,
            "reservations_by_status": list(reservations_by_status),
            "total_payments": total_payments,
            "payments_by_status": list(payments_by_status),
            "occupancy_rate": occupancy_rate,
            "revenue_per_room_type": list(revenue_per_room_type),
        }

        return Response(data)

class CustomerDashboardView(APIView):
    permission_classes = [IsCustomer]

    def get(self, request):
        user = request.user
        today = now().date()

        reservations = Reservation.objects.filter(guest=user)
        total_reservations = reservations.count()
        upcoming_checkins = reservations.filter(check_in__gte=today).order_by('check_in')

        payments = Payment.objects.filter(reservation__guest=user)
        total_payments = payments.aggregate(total_amount=Sum('amount'))['total_amount'] or 0
        pending_payments = payments.filter(status='pending').aggregate(Sum('amount'))['amount__sum'] or 0

        data = {
            "total_reservations": total_reservations,
            "upcoming_checkins": list(upcoming_checkins.values('id', 'room_id', 'check_in', 'check_out', 'status')),
            "total_payments": total_payments,
            "pending_payments": pending_payments,
        }

        return Response(data)
