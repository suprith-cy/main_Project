from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .serializers import LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserTable
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer

class RoleLoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            print(serializer.errors)  # <-- see the exact validation error
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
    

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    print("ProfileView called")

    def get(self, request):
        user = UserTable.objects.first()
        serializer = UserSerializer(user)
        return Response(serializer.data)
    

class MemberViewSet(viewsets.ModelViewSet):
    queryset = UserTable.objects.filter(role='member')
    serializer_class = UserSerializer

class TrainerViewSet(viewsets.ModelViewSet):
    queryset = UserTable.objects.filter(role='trainer')
    serializer_class = UserSerializer
