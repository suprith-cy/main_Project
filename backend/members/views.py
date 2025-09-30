from rest_framework import viewsets, permissions
from .models import Workout, Attendance, BMI, DietPlan
from .serializers import WorkoutSerializer, AttendanceSerializer, UserSerializer, BMISerializer, DietPlanSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# ------------------ JWT Token View ------------------
class CustomTokenObtainPairView(TokenObtainPairView):
    """
    View to obtain JWT access and refresh tokens.
    """
    pass  # Extend here if you want custom claims

# ------------------ Workout View ------------------
class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticated]  # Only logged-in users can access

# ------------------ Attendance View ------------------
class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [permissions.IsAuthenticated]

# ------------------ BMI View ------------------
class BMIViewSet(viewsets.ModelViewSet):
    queryset = BMI.objects.all()
    serializer_class = BMISerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Members see only their BMI records, Admin/Coach can see all
        user = self.request.user
        if user.is_staff:  # admin/coach
            return BMI.objects.all()
        return BMI.objects.filter(member=user)
    
# -------------------------------------------------------------------------------

class DietPlanViewSet(viewsets.ModelViewSet):
    queryset = DietPlan.objects.all()
    serializer_class = DietPlanSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:  # Admin/Coach can see all plans
            return DietPlan.objects.all()
        return DietPlan.objects.filter(member=user)

# --------------------------------------------------------------------------

# ------------------ User Profile View ------------------
class UserProfile(APIView):
    """
    Returns the details of the logged-in user.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
