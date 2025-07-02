# Reactify Django - Project Setup

<https://www.codingforentrepreneurs.com/blog/integrate-django-reactjs>  

## Integrate Django + React.js
Published on March 3, 2024

Justin Mitchel

### tldr; 
Vite builds your React.js app to your Django project. Using Django template context processors, to reference the built React.js files. 
Django's static files handling is still in use.
This method works for nearly any JavaScript you want Django to run but I designed it specifically for React.js.

First off, there's two ways to think about this:  

 - React-first Hosting: React-first hosting deploys the Vite-managed index.html page to a static host. Still requires deploying Django to another host. Deploying this method is essentially deploying a static website.  


 - Django-first Hosting: Django-first hosting deploys the Django project with Guincorn behind an HTTP Server like Nginx. Nginx can also serve the JavaScript. Aka, it can all be deployed on one server or with a CDN for the JavaScript and other static assets.  


 The other benefit of Django-first hosting is that we can leverage all things Django without adopting any other third party packages (like the Django Rest Famework) or being locked in to any given front end (e.g. React, Vue, Angular). The final added benefit is CORS just works since Django is running the show. Plus Django has built-in session support, caching, SEO, built-in API/JSON-resonses, database mapping, users, and other features that will just work since Django will serve the views that reference the JavaScript apps.

### Create the Projects
 - Install Node.js 18 LTS and up  
 - Install Python 3.10 and up  
 - Create directory for your all your development projects:  

```bash
mkdir -p ~/dev-projects
cd ~/dev-projects
```

Sunsetting Create React App  

February 14, 2025 by Matt Carroll and Ricky Hanlon
Today, we’re deprecating Create React App for new apps, and encouraging existing apps to migrate to a framework, or to migrate to a build tool like Vite, Parcel, or RSBuild. -> <https://react.dev/blog/2025/02/14/sunsetting-create-react-app>

Using Vite for React.js:
```bash
# navigate to project root
cd ~/dev/dev-projects/
# create vite project
npm create vite@latest dj-frontend
# navigate to project
cd dj-react
# run dev server
npm run dev
```

Vite is a modern way to build and bundle React.js. It's certainly not the only way.
Using Python's Venv for Django
When using Python, always use a virtual environment. Here's a quick way how.

macos/linux: 

```bash
mkdir -p ~/dev/dev-projects/dj-backend
cd ~/dev/dev-projects/dj-backend
python3 -m venv venv
source venv/bin/activate
```

windows:
```bash
mkdir -p ~\dev\dev-projects\dj-backend
cd ~\dev\dev-projects\dj-backend
c:\Python310\python.exe -m venv venv
.\venv\Scripts\activate
```
With the virtual environment (venv) activated, run:
```bash

# install django
python -m pip install Django pip --upgrade
# create a new django project in current directory
django-admin startproject cfehome .
# run the Django server
python manage.py runserver
```

Note that our Django's settings.py file will be located in cfehome/
### Configure Django's Static Files
In settings.py:
```python
# cfehome/settings.py
STATIC_URL = '/static/'
STATICFILES_BASE = BASE_DIR / "staticfiles"
REACT_JS_BUILD_DIR = STATICFILES_BASE / "frontend" / "prod" 
if DEBUG:
    REACT_JS_BUILD_DIR = STATICFILES_BASE / "frontend" / "dev"
STATICFILES_DIRS = [
    STATICFILES_BASE,
]
```

The point of these configurations is to have locations that Django can help manage the generated React build files during:
python manage.py collectstatic
In production, STATIC_URL might be something like https://cdn.yourdomain.com/ where your root react.js build files will be located in https://cdn.yourdomain.com/frontend/prod/ or something similar.
Vite + React.js Django-based Build Output
With these Django settings, update Vite's build output to match the STATIC_URL configuration in Django.
In package.json adjust the scripts to the following: 

```json
// package.json 
{
    ...
    "scripts": {
        "dev": "vite build --watch --emptyOutDir --base /static/frontend/dev --outDir ../dj-backend/staticfiles/frontend/dev",
        "build": "vite build --base /static/frontend/prod --outDir ../dj-backend/staticfiles/frontend/prod"
    }
    ...
}
```

The important parts here are the --base and --outDir flags.
--outDir is a directory in our Django project based on the STATICFILES_DIRS settings in Django so Django can to manage the static files (e.g. with python manage.py collectstatic).
--base is the base path of the build. This should match STATIC_URL in Django. In production, this setting may become something like https://cdn.yourdomain.com/static/ui/ or something of the sort.

Now if we run npm run dev or npm run build Django will have the necessary files to reference the React.js build files.

During development (e.g. DEBUG=True in Django), we will:
Use npm run dev to output non-minified, non-optimized, and non-compressed JavaScript files to the STATICFILES_DIRS in Django.

### Use Django to serve the React.js build files.  

During production (e.g. DEBUG=False in Django), we will:
Run npm run build once, then use python manage.py collectstatic to collect the build files to the STATIC_ROOT in Django.
Use NGINX, Whitenoise, AWS S3, or a Content Delivery Network to serve the React.js build files.
Django Template Context Processors

Now we need a way to automatically reference the React.js build files in our Django templates. To do this, we'll use a custom context processor to provide our Django templates with references to the correct React.js build files.

####  Create cfehome/context_processors.py next to settings.py with:   

```python
from django.conf import settings
from cfehome.env import config

def reactjs_assets_paths(request):
    staticfiles_base = settings.STATICFILES_BASE
    build_files = settings.REACT_JS_BUILD_DIR
    return {
        "reactjs_assets_js_paths":[str(x.relative_to(staticfiles_base)) for x in build_files.glob("*.js")],
        "reactjs_assets_css_paths":[str(x.relative_to(staticfiles_base)) for x in build_files.glob("*.css")],
    }
```

#### In cfehome/settings.py add the context processor to TEMPLATES:  

```python
# cfehome/settings.py
TEMPLATES = [
    {
        ...
        "DIRS": [BASE_DIR / "templates"],
        ...
        "OPTIONS": {
            "context_processors": [
                ...
                "cfehome.context_processors.reactjs_assets_paths",
            ],
        },
    },
]
```

#### Now in any Django template, you can reference the React.js build files like so:  

```html 
{% load static %}
{% for js in reactjs_assets_js_paths %}
    <script src="{% static js %}"></script>
{% endfor %}
{% for css in reactjs_assets_css_paths %}
    <link rel="stylesheet" href="{% static css %}">
{% endfor %}
```

### Django View + Template to Serve React.js  

#### In cfehome/views.py:
```python
from django.shortcuts import render

def home(request):
    return render(request, "home.html")
In cfehome/urls.py:

from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
]
```

#### In templates/home.html:

```html
{% load static %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="icon" type="image/svg+xml" href="/static/frontend/prod/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    {% for js_path in reactjs_assets_js_paths %}
        <script src="{% static js_path %}"></script>
    {% endfor %}
    {% for css_path in reactjs_assets_css_paths %}
        <link rel="stylesheet" href="{% static css_path %}">
    {% endfor %}
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

This template will serve the React.js build files but more importantly will resemble the Vite index.html file.
There are a number of different improvements you can make to this process but overall, I find this to be incredibly flexible and powerful.  

Keep in mind that loading in the React.js build files are only one part of rendering the app, 
you also have to remember that <div id="root"></div> is the **default HTML tag** that the react app will replace. 
The nice thing about react is this value can easily change. 

