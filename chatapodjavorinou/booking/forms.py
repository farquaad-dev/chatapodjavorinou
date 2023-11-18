from django.forms import ModelForm
from django.forms.utils import ErrorList

from booking.models import Reservation


class ReservationForm(ModelForm):
    class Meta:
        model = Reservation
        fields = ['name', 'surname', 'email', 'phone', 'people', 'date_start', 'date_end', 'message']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'w-full'
