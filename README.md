# Reactify Django

A full-stack web application that integrates Django REST Framework with React, providing a modern, responsive user interface powered by a robust backend.

## Problems
- The old Django version not running properly with a local installation neither with uv, nor with venv
- The dockerized version not able to get the react build changes into the django static files even when the scripts are run and files have been copied to the static-cdn-local folder. Port 8000 does not change from the initial hello world message
- Other than that, the react app is working properly on port 3000
- Check if the project will run with newer versions of packages django and react

## 🚀 Features
- Django 2.0.6 backend with REST API
- React frontend with hot-reloading
- PostgreSQL database
- Docker containerization
- Development and production configurations

## 🛠 Tech Stack
- **Backend**: Django 2.0.6
- **API**: Django REST Framework 3.8.2
- **Frontend**: React 16.4.0
- **Database**: PostgreSQL 13
- **Containerization**: Docker & Docker Compose
- **CORS**: Django CORS Headers 2.2.0

## 📋 Prerequisites
- Docker 20.10.0 or higher
- Docker Compose 1.27.0 or higher
- Node.js 14.x or higher (for local development)
- npm 6.x or higher
- Python 3.7 or higher
- psycopg2-binary==2.8.6: nb: psycopg2-binary version 2.9 causing utc errors when admin login tried

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd reactifydjango
```

### 2. Environment Setup

#### Docker Setup (Recommended)
1. Update your database settings in `src/reactify/settings.py`:
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

2. Build and start the containers:
```bash
docker-compose up -d --build
```

3. Apply database migrations:
```bash
docker-compose exec web python manage.py migrate
```

4. Create a superuser (optional):
```bash
docker-compose exec web python manage.py createsuperuser
```

#### Local Development Setup
1. Set up Python virtual environment:
```bash
python -m venv venv
source venv/bin/activate  
# On Windows: .\venv\Scripts\activate
source venv/Scripts/activate
python.exe -m pip install --upgrade pip
pip install -r src/requirements.txt
```

2. Install frontend dependencies:
```bash
cd src/reactify-ui
npm install
```

## 🖥 Development Workflow

### Running the Development Servers

#### Option 1: Using Docker (Recommended)
1. Start the backend and database:
```bash
docker-compose up -d
```

2. In a new terminal, start the React development server:
```bash
cd src/reactify-ui
npm start
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Django Admin: http://localhost:8000/admin

#### Option 2: Local Development
1. Start Django development server:
```bash
cd src
python manage.py runserver
```

2. In a new terminal, start the React development server:
```bash
cd src/reactify-ui
npm start
```

### Building for Production
1. Build the React app:
```bash
cd src/reactify-ui
npm run build
```

2. Collect static files:
```bash
npm run collect
```

3. Start the production server:
```bash
cd ..
python manage.py runserver
```

## 🐳 Docker Commands

| Command | Description |
|---------|-------------|
| `docker-compose up -d --build` | Build and start all services |
| `docker-compose down` | Stop and remove containers |
| `docker-compose logs -f` | View container logs |
| `docker-compose exec web python manage.py <command>` | Run Django management commands |

## 📂 Project Structure
```
reactifydjango/
├── src/
│   ├── reactify/           # Django project
│   ├── reactify-ui/        # React application
│   │   ├── public/
│   │   └── src/
│   └── requirements.txt    # Python dependencies
├── docker-compose.yml
└── Dockerfile
```

## 🔧 Troubleshooting

### Common Issues
1. **Port already in use**: Ensure no other services are running on ports 3000 or 8000
2. **Database connection issues**: Verify PostgreSQL is running and credentials are correct
3. **Missing dependencies**: Run `npm install` or `pip install -r requirements.txt`

## 📝 License
This project is licensed under the MIT License.

## 🙏 Acknowledgments
- Django REST Framework
- Create React App
- Docker Community

### 4. Create Superuser (Optional)

To create an admin user, run:

```bash
docker-compose exec web python manage.py migrate  

docker-compose exec web python manage.py createsuperuser

docker-compose exec web python manage.py runserver
```

### 5. Access the Application

- Django Admin: http://localhost:8000/admin/
- API: http://localhost:8000/

## 🔄 React Build Workflow

When making changes to the React app, follow these steps to ensure they are properly reflected in the Django application:

1. **Build the React app**:
   ```bash
   cd src/reactify-ui
   npm run build
   ```

2. **Rename and copy build files**:
   ```bash
   npm run build-rename
   npm run copy-buildfiles
   ```

3. **Collect static files** (from project root):
   ```bash
   docker-compose exec web python manage.py collectstatic --noinput
   ```

### One-command Build & Deploy

You can also run this single command from the project root to perform all the above steps:

```bash
cd src/reactify-ui && npm run build && npm run build-rename && npm run copy-buildfiles && cd ../.. && docker-compose exec web python manage.py collectstatic --noinput
```

### Common Commands

- **Start containers**: `docker-compose up -d`
- **Stop containers**: `docker-compose down`
- **View logs**: `docker-compose logs -f`
- **Run server**: `docker-compose exec web python manage.py runserver`
- **Create supersuser**: `docker-compose exec web python manage.py createsuperuser`
- **Create new migrations**: `docker-compose exec web python manage.py makemigrations`
- **Apply migrations**: `docker-compose exec web python manage.py migrate`
- **Run tests**: `docker-compose exec web python manage.py test`
- **Access bash in container**: `docker-compose exec web bash`
- **Collect static files**: `docker-compose exec web python manage.py collectstatic --noinput`

## 📦 Managing Static Files

### Collecting Static Files

To collect all static files (including React build files) into the static directory:

```bash
# Navigate to the React UI directory
cd src/reactify-ui

# Build the React app
npm run build

# Collect static files into the Django static directory
# This will copy the built React files to the appropriate static directory
npm run collect

# Or run the collectstatic command directly in the Docker container
docker-compose exec web python manage.py collectstatic --noinput
```

### Development Workflow

1. Make changes to your React components in `src/reactify-ui/src/`
2. The development server will automatically reload with changes (if running with `npm start`)
3. When ready to deploy:
   - Build the React app: `npm run build`
   - Collect static files: `npm run collect`
   - The files will be available in Django's static files directory

### Production Deployment

In production, make sure to:
1. Set `DEBUG = False` in `src/reactify/settings.py`
2. Configure your web server (Nginx/Apache) to serve static files from the `static-cdn-local` directory
3. Run `collectstatic` after each deployment

### General workflow  
1. make changes in react app
2. run `npm run collect` in react app directory
3. run `npm run build` in react app directory
4. rename the build 
5. copy the build to django static files
6. collect static files so django can use them 
7. run `docker-compose up -d` in django app directory   


## Git 

```bash
git remote add origin https://github.com/todor1/cfe-reactify-django.git
git branch -M main
git add .
git commit -m "Initial commit"
git push -u origin main
```

or if already have remote repository:
```bash
# First, fetch all the remote branches
git fetch --all

# Then pull with the --allow-unrelated-histories flag
git pull origin main --allow-unrelated-histories

# If you encounter merge conflicts, Git will prompt you to resolve them. After resolving any conflicts, commit the changes:
git add .
git commit -m "Merge remote repository"
git push origin main
# f you want to keep your local changes and overwrite the remote repository (use with caution as this will overwrite the remote history):
git push --force origin main

```
