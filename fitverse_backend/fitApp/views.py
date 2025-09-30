from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .serializers import LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserTable
from .serializers import UserSerializer
from .models import AdminMember, AdminTrainer
from .serializers import AdminMemberSerializer, AdminTrainerSerializer

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
    

class MemberViewSet(viewsets.ModelViewSet):
    queryset = AdminMember.objects.all()
    serializer_class = AdminMemberSerializer


class TrainerViewSet(viewsets.ModelViewSet):
    queryset = AdminTrainer.objects.all()
    serializer_class = AdminTrainerSerializer
