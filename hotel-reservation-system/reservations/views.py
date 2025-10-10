from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Reservation
from .serializers import ReservationSerializer
from hotel_reservation_system.permissions import IsOwnerOrAdminOrReceptionist

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.select_related('guest', 'room').all()
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsOwnerOrAdminOrReceptionist()]
        return [IsAuthenticated()]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if user.is_staff:
            status_param = self.request.query_params.get('status')
            guest_param = self.request.query_params.get('guest')
            if status_param:
                queryset = queryset.filter(status=status_param)
            if guest_param:
                queryset = queryset.filter(guest_id=guest_param)
            return queryset
        queryset = queryset.filter(guest=user)
        status_param = self.request.query_params.get('status')
        if status_param:
            queryset = queryset.filter(status=status_param)
        return queryset

    def perform_create(self, serializer):
        serializer.save(guest=self.request.user)
