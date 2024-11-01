from .models import UserAccount
from rest_framework import serializers

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = (
            'id','name','email','avatar'
        )