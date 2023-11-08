"""integr URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from . import views
# from .views import ReactAppView

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path("my_view/",views.my_view,name='my_view'),
    # path('get_text/', views.gettext, name='get_text'),
    path('banner/', views.poster, name='banner'),
    path('posternow/', views.posternow, name='poster'),
    path('posterup/', views.posterup, name='poster'),
    path('showtime/', views.showtime, name='showtime'),
    path('submit_review/', views.submit_review, name='submit_review'),
    path('reviewsort/', views.reviewsort, name='reviewsort'),
    path('payment/', views.payment, name='payment'),
    path('addbooking/', views.addbooking, name='addbooking'),
    path('getseats/', views.getseats, name='getseats'),
    path('predict/', views.predict, name='predict'),
    
    # path('', ReactAppView.as_view(), name='templates'),
    # path('', TemplateView.as_view(template_name='templates/index.html')),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

