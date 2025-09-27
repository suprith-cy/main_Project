from django.urls import path
from .views import RoleLoginView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('login/', RoleLoginView.as_view(), name='role_login'),  # role-based login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # refresh JWT
]

