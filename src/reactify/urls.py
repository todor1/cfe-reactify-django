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

import os

from django.conf import settings
from django.contrib import admin
from django.http import HttpResponse
from django.urls import include, path, re_path
from django.views.generic import TemplateView


def service_worker(request):
    """Serve a custom service worker file that doesn't cache renamed files"""
    service_worker_content = """
// Custom service worker for React + Django integration
// This version doesn't cache the renamed static files to avoid 404 errors

const CACHE_NAME = 'reactify-django-v1';
const urlsToCache = [
  '/',
  '/static/js/reactify-django.ui.js',
  '/static/css/reactify-django.ui.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache.filter(url => {
          // Only cache files that actually exist
          return fetch(url).then(response => response.ok).catch(() => false);
        }));
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});
"""
    return HttpResponse(service_worker_content, content_type="application/javascript")


def favicon(request):
    """Serve the favicon file"""
    file_path = os.path.join(settings.BASE_DIR, "staticfiles", "favicon.ico")
    try:
        with open(file_path, "rb") as f:
            content = f.read()
        return HttpResponse(content, content_type="image/x-icon")
    except FileNotFoundError:
        return HttpResponse("Favicon not found", status=404)


def manifest(request):
    """Serve the manifest.json file"""
    file_path = os.path.join(settings.BASE_DIR, "staticfiles", "manifest.json")
    try:
        with open(file_path, "r") as f:
            content = f.read()
        return HttpResponse(content, content_type="application/json")
    except FileNotFoundError:
        return HttpResponse("Manifest not found", status=404)


urlpatterns = [
    path("", TemplateView.as_view(template_name="react.html")),
    path("favicon.ico", favicon, name="favicon"),
    path("manifest.json", manifest, name="manifest"),
    path("service-worker.js", service_worker, name="service_worker"),
    path("admin/", admin.site.urls),
    path("api/posts/", include("posts.urls")),
    # Catch-all pattern for React routing (must be last)
    re_path(
        r"^.*$", TemplateView.as_view(template_name="react.html"), name="react_app"
    ),
]
