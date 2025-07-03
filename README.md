# Reactify Django

A full-stack web application that integrates Django REST Framework with React, providing a modern, responsive user interface powered by a robust backend.

## Problems ✅ SOLVED
- ~~The old Django version not running properly with a local installation neither with uv, nor with venv~~ **FIXED: Virtual environment and settings configuration resolved**
- ~~The dockerized version not able to get the react build changes into the django static files even when the scripts are run and files have been copied to the static-cdn-local folder. Port 8000 does not change from the initial hello world message~~ **FIXED: NPM scripts fixed, file renaming working, browser cache was the issue**
- ~~Other than that, the react app is working properly on port 3000~~ **WORKING: React dev server functional**
- Check if the project will run with newer versions of packages django and react

## ✅ Working Solutions:
- **Local Django development**: Virtual environment setup with proper package installation
- **React + Django integration**: Fixed NPM build scripts with proper file renaming  
- **Static file management**: Automated workflow with manual fallback options
- **Browser cache solution**: Hard refresh (`Ctrl+F5`) resolves display issues
- **CORS configuration**: Fixed CORS settings for proper API communication

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

#### For Local Development (Non-Docker):
```bash
cd src/reactify-ui && npm run build && npm run build-rename && npm run copy-buildfiles && npm run collect
```

#### For Docker Setup:
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
npm run collect  # Uses local Python for non-Docker setup

# For Docker users, you can use:
# docker-compose exec web python manage.py collectstatic --noinput
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
1. Make changes in the React app
2. Run `npm run build` in the React app directory
3. Run `npm run build-rename` to rename the build files
4. Run `npm run copy-buildfiles` to copy the build to Django static files
5. Run `npm run collect` to collect static files so Django can use them
   (For Docker: use `docker-compose exec web python manage.py collectstatic --noinput` instead)
6. For Docker setup: Run `docker-compose up -d` in Django app directory
   For local setup: Run `python ../manage.py runserver` to start the Django server


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


## 1.UV Workflow   

```bash
uv init .
uv init proj_name
cd proj_name
uv venv --python 3.12
source .venv/Scripts/activate
uv pip install --upgrade pip
# uv pip install -r requirements.txt
uv add -r src/requirements.txt
```

## 2.Django workflow  

```bash
# django-admin startproject djchat .
python manage.py runserver
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

## 3.React workflow (local) ✅ WORKING
**To see React app changes on Django home page (http://localhost:8000/):**

### Option A: Using Fixed NPM Scripts (Recommended)
1. Make changes in the React app (`src/reactify-ui/src/`)
2. Navigate to React directory: `cd src/reactify-ui`
3. Run the complete build and deploy: `npm run build-and-deploy`
   - **Note**: This command now shows detailed feedback including file counts (e.g., "✅ Renamed 1 JS file(s)", "✅ Copied 2 CSS file(s)")
   - Look for these messages to confirm the build process is working correctly
4. **Activate virtual environment and run Django commands:**
   ```bash
   cd ../..
   source .venv/Scripts/activate
   cd src
   python manage.py collectstatic --noinput
   python manage.py runserver
   ```
5. Visit http://localhost:8000/ 
6. **🔥 IMPORTANT: Hard refresh browser** - `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac) to clear cache and see changes

### Option B: Manual Steps (Alternative)
1. Make changes in the React app (`src/reactify-ui/src/`)
2. Navigate to React directory: `cd src/reactify-ui`
3. Build the React app: `npm run build`
4. **Manual rename (if automated scripts fail):**
   ```bash
   cp build/static/js/main.*.js build/static/js/reactify-django.ui.js
   cp build/static/css/main.*.css build/static/css/reactify-django.ui.css
   ```
5. Copy build files to Django static files: 
   ```bash
   cp build/static/js/reactify-django.ui.js ../staticfiles/js/
   cp build/static/css/reactify-django.ui.css ../staticfiles/css/
   ```
6. Go back to Django src directory: `cd ../`
7. Collect static files: `python manage.py collectstatic --noinput`
8. Start/restart Django server: `python manage.py runserver`
9. Visit http://localhost:8000/ 
10. **🔥 IMPORTANT: Hard refresh browser** - `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac) to see changes

**Quick workflow (two-step process):**

**Step 1 - From reactify-ui directory:**
```bash
npm run build-and-deploy
```
*Expected output includes file counts like "✅ Renamed 1 JS file(s)" and "✅ Copied 2 files"*

**Step 2 - Activate virtual environment and run Django:**
```bash
cd ../.. && source .venv/Scripts/activate && cd src && python manage.py collectstatic --noinput && python manage.py runserver
```

**Step 3 - View changes:**
- Visit http://localhost:8000/
- **Hard refresh**: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)

### 💡 Development Tips:
- **Browser caching** is the most common issue - always hard refresh when testing React changes
- **Enable "Disable cache"** in browser dev tools (F12 → Network tab) while developing
- **Use incognito/private mode** for testing to avoid cache issues
- **File count feedback**: The updated `npm run build-and-deploy` script now shows exactly how many files were processed (renamed/copied) at each step
- Look for **"X static files copied"** message in collectstatic output to confirm files were updated
- **Zero file counts**: If you see "✅ Renamed 0 JS file(s)", the file may already be renamed from a previous build

### 🔧 Windows Bash Workaround for Static Files Issues:

If `npm run build-and-deploy` shows "0 static files copied", use this command sequence to force update:

**From reactify-ui directory:**
```bash
# Force clean build and manual copy
rm -rf build/ && npm run build && cp build/static/js/main.*.js build/static/js/reactify-django.ui.js && cp build/static/css/main.*.css build/static/css/reactify-django.ui.css && cp build/static/js/reactify-django.ui.js ../staticfiles/js/ && cp build/static/css/reactify-django.ui.css ../staticfiles/css/ && echo "Files copied, now run Django collectstatic"
```

**Then activate Django environment and collect:**
```bash
cd /c/Users/tarshinkov/Documents/PY/cfe/reactifydjango && source .venv/Scripts/activate && cd src && python manage.py collectstatic --noinput && python manage.py runserver
```

**Alternative single mega-command (from project root):**
```bash
cd src/reactify-ui && rm -rf build/ && npm run build && cp build/static/js/main.*.js build/static/js/reactify-django.ui.js && cp build/static/css/main.*.css build/static/css/reactify-django.ui.css && cp build/static/js/reactify-django.ui.js ../staticfiles/js/ && cp build/static/css/reactify-django.ui.css ../staticfiles/css/ && cd /c/Users/tarshinkov/Documents/PY/cfe/reactifydjango && source .venv/Scripts/activate && cd src && python manage.py collectstatic --noinput && echo "✅ Build complete! Visit http://localhost:8000/ and hard refresh (Ctrl+F5)"
```

**What this does:**
1. `rm -rf build/` - Removes old build completely
2. `npm run build` - Creates fresh build
3. `cp build/static/js/main.*.js build/static/js/reactify-django.ui.js` - Renames JS file
4. `cp build/static/css/main.*.css build/static/css/reactify-django.ui.css` - Renames CSS file  
5. `cp build/static/js/reactify-django.ui.js ../staticfiles/js/` - Copies JS to Django
6. `cp build/static/css/reactify-django.ui.css ../staticfiles/css/` - Copies CSS to Django
7. Activates virtual environment and runs Django collectstatic

## 🔄 Git Branch Merge Workflow

### Merging Feature Branch to Main and Pushing Changes

When you've completed work on a feature branch and want to merge it back to main:

#### Option A: Merge and Push (Recommended)
```bash
# Save current work
git add .
git commit -m "Complete feature work - ready for merge"
git push origin package_update

# Switch to main branch
git checkout main

# Pull latest changes from remote main
git pull origin main

# Merge your feature branch into main
# git merge <your-branch-name>
git merge package_update

# Push the merged changes to remote
git push origin main

# Clean up: delete the feature branch (optional)
# git branch -d <your-branch-name>
# git push origin --delete <your-branch-name>
# git branch -d package_update
# git push origin --delete package_update
```

#### Option B: Using GitHub Pull Request (Alternative)
```bash
# Save and push current branch
git add .
git commit -m "Complete feature work - ready for PR"
# git push origin <your-branch-name>
git push origin package_update

# Then create a Pull Request on GitHub web interface
# After PR is merged, update local main:
git checkout main
git pull origin main
# git branch -d <your-branch-name>
git branch -d package_update
```

#### Quick One-Command Merge (Current Branch → Main)
```bash
# From your feature branch, execute all in one go:
git add . && git commit -m "Ready for merge" && git checkout main && git pull origin main && git merge - && git push origin main
```

**Note**: Replace `<your-branch-name>` with your actual branch name (e.g., `package_update`, `feature-xyz`, etc.)

### Git Status Commands
```bash
# Check current branch and status
git status
git branch

# See recent commits
git log --oneline -5

# Check differences before committing
git diff
```

