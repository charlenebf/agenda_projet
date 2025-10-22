# Application d'Agenda

Une application complète d'agenda développée avec Laravel (backend) et Angular (frontend).

## Fonctionnalités

- **Authentification sécurisée** avec JWT
- **Gestion des événements** (CRUD complet)
- **Vue calendrier mensuelle** interactive
- **Interface responsive** et moderne
- **Validation des données** côté client et serveur
- **Gestion des erreurs** et feedback utilisateur

## Architecture

### Backend (Laravel)
- **Modèles** : User, Event avec relations Eloquent
- **Contrôleurs** : AuthController, EventController avec validation
- **Requests** : Validation des données d'entrée
- **Resources** : Formatage des réponses JSON
- **Policies** : Autorisation et sécurité
- **Middleware** : Authentification JWT

### Frontend (Angular)
- **Structure par type** : components/, services/, models/, guards/, interceptors/
- **Services** : AuthService, EventService pour la logique métier
- **Guards** : Protection des routes
- **Intercepteurs** : Gestion automatique des tokens JWT
- **Composants** : Login, Register, Calendar, EventForm

## Installation

### Prérequis
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL/PostgreSQL
- Redis (optionnel)

### Backend Laravel

```bash
cd backend

# Installation des dépendances
composer install

# Configuration de l'environnement
cp .env.example .env
php artisan key:generate
php artisan jwt:secret

# Configuration de la base de données dans .env
# DB_DATABASE=agenda
# DB_USERNAME=your_username
# DB_PASSWORD=your_password

# Migrations
php artisan migrate

# Démarrage du serveur
php artisan serve
```

### Frontend Angular

```bash
cd frontend

# Installation des dépendances
npm install

# Démarrage du serveur de développement
ng serve
```

## Utilisation

1. Accédez à `http://localhost:4200`
2. Créez un compte ou connectez-vous
3. Gérez vos événements dans le calendrier

## Sécurité

- **Authentification JWT** avec refresh token
- **Validation des données** côté client et serveur
- **Autorisation** par utilisateur (policies)
- **Protection CSRF** et CORS configuré
- **Sanitisation** des entrées utilisateur

## Performance

- **Lazy loading** des composants Angular
- **Index de base de données** sur les colonnes critiques
- **Pagination** et filtrage des événements
- **Cache Redis** pour les sessions
- **Optimisation des requêtes** avec Eloquent

## API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Profil utilisateur

### Événements
- `GET /api/events` - Liste des événements
- `POST /api/events` - Créer un événement
- `GET /api/events/{id}` - Détails d'un événement
- `PUT /api/events/{id}` - Modifier un événement
- `DELETE /api/events/{id}` - Supprimer un événement

## Structure des fichiers

```
angenda/
├── backend/                 # API Laravel
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/ # Contrôleurs
│   │   │   ├── Requests/    # Validation
│   │   │   └── Resources/   # Formatage JSON
│   │   ├── Models/          # Modèles Eloquent
│   │   └── Policies/        # Autorisation
│   ├── database/
│   │   └── migrations/      # Migrations DB
│   └── routes/
│       └── api.php          # Routes API
└── frontend/                # Application Angular
    └── src/
        └── app/
            ├── components/  # Composants UI
            ├── services/    # Services métier
            ├── models/      # Interfaces TypeScript
            ├── guards/      # Protection routes
            └── interceptors/ # HTTP intercepteurs
```

## Développement

### Tests
```bash
# Backend
php artisan test

# Frontend
ng test
```

### Linting
```bash
# Backend
./vendor/bin/pint

# Frontend
ng lint
```

## Déploiement

### Production
1. Configurez les variables d'environnement
2. Optimisez les assets : `ng build --prod`
3. Configurez le serveur web (Nginx/Apache)
4. Configurez la base de données de production
5. Activez le cache et les optimisations Laravel