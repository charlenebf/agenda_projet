# Architecture de l'Application Agenda

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (Angular)                             │
│                            http://localhost:4200                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                 HTTP/REST API
                                      │
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BACKEND (Laravel)                              │
│                            http://localhost:8000                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                   Database
                                      │
┌─────────────────────────────────────────────────────────────────────────────┐
│                                MySQL/SQLite                                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Architecture Frontend (Angular)

```
src/app/
├── components/
│   ├── auth/
│   │   ├── login.component.*           # Connexion utilisateur
│   │   └── register.component.*        # Inscription utilisateur
│   ├── calendar/
│   │   └── calendar.component.*        # Vue calendrier principal
│   ├── day-events/
│   │   └── day-events.component.*      # Modale événements du jour
│   └── event/
│       └── event-form.component.*      # Formulaire CRUD événements
├── services/
│   ├── auth.service.ts                 # Gestion authentification
│   └── event.service.ts                # API événements
├── guards/
│   └── auth.guard.ts                   # Protection routes
├── interceptors/
│   └── auth.interceptor.ts             # Injection token JWT
├── models/
│   ├── event.model.ts                  # Interface Event
│   └── user.model.ts                   # Interface User
└── app.routes.ts                       # Configuration routes
```

## Architecture Backend (Laravel)

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── AuthController.php          # Authentification JWT
│   │   └── EventController.php         # CRUD événements
│   ├── Requests/
│   │   ├── EventRequest.php            # Validation événements
│   │   ├── LoginRequest.php            # Validation connexion
│   │   └── RegisterRequest.php         # Validation inscription
│   ├── Resources/
│   │   └── EventResource.php           # Formatage JSON
│   └── Middleware/
│       └── auth:api                    # Vérification JWT
├── Models/
│   ├── User.php                        # Modèle utilisateur
│   └── Event.php                       # Modèle événement
├── Policies/
│   └── EventPolicy.php                 # Autorisation événements
└── Providers/
    └── AppServiceProvider.php          # Configuration policies
```

## Base de Données

```
┌─────────────────┐    ┌─────────────────────────────────────┐
│     users       │    │              events                 │
├─────────────────┤    ├─────────────────────────────────────┤
│ id (PK)         │◄───┤ user_id (FK)                        │
│ name            │    │ id (PK)                             │
│ email           │    │ title                               │
│ password        │    │ description                         │
│ timezone        │    │ start_date                          │
│ created_at      │    │ end_date                            │
│ updated_at      │    │ location                            │
└─────────────────┘    │ color                               │
                       │ is_all_day                          │
                       │ created_at                          │
                       │ updated_at                          │
                       │ deleted_at (soft delete)            │
                       └─────────────────────────────────────┘
```

## Flux d'Interactions

### 1. Authentification

```
Frontend                    Backend                     Database
   │                          │                           │
   │ POST /api/auth/login     │                           │
   ├─────────────────────────►│ AuthController::login     │
   │                          ├──────────────────────────►│ SELECT users
   │                          │◄──────────────────────────┤
   │◄─────────────────────────┤ JWT Token                 │
   │ Store token              │                           │
```

### 2. Chargement du Calendrier

```
Frontend                    Backend                     Database
   │                          │                           │
   │ GET /api/events          │                           │
   │ ?start_date=2025-10-01   │                           │
   │ &end_date=2025-10-31     │                           │
   ├─────────────────────────►│ EventController::index    │
   │                          ├──────────────────────────►│ SELECT events
   │                          │◄──────────────────────────┤ WHERE user_id
   │◄─────────────────────────┤ EventResource::collection │ AND dates
   │ Display in calendar      │                           │
```

### 3. Sélection d'un Jour

```
Frontend                    Backend                     Database
   │                          │                           │
   │ GET /api/events/day/     │                           │
   │ 2025-10-22               │                           │
   ├─────────────────────────►│ EventController::        │
   │                          │ getEventsByDay            │
   │                          ├──────────────────────────►│ SELECT events
   │                          │◄──────────────────────────┤ WHERE date
   │◄─────────────────────────┤ EventResource::collection │
   │ Show day-events modal    │                           │
```

### 4. CRUD Événements

```
Frontend                    Backend                     Database
   │                          │                           │
   │ POST /api/events         │                           │
   ├─────────────────────────►│ EventController::store    │
   │                          ├──────────────────────────►│ INSERT event
   │                          │◄──────────────────────────┤
   │◄─────────────────────────┤ EventResource             │
   │                          │                           │
   │ PUT /api/events/{id}     │                           │
   ├─────────────────────────►│ EventController::update   │
   │                          ├──────────────────────────►│ UPDATE event
   │                          │◄──────────────────────────┤
   │◄─────────────────────────┤ EventResource             │
   │                          │                           │
   │ DELETE /api/events/{id}  │                           │
   ├─────────────────────────►│ EventController::destroy  │
   │                          ├──────────────────────────►│ DELETE event
   │                          │◄──────────────────────────┤
   │◄─────────────────────────┤ Success message           │
```

## Sécurité

### JWT Flow
```
1. Login → JWT Token généré
2. Token stocké dans localStorage
3. AuthInterceptor ajoute "Bearer {token}" à chaque requête
4. Backend vérifie le token via middleware auth:api
5. EventPolicy vérifie que user_id = auth()->id()
```

### Protection des Routes
```
Frontend: AuthGuard → Vérifie token valide
Backend: auth:api middleware → Vérifie JWT
Backend: EventPolicy → Vérifie propriété des événements
```

## Technologies Utilisées

### Frontend
- **Angular 18** : Framework principal
- **TypeScript** : Langage
- **RxJS** : Gestion asynchrone
- **HTTP Client** : Communication API

### Backend
- **Laravel 11** : Framework PHP
- **JWT Auth** : Authentification
- **Eloquent ORM** : Base de données
- **API Resources** : Formatage JSON

### Base de Données
- **MySQL/SQLite** : Stockage
- **Migrations** : Versioning schéma
- **Soft Deletes** : Suppression logique