from django.forms import ModelForm
from booking.models import Reservation


class ReservationForm(ModelForm):
    class Meta:
        model = Reservation
        fields = ['name', 'surname', 'email', 'phone', 'people', 'date_start', 'date_end', 'message']