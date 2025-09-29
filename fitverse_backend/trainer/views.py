from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Trainer
from .serializers import TrainerSerializer

@api_view(['GET'])
def trainer_list(request):
    trainers = Trainer.objects.all()
    serializer = TrainerSerializer(trainers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def trainer_detail(request, pk):
    try:
        trainer = Trainer.objects.get(id=pk)
    except Trainer.DoesNotExist:
        return Response({"error": "Trainer not found"}, status=404)
    serializer = TrainerSerializer(trainer)
    return Response(serializer.data)

@api_view(['POST'])
def create_trainer(request):
    serializer = TrainerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
