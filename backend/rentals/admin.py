from django.contrib import admin
from .models import Homes,Image, Car
# Register your models here.

admin.site.register(Homes)
admin.site.register(Image)

# class HomeAdmin(admin.ModelAdmin):
#     list_display = ('Home Names')

#     @admin.display(description='Home Names')
#     def display_home_name(self,obj):
#         return obj.title

admin.site.register(Car)