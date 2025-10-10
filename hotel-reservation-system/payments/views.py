from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Payment
from .serializers import PaymentSerializer
from hotel_reservation_system.permissions import IsOwnerOrAdminOrReceptionist

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.select_related('reservation', 'reservation__guest').all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsOwnerOrAdminOrReceptionist()]
        return [IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        queryset = super().get_queryset()

        if not user.is_staff:
            queryset = queryset.filter(reservation__guest=user)

        status_param = self.request.query_params.get('status')
        if status_param:
            queryset = queryset.filter(status=status_param)
        reservation_param = self.request.query_params.get('reservation')
        if reservation_param:
            queryset = queryset.filter(reservation_id=reservation_param)

        return queryset

    def perform_create(self, serializer):
        serializer.save()
