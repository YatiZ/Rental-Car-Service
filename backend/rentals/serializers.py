from rest_framework import serializers

from . models import Homes

class HomesListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homes
        fields = '__all__'