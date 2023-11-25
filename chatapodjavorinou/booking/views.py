from datetime import date

from django.utils import dates
from django.views.generic import FormView

from booking.forms import ReservationForm
from booking.models import Reservation


# Create your views here.
class ReservationFormView(FormView):
    template_name = 'booking/reservation.html'
    form_class = ReservationForm
    success_url = '/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        res = []
        for reservation in Reservation.objects.filter(date_start__gte=date.today()):
            res.append({
                'from': reservation.date_start,
                'to': reservation.date_end,
            })
        context['reservations'] = res

        context['days'] = list(dates.WEEKDAYS_ABBR.values())
        context['months'] = list(dates.MONTHS.values())

        return context

    def form_valid(self, form):
        form.save()
        return super().form_valid(form)
