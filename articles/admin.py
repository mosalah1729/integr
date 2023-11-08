from django.contrib import admin

# Register your models here.
from .models import Movie
# from .models import Movienow
# from .models import Movieup
from .models import Showtime
from .models import Booking
from .models import Theatre
from .models import Screen
from .models import UserReview
admin.site.register(Movie)
# admin.site.register(Movienow)
# admin.site.register(Movieup)
admin.site.register(Showtime)
admin.site.register(UserReview)
admin.site.register(Booking)
admin.site.register(Theatre)
admin.site.register(Screen)