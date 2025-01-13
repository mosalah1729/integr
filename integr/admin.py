from django.contrib import admin

# Register your models here.
from .models import Movienow
from .models import Movieup
admin.site.register(Movienow)
admin.site.register(Movieup)