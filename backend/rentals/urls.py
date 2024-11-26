from django.urls import path
from .import api
from . views import CarListView

urlpatterns = [
    #user
    path('api/users',api.get_user, name='api-get-user'),
    path('api/user/<int:user_id>',api.get_each_user, name='get-each-user'),

    #car
    path('api/cars', api.car_list, name='api_car_list'),
    path('api/carList',CarListView.as_view(), name='car-list'),
    path('api/cars/<uuid:id>/',api.car_detail, name='api_car-detail'),

    #contact
    path('api/contact',api.contact_form, name='contact-form'),

    #renter
    path('api/renter_info/<int:id>',api.renter_info, name='renter_info'),
    path('api/renter_info_display/<int:id>',api.renter_info_display, name='api_renter_info_display'),
    path('api/renter_info_check/<int:id>',api.renter_info_check, name='renter-info-check'),
    path('api/update_renter_info/<int:id>',api.update_renter_info, name='update-renter-info'),

    #booking 
    path('api/booking/<uuid:id>',api.reservation, name='car-booking'),
    path('api/get_bookings/<uuid:id>',api.get_reservation, name='get-reservation'),
    path('api/rent-history/<int:user_id>',api.get_rented_history_by_user, name='get-history'),

    #review
    path('api/create-review/<int:id>',api.create_review, name='create-review'),
    path('api/reviews',api.get_review, name='get-review'),
    path('api/filtered-reviews/<uuid:id>',api.filtered_review_by_car, name='filtered-review'),

    #favorite
    path('api/favorite/<uuid:id>',api.favorited_car, name='favorite'),
    path('api/get-favorite/<uuid:car_id>/<int:user_id>',api.get_favorite, name='get-favorite'),
    path('api/favorite-list/<int:user_id>',api.favorite_list, name='favorite-list'),
    path('api/remove-favorite/<uuid:car_id>/<int:user_id>',api.remove_favorite, name='remove-favorite'),
]
