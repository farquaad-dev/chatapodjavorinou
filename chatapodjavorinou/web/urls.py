from django.urls import path
from .views import *

urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('o-chate', AboutPageView.as_view(), name='about'),
    path('okolie', ActivitiesPageView.as_view(), name='activities'),
    path('kontakt', ContactPageView.as_view(), name='contact'),

]