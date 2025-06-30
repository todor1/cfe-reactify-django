# Reactify Django

React is a powerful component JavaScript library. With it, you can build all kinds of user inferfaces from something as simple as a contact form all the way to an entire front end.

This project is about integrating React with Django.

## Tech Stack
- Django 2.0.6
- Django REST Framework 3.8.2
- Django CORS Headers 2.2.0
- PostgreSQL 13
- Python 3.7
- React

## Prerequisites
- Docker
- Docker Compose

## Getting Started

### 1. Update Database Settings

Before starting the application, update your `src/reactify/settings.py` with the following database configuration:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'db',
        'PORT': '5432',
    }
}
```

### 2. Building and Running with Docker

Build and start the containers:

```bash
docker-compose up -d --build
```

### 3. Apply Database Migrations

Run the following command to apply database migrations:

```bash
docker-compose exec web python manage.py migrate
```

### 4. Create Superuser (Optional)

To create an admin user, run:

```bash
docker-compose exec web python manage.py createsuperuser
```

### 5. Access the Application

- Django Admin: http://localhost:8000/admin/
- API: http://localhost:8000/

### Common Commands

- **Start containers**: `docker-compose up -d`
- **Stop containers**: `docker-compose down`
- **View logs**: `docker-compose logs -f`
- **Create new migrations**: `docker-compose exec web python manage.py makemigrations`
- **Apply migrations**: `docker-compose exec web python manage.py migrate`
- **Run tests**: `docker-compose exec web python manage.py test`
- **Access bash in container**: `docker-compose exec web bash`

## Git 

```bash
git remote add origin https://github.com/username/reactify-django.git
git branch -M main
git add .
git commit -m "Initial commit"
git push -u origin main
```