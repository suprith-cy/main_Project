from django.db import models
from django.contrib.auth.hashers import make_password

class UserTable(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=20)

    def save(self, *args, **kwargs):
        # Hash the password if it’s not already hashed
        if not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} ({self.role})"
    

class AdminMember(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    plan = models.CharField(max_length=50)
    days_completed = models.IntegerField(default=0)
    days_remaining = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.name} ({self.username})"


class AdminTrainer(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    date_of_joining = models.DateField()

    def __str__(self):
        return f"{self.name} ({self.username})"