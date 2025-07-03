"""reactify URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
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
from django.views.generic import TemplateView
from django.urls import path, include
from django.http import HttpResponse
from django.conf import settings
import os


def service_worker(request):
    """Serve the service worker file"""
    file_path = os.path.join(settings.BASE_DIR, 'staticfiles', 'service-worker.js')
    try:
        with open(file_path, 'r') as f:
            content = f.read()
        return HttpResponse(content, content_type='application/javascript')
    except FileNotFoundError:
        return HttpResponse('Service worker not found', status=404)


urlpatterns = [
    path('', TemplateView.as_view(template_name='react.html')),
    path('service-worker.js', service_worker, name='service_worker'),
    path('admin/', admin.site.urls),
    path('api/posts/', include('posts.urls'))
]
