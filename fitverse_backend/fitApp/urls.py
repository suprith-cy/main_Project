from django.urls import path, include
from .views import RoleLoginView
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import MemberViewSet, TrainerViewSet, ProfileView
from . import views

router = DefaultRouter()
router.register(r'admin/members', MemberViewSet, basename='members')
router.register(r'admin/trainers', TrainerViewSet, basename='trainers')

urlpatterns = [
    path('login/', RoleLoginView.as_view(), name='role_login'),  # role-based login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # refresh JWT
    path('routes/', include(router.urls)),
    path("profile/", ProfileView.as_view(), name="profile"),
    path('plan-counts/', views.plan_counts, name='plan_counts'),
]

