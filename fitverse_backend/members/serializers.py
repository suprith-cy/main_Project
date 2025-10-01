from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Workout, Attendance, BMI, DietPlan

# ------------------ User Serializer ------------------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id', 'username', 'email']

# ------------------ Workout Serializer ------------------
class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Workout
        fields = '__all__'

# ------------------ Attendance Serializer ------------------
class AttendanceSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    user = serializers.StringRelatedField(read_only=True)  # Show username instead of ID

    class Meta:
        model = Attendance
        fields = '__all__'

# ------------------ BMI Serializer ------------------
class BMISerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    bmi_value = serializers.ReadOnlyField()  # Calculated automatically
    category = serializers.ReadOnlyField()   # Calculated automatically
    date = serializers.ReadOnlyField()       # Auto-set when record is created

    class Meta:
        model = BMI
        fields = ['id', 'member', 'date', 'weight', 'height', 'bmi_value', 'category']


# ---------------------------------------------------------------------------------------

class DietPlanSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    date = serializers.ReadOnlyField()  # auto-set date

    class Meta:
        model = DietPlan
        fields = ['id', 'member', 'date', 'plan_name', 'breakfast', 'lunch', 'dinner', 'snacks', 'calories']


