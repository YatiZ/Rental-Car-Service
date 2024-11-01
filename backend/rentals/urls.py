from django.urls import path
from .import api
from . views import CarListView

urlpatterns = [
    path('api/cars', api.car_list, name='api_car_list'),
    path('api/carList',CarListView.as_view(), name='car-list'),
    path('api/cars/<uuid:id>/',api.car_detail, name='api_car-detail'),
    path('api/contact',api.contact_form, name='contact-form'),
    path('api/renter_info/<int:id>',api.renter_info, name='renter_info'),
    path('api/renter_info_display/<uuid:id>',api.renter_info_display, name='api_renter_info_display'),
    path('api/renter_info_check/<int:id>',api.renter_info_check, name='renter-info-check'),
    path('api/update_renter_info/<int:id>',api.update_renter_info, name='update-renter-info'),
]
