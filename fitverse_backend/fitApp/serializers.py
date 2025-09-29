from rest_framework import serializers
from django.contrib.auth import authenticate

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=['admin', 'trainer', 'member'])

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        role = data.get('role')

        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError("Invalid username or password")
        if user.role != role:
            raise serializers.ValidationError(f"User is not a {role}")

        data['user'] = user
        return data
