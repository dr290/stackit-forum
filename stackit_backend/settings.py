from pathlib import Path
import mongoengine

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = '^ss6mr6$84#xrsn^xczk(-q3n*9s_bl%@dl_)p@*4z*xj^(&__'

DEBUG = True

ALLOWED_HOSTS = ['*']  # Update to your domain in production

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',         # ✅ CORS headers
    'rest_framework',      # ✅ Django REST framework
    'forum_api',           # ✅ Your app name (created via `startapp`)
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # ✅ Enables CORS
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS settings for React frontend (e.g., localhost:3000)
CORS_ALLOW_ALL_ORIGINS = False  # Better to explicitly allow origins in production
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

ROOT_URLCONF = 'stackit_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

WSGI_APPLICATION = 'stackit_backend.wsgi.application'

# MongoDB Configuration using MongoEngine
mongoengine.connect(
    db='stackitdb',  # your database name
    host='mongodb://localhost:27017/stackitdb'  # or replace with Atlas URI
)

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files
STATIC_URL = '/static/'
