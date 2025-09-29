from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .serializers import LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .serializers import UserSerializer
# from .permissions import IsAdminUserRole

class RoleLoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        # create JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'role': user.role,
            'username': user.username
        }, status=status.HTTP_200_OK)
    

class MemberViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(role='member')
    serializer_class = UserSerializer
    # permission_classes = [IsAdminUserRole]

class TrainerViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(role='trainer')
    serializer_class = UserSerializer
    # permission_classes = [IsAdminUserRole]
