from django.urls import path
from . import views

urlpatterns = [
    path('', views.trainer_list, name='trainer-list'),
    path('<int:pk>/', views.trainer_detail, name='trainer-detail'),
    path('create/', views.create_trainer, name='create-trainer'),
]
