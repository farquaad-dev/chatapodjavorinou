from django.shortcuts import render
from django.views.generic import FormView
from booking.forms import ReservationForm


# Create your views here.
class ReservationFormView(FormView):
    template_name = 'booking/reservation.html'
    form_class = ReservationForm
    success_url = '/'

    def form_valid(self, form):
        form.save()
        return super().form_valid(form)
