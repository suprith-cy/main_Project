from django.db import models
from django.contrib.auth.models import User

class Workout(models.Model):
    member = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)

class Attendance(models.Model):
    member = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=10, choices=[('Present','Present'),('Absent','Absent')])


# --------------------------------------------------------------------------------------------------------------


from django.db import models
from django.contrib.auth.models import User

class BMI(models.Model):
    member = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)  # automatically set date when created
    weight = models.FloatField(help_text="Weight in kg")
    height = models.FloatField(help_text="Height in meters")
    bmi_value = models.FloatField(blank=True, null=True)
    category = models.CharField(max_length=50, blank=True)  # Underweight, Normal, Overweight, Obese

    def save(self, *args, **kwargs):
        # Calculate BMI automatically before saving
        if self.height > 0:
            self.bmi_value = self.weight / (self.height ** 2)
            if self.bmi_value < 18.5:
                self.category = "Underweight"
            elif 18.5 <= self.bmi_value < 25:
                self.category = "Normal"
            elif 25 <= self.bmi_value < 30:
                self.category = "Overweight"
            else:
                self.category = "Obese"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.member.username} - {self.bmi_value} ({self.category})"
    
# --------------------------------------------------------------------------------------------------

class DietPlan(models.Model):
    member = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    plan_name = models.CharField(max_length=100)
    breakfast = models.TextField(blank=True)
    lunch = models.TextField(blank=True)
    dinner = models.TextField(blank=True)
    snacks = models.TextField(blank=True)
    calories = models.FloatField(blank=True, null=True)

    def __str__(self):
        return f"{self.member.username} - {self.plan_name} ({self.date})"



