from django.views.generic.base import TemplateView


# Create your views here.

class HomePageView(TemplateView):
    template_name = 'web/home.html'


class AboutPageView(TemplateView):
    template_name = 'web/o_chate.html'
