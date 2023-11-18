from django.db import models

# Create your models here.
class Reservation(models.Model):
    name = models.CharField(max_length=32)
    surname = models.CharField(max_length=32)
    email = models.EmailField()
    phone = models.CharField(max_length=20)

    people = models.PositiveSmallIntegerField()
    date_start = models.DateField()
    date_end = models.DateField()

    message = models.TextField(blank=True)

    time_stamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.name} {self.surname} {self.date_start}'