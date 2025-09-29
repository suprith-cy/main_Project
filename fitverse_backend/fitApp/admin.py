from django.contrib import admin
from .models import UserTable, AdminMember, AdminTrainer


admin.site.register(UserTable)
admin.site.register(AdminMember)
admin.site.register(AdminTrainer)
