from django.db import models

class Trainer(models.Model):
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100, blank=True)
    experience = models.IntegerField(default=0)

    def __str__(self):
        return self.name
