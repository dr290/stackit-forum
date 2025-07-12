# stackit_backend/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('forum_api.urls')),  # 👈 this includes your API routes
]
