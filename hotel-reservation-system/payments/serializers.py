from rest_framework import serializers
from .models import Payment
from reservations.models import Reservation

class PaymentSerializer(serializers.ModelSerializer):
    reservation = serializers.PrimaryKeyRelatedField(queryset=Reservation.objects.all())

    class Meta:
        model = Payment
        fields = [
            'id',
            'reservation',
            'amount',
            'method',
            'status',
            'transaction_id',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_reservation(self, value):
        user = self.context['request'].user
        if not user.is_staff and value.guest != user:
            raise serializers.ValidationError("You can only make payments for your own reservations.")
        return value
