# Reactify Django

A full-stack web application that integrates Django REST Framework with React, providing a modern, responsive user interface powered by a robust backend.

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
- **Create supersuser**: `docker-compose exec web python manage.py createsuperuser`
- **Create new migrations**: `docker-compose exec web python manage.py makemigrations`
- **Apply migrations**: `docker-compose exec web python manage.py migrate`
- **Run tests**: `docker-compose exec web python manage.py test`
- **Access bash in container**: `docker-compose exec web bash`

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
