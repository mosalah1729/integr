"""
Django settings for integr project.

Generated by 'django-admin startproject' using Django 3.0.5.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os
import environ

# Add this at the end of your settings.py


# Determine the deployment URL dynamically
if os.environ.get('DJANGO_ENV') == 'development':
    # In development mode, use the localhost URL
    DEPLOYMENT_URL = 'http://localhost:3000'
else:
    # In production, use the Vercel deployment URL
    request_host = os.environ.get('HTTP_HOST')
    DEPLOYMENT_URL = f"https://{request_host}" if request_host else None

# Set up CORS whitelist based on the determined deployment URL
if DEPLOYMENT_URL:
    CORS_ORIGIN_WHITELIST = [DEPLOYMENT_URL]
else:
    # Handle the case when the deployment URL is not available
    CORS_ORIGIN_WHITELIST = []


    # Django development server proxy configuration
    USE_X_FORWARDED_HOST = True
    SECURE_SSL_REDIRECT = False
    CSRF_COOKIE_SECURE = False
    SESSION_COOKIE_SECURE = False







# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '3cp1(ht^x%x^)yep6#6xf1$39uh&$rkfe6qa#r2^-mwa86cj(%'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['.vercel.app', '.now.sh']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'articles',
    'integr',
    'djongo',
    'corsheaders',
]

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

CORS_ALLOW_ALL_ORIGINS = True

# CORS_ALLOWED_ORIGINS = [
#        'http://127.0.0.1:8000',  # Add your frontend origin here
#    ]
CORS_ALLOWED_ORIGINS = [
    'http://127.0.0.1:8000',
    'https://integr-q2q52dv2j-mosalah1729s-projects.vercel.app',
    'https://vercel.com/mosalah1729s-projects/integr/',
]

ROOT_URLCONF = 'integr.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR,'Frontend/build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'integr.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }


env = environ.Env()
environ.Env.read_env()

DATABASES = {
    'default': env.db(),
}


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

# TIME_ZONE = 'UTC'
TIME_ZONE = 'Asia/Kolkata'

USE_I18N = True

USE_L10N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

# STATIC_URL = '/static/'

# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR,'Frontend/build/static'),
#     os.path.join(BASE_DIR,'pic')
# ]
# STATIC_ROOT = os.path.join(BASE_DIR, 'assets')
# MEDIA_URL ='/media/'
# MEDIA_ROOT=os.path.join(BASE_DIR,'picasset')



STATIC_URL = '/static/'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'Frontend/build'),
]

# No need to specify STATIC_ROOT for Vercel deployment
# STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# original
# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR,'Frontend/build/static'),
    
# ]
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

# given in tutorial
#    STATICFILES_DIRS = [BASE_DIR/'static',]
# STATIC_ROOT = BASE_DIR/'staticfiles'
# MEDIA_URL ='/media/'
# MEDIA_ROOT=os.path.join(BASE_DIR,'pic')
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'



RAZORPAY_KEY_ID = 'rzp_test_eFtaril9zvyOGW'
RAZORPAY_KEY_SECRET = '39c8KbriHHxYzKq87WDNC8bH'


# Add this at the end of your settings.py

if os.environ.get('DJANGO_ENV') == 'production':  # Assuming 'production' is your production environment
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
