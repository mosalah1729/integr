import os
import environ

env = environ.Env()
environ.Env.read_env()

# Wildcard settings to allow all Vercel subdomains
CSRF_TRUSTED_ORIGINS = ['https://*.vercel.app']
CORS_ALLOWED_ORIGINS = ['https://*.vercel.app']

# Dynamic Deployment URL (with a fallback to Vercel subdomains)
DEPLOYMENT_URL = 'https://*.vercel.app'

# Other Django settings

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = '3cp1(ht^x%x^)yep6#6xf1$39uh&$rkfe6qa#r2^-mwa86cj(%'

DEBUG = False

ALLOWED_HOSTS = ['.vercel.app', '.now.sh', 'integr.vercel.app']

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
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOW_CREDENTIALS = False
CORS_ALLOW_ALL_ORIGINS = True

ROOT_URLCONF = 'integr.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'Frontend/build')],
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

DATABASES = {
    'default': {
        'ENGINE': 'custom_db_wrapper.CustomDatabaseWrapper',
        'NAME': env('DB_NAME', default='integr'),
        'ENFORCE_SCHEMA': False,
        'CLIENT': {
            'host': env('MONGODB_URI')
        }
    }
}

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

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Kolkata'
USE_I18N = True
USE_L10N = True
USE_TZ = False

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'Frontend/build'),
]
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

RAZORPAY_KEY_ID = 'rzp_test_eFtaril9zvyOGW'
RAZORPAY_KEY_SECRET = '39c8KbriHHxYzKq87WDNC8bH'

if os.environ.get('DJANGO_ENV') == 'production':
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
