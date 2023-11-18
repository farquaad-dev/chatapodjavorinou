from django.urls import path
from .views import *

urlpatterns = [
    path('', ReservationFormView.as_view(), name='reservation'),
]