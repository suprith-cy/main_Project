from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WorkoutViewSet, AttendanceViewSet, BMIViewSet, UserProfile, CustomTokenObtainPairView, DietPlanViewSet
from rest_framework_simplejwt.views import TokenRefreshView

# ------------------ Router for ModelViewSets ------------------
router = DefaultRouter()
router.register(r'workouts', WorkoutViewSet, basename='workouts')
router.register(r'attendance', AttendanceViewSet, basename='attendance')
router.register(r'bmi', BMIViewSet, basename='bmi')
router.register(r'dietplans', DietPlanViewSet, basename='dietplans')

# ------------------ URL Patterns ------------------
urlpatterns = [
    # JWT Token endpoints
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # User profile
    path('users/', UserProfile.as_view(), name='user-profile'),

    # Include router URLs
    path('', include(router.urls)),
]
