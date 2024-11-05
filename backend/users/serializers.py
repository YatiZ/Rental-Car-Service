from .models import UserAccount
from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
import re

class UserAccountSerializer(UserCreateSerializer):
    class Meta:
        model = UserAccount
        fields = ['email','password','name','avatar']
        extra_kwargs = {'password':{'write_only': True}}

    def validate_email(self, value):
        """Custom email validation"""
        if '@' not in value:
            raise serializers.ValidationError("Please enter a valid email address")
        
        #check for a valid email pattern
        email_regex = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
        if not re.match(email_regex, value):
            raise serializers.ValidationError("Invalid email format.")

        return value
    
    def validate_password(self, value):
        """Custom password validation for length and complexity."""
        if len(value) <8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        
        return value
    
    def create(self,validated_data):
        user = UserAccount.objects.create_user(**validated_data)
        return user