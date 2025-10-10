from rest_framework import serializers
from .models import Reservation
from rooms.models import Room

class ReservationSerializer(serializers.ModelSerializer):
    guest = serializers.HiddenField(default=serializers.CurrentUserDefault())
    room = serializers.SlugRelatedField(slug_field='name', queryset=Room.objects.all())

    class Meta:
        model = Reservation
        fields = ['id', 'guest', 'room', 'check_in', 'check_out', 'total_price', 'status', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
