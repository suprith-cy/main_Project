from rest_framework import serializers
from django.contrib.auth.hashers import check_password
from .models import UserTable

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    role = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        role = data.get('role').capitalize()  # normalize to match choice

        try:
            user = UserTable.objects.get(username=username)
        except UserTable.DoesNotExist:
            raise serializers.ValidationError("Invalid username or password")

        if not check_password(password, user.password):
            raise serializers.ValidationError("Invalid username or password")

        if user.role != role:
            raise serializers.ValidationError(f"User is not a {role}")

        data['user'] = user
        return data

    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTable
        fields = ['id', 'username', 'password', 'role']