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
from django.urls import path,include
from django.views.generic import TemplateView
from . import views
from django.conf import settings
from django.conf.urls.static import static


# from .views import ReactAppView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index ,name='index'),
    # path('articles/',views.my_view ,name='articles'),
    # path('', TemplateView.as_view(template_name='index.html')),
    path('get_text/', views.gettext, name='get_text'),
    path('my_view/', views.hello, name='my_view'),
    path('posterup/', views.posterup, name='poster'),
    path('posternow/', views.posternow, name='poster'),
    path('my_api_endpoint/', views.my_api_endpoint, name='my_api_endpoint'),
    path('sign_up/', views.signup, name='sign_up'),
    path('sign_in/', views.signin, name='sign_in'),
    path('sign_out/', views.signout, name='sign_out'),
    path('articles/', include('articles.urls')),
    
    
    # path('', ReactAppView.as_view(), name='templates'),
    # path('', TemplateView.as_view(template_name='templates/index.html')),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)



# if settings.DEBUG:
#     urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)