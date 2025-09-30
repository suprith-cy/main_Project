from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .serializers import LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserTable
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from django.http import JsonResponse
from django.db.models import Count, Sum, F
from .models import AdminMember, AdminTrainer


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
    

# Example plan details
PLAN_DETAILS = {
    "Silver": {"cost": 1000, "duration": "1 month"},
    "Gold": {"cost": 2500, "duration": "3 months"},
    "Platinum": {"cost": 4000, "duration": "6 months"},
}

def plan_counts(request):
    # 1. Total members
    total_members = AdminMember.objects.count()

    # 2. Total trainers
    total_trainers = AdminTrainer.objects.count()

    # 3. Members grouped by plan
    members_by_plan = AdminMember.objects.values('plan').annotate(count=Count('id'))

    # 4. Total revenue = sum of plan costs * number of members in each plan
    total_revenue = 0
    members_plan_dict = {}
    for m in members_by_plan:
        plan_name = m['plan']
        count = m['count']
        cost = PLAN_DETAILS.get(plan_name, {}).get('cost', 0)
        total_revenue += cost * count
        members_plan_dict[plan_name] = {
            "count": count,
            "cost": cost,
            "duration": PLAN_DETAILS.get(plan_name, {}).get('duration', "")
        }

    data = {
        "total_members": total_members,
        "total_trainers": total_trainers,
        "members_plan_details": members_plan_dict,
        "total_revenue": total_revenue
    }
    return JsonResponse(data)


    
class MemberViewSet(viewsets.ModelViewSet):
    queryset = UserTable.objects.filter(role='member')
    serializer_class = UserSerializer

class TrainerViewSet(viewsets.ModelViewSet):
    queryset = UserTable.objects.filter(role='trainer')
    serializer_class = UserSerializer
