# Plan d'Architecture Backend Corrigé - LesCracks

## 📋 Résumé Exécutif

Ce document détaille l'architecture backend complète pour LesCracks, intégrant les corrections apportées concernant les types d'événements, les programmes d'accompagnement, et le flux d'application/inscription.

---

## 🎯 Clarifications Métier

### Types d'Événements (4)
1. **Workshop** - Sessions de formation courtes et pratiques
2. **Hackathon** - Compétitions de développement intensives
3. **Bootcamp** - Programmes de formation intensifs (plusieurs semaines)
4. **Talkshow** - Sessions de discussion/conférences

### Programmes d'Accompagnement (2)
1. **Accompagnement 360** - Suivi complet et personnalisé
2. **Formation Classique** - Formation standard en groupe

### Distinction Importante
- **Bootcamp** est à la fois un type d'événement ET un programme d'accompagnement distinct
- Les utilisateurs ne s'inscrivent PAS directement sur la plateforme
- Seul le compte administrateur peut gérer les inscriptions/applications
- Les utilisateurs remplissent des formulaires pour postuler aux programmes/événements
- Les administrateurs examinent et approuvent/rejettent les candidatures

---

## 🔄 Flux d'Application/Inscription

### Pour les Programmes (Accompagnement 360, Formation Classique)
```
1. Utilisateur remplit le formulaire de candidature (public)
2. Candidature créée avec statut "pending"
3. Admin examine la candidature
4. Admin approuve/rejette
5. Si approuvé → Participant créé et inscrit au programme
```

### Pour les Événements (Workshop, Hackathon, Bootcamp, Talkshow)
```
1. Utilisateur remplit le formulaire d'inscription (public)
2. Inscription créée avec statut "pending"
3. Admin examine l'inscription
4. Admin approuve/rejette
5. Si approuvé → Participant créé et inscrit à l'événement
```

---

## 📊 Décisions Architecturales

| Aspect | Décision |
|--------|----------|
| **Stockage des fichiers** | URLs externes uniquement (YouTube pour vidéos, liens externes pour documents) |
| **Données Participants** | Infos de base uniquement (nom, email, programme/événement, statut) |
| **Notifications** | Emails de confirmation et de réponse pour les candidatures |
| **Base de données** | MySQL avec Sequelize ORM (existant) |
| **Framework** | Express.js (existant) |
| **Authentification** | Admin uniquement (pas d'inscription utilisateur) |

---

## 🗂️ Modèles de Données à Créer

### 1. Application Model
**Fichier:** `LesCracks-backend/src/models/Application.js`

```javascript
{
  id_application: UUID (PK),
  first_name: String (required),
  last_name: String (required),
  email: String (required),
  phone: String,
  message: Text,
  cv_url: String (nullable),
  status: Enum [pending, reviewed, accepted, rejected],
  application_type: Enum [program, event],
  program_type: Enum [accompagnement_360, formation_classique] (nullable si event),
  event_type: Enum [workshop, hackathon, bootcamp, talkshow] (nullable si program),
  applied_at: Timestamp,
  reviewed_by: FK -> Admin (nullable),
  reviewed_at: Timestamp (nullable),
  review_notes: Text (nullable),
  created_at: Timestamp,
  updated_at: Timestamp
}
```

**Relations:**
- belongsTo Admin (reviewed_by)

---

### 2. Participant Model
**Fichier:** `LesCracks-backend/src/models/Participant.js`

```javascript
{
  id_participant: UUID (PK),
  first_name: String (required),
  last_name: String (required),
  email: String (required),
  phone: String,
  enrollment_type: Enum [program, event],
  program_type: Enum [accompagnement_360, formation_classique] (nullable si event),
  event_type: Enum [workshop, hackathon, bootcamp, talkshow] (nullable si program),
  enrollment_date: Timestamp,
  status: Enum [active, completed, dropped],
  application_id: FK -> Application (nullable),
  created_at: Timestamp,
  updated_at: Timestamp
}
```

**Relations:**
- belongsTo Application (application_id)

---

### 3. Document Model
**Fichier:** `LesCracks-backend/src/models/Document.js`

```javascript
{
  id_document: UUID (PK),
  title: String (required),
  description: Text,
  file_url: String (required),
  file_name: String,
  file_size: Integer,
  mime_type: String,
  category_id: FK -> Category,
  uploaded_by: FK -> Admin,
  download_count: Integer (default: 0),
  created_at: Timestamp,
  updated_at: Timestamp
}
```

**Relations:**
- belongsToMany Category (via Document_Category)
- belongsTo Admin (uploaded_by)

---

### 4. Video Model
**Fichier:** `LesCracks-backend/src/models/Video.js`

```javascript
{
  id_video: UUID (PK),
  title: String (required),
  description: Text,
  video_url: String (required),
  thumbnail_url: String,
  duration: Integer,
  category_id: FK -> Category,
  uploaded_by: FK -> Admin,
  view_count: Integer (default: 0),
  created_at: Timestamp,
  updated_at: Timestamp
}
```

**Relations:**
- belongsToMany Category (via Video_Category)
- belongsTo Admin (uploaded_by)

---

### 5. Solution Model
**Fichier:** `LesCracks-backend/src/models/Solution.js`

```javascript
{
  id_solution: UUID (PK),
  title: String (required),
  description: Text,
  problem_statement: Text,
  technologies: JSON Array,
  github_url: String,
  demo_url: String,
  image_url: String,
  status: Enum [in_progress, completed, deployed],
  team_members: JSON Array,
  event_type: Enum [hackathon, bootcamp] (nullable),
  created_by: FK -> Admin,
  created_at: Timestamp,
  updated_at: Timestamp
}
```

**Relations:**
- belongsToMany Tag (via Solution_Tag)
- belongsTo Admin (created_by)

---

### 6. Testimonial Model
**Fichier:** `LesCracks-backend/src/models/Testimonial.js`

```javascript
{
  id_testimonial: UUID (PK),
  name: String (required),
  role: String,
  company: String,
  quote: Text (required),
  result: String,
  image_url: String,
  rating: Integer (1-5),
  testimonial_type: Enum [program, event],
  program_type: Enum [accompagnement_360, formation_classique] (nullable si event),
  event_type: Enum [workshop, hackathon, bootcamp, talkshow] (nullable si program),
  verified: Boolean (default: false),
  created_at: Timestamp,
  updated_at: Timestamp
}
```

**Relations:** Aucune (modèle autonome)

---

## 🔗 Relations Many-to-Many à Créer

| Relation | Table | Fichier |
|----------|-------|---------|
| Document ↔ Category | Document_Category | `LesCracks-backend/src/models/Document_Category.js` |
| Video ↔ Category | Video_Category | `LesCracks-backend/src/models/Video_Category.js` |
| Solution ↔ Tag | Solution_Tag | `LesCracks-backend/src/models/Solution_Tag.js` |

---

## 🎮 Contrôleurs à Implémenter

### 1. applicationController
**Fichier:** `LesCracks-backend/src/controllers/applicationController.js`

**Méthodes:**
- `getAll()` - GET /api/applications (admin only, avec filtrage par statut/type)
- `getById()` - GET /api/applications/:id (admin only)
- `create()` - POST /api/applications (public)
- `updateStatus()` - PUT /api/applications/:id/status (admin only)
- `delete()` - DELETE /api/applications/:id (admin only)

---

### 2. participantController
**Fichier:** `LesCracks-backend/src/controllers/participantController.js`

**Méthodes:**
- `getAll()` - GET /api/participants (admin only, avec filtrage)
- `getById()` - GET /api/participants/:id (admin only)
- `create()` - POST /api/participants (admin only)
- `update()` - PUT /api/participants/:id (admin only)
- `delete()` - DELETE /api/participants/:id (admin only)

---

### 3. documentController
**Fichier:** `LesCracks-backend/src/controllers/documentController.js`

**Méthodes:**
- `getAll()` - GET /api/documents (avec filtrage par catégorie)
- `getById()` - GET /api/documents/:id
- `create()` - POST /api/documents (admin only)
- `update()` - PUT /api/documents/:id (admin only)
- `delete()` - DELETE /api/documents/:id (admin only)

---

### 4. videoController
**Fichier:** `LesCracks-backend/src/controllers/videoController.js`

**Méthodes:**
- `getAll()` - GET /api/videos (avec filtrage par catégorie)
- `getById()` - GET /api/videos/:id
- `create()` - POST /api/videos (admin only)
- `update()` - PUT /api/videos/:id (admin only)
- `delete()` - DELETE /api/videos/:id (admin only)

---

### 5. solutionController
**Fichier:** `LesCracks-backend/src/controllers/solutionController.js`

**Méthodes:**
- `getAll()` - GET /api/solutions (avec filtrage par statut/event_type)
- `getById()` - GET /api/solutions/:id
- `create()` - POST /api/solutions (admin only)
- `update()` - PUT /api/solutions/:id (admin only)
- `delete()` - DELETE /api/solutions/:id (admin only)

---

### 6. testimonialController
**Fichier:** `LesCracks-backend/src/controllers/testimonialController.js`

**Méthodes:**
- `getAll()` - GET /api/testimonials (avec filtrage par type)
- `getById()` - GET /api/testimonials/:id
- `create()` - POST /api/testimonials (admin only)
- `update()` - PUT /api/testimonials/:id (admin only)
- `delete()` - DELETE /api/testimonials/:id (admin only)

---

## 🔧 Services à Implémenter

### 1. fileService
**Fichier:** `LesCracks-backend/src/services/fileService.js`

**Méthodes:**
- `validateFileUrl(url)` - Valider les URLs externes
- `validateVideoUrl(url)` - Valider les URLs YouTube
- `extractVideoId(url)` - Extraire l'ID YouTube
- `deleteFile(url)` - Supprimer les références

---

### 2. applicationService
**Fichier:** `LesCracks-backend/src/services/applicationService.js`

**Méthodes:**
- `processApplication(data)` - Traiter une candidature
- `sendConfirmationEmail(email, name, applicationType)` - Email de confirmation
- `sendResponseEmail(email, name, status, applicationType)` - Email de réponse
- `generateApplicationReport()` - Rapport des candidatures

---

### 3. enrollmentService
**Fichier:** `LesCracks-backend/src/services/enrollmentService.js`

**Méthodes:**
- `enrollParticipant(applicationId)` - Inscrire un participant depuis une candidature approuvée
- `updateParticipantStatus(participantId, status)` - Mettre à jour le statut
- `getEnrollmentStats(enrollmentType)` - Statistiques
- `checkAvailability(enrollmentType)` - Vérifier les places

---

## 📡 Routes API à Créer

### Applications
```
POST   /api/applications           - Soumettre une candidature (public)
GET    /api/applications           - Lister les candidatures (admin)
GET    /api/applications/:id       - Détail d'une candidature (admin)
PUT    /api/applications/:id/status - Mettre à jour le statut (admin)
DELETE /api/applications/:id       - Supprimer une candidature (admin)
```

### Participants
```
POST   /api/participants           - Créer un participant (admin)
GET    /api/participants           - Lister les participants (admin)
GET    /api/participants/:id       - Détail d'un participant (admin)
PUT    /api/participants/:id       - Mettre à jour un participant (admin)
DELETE /api/participants/:id       - Supprimer un participant (admin)
```

### Documents
```
POST   /api/documents              - Créer un document (admin)
GET    /api/documents              - Lister les documents (public)
GET    /api/documents/:id          - Détail d'un document (public)
PUT    /api/documents/:id          - Modifier un document (admin)
DELETE /api/documents/:id          - Supprimer un document (admin)
```

### Vidéos
```
POST   /api/videos                 - Créer une vidéo (admin)
GET    /api/videos                 - Lister les vidéos (public)
GET    /api/videos/:id             - Détail d'une vidéo (public)
PUT    /api/videos/:id             - Modifier une vidéo (admin)
DELETE /api/videos/:id             - Supprimer une vidéo (admin)
```

### Solutions
```
POST   /api/solutions              - Créer une solution (admin)
GET    /api/solutions              - Lister les solutions (public)
GET    /api/solutions/:id          - Détail d'une solution (public)
PUT    /api/solutions/:id          - Modifier une solution (admin)
DELETE /api/solutions/:id          - Supprimer une solution (admin)
```

### Témoignages
```
POST   /api/testimonials           - Créer un témoignage (admin)
GET    /api/testimonials           - Lister les témoignages (public)
GET    /api/testimonials/:id       - Détail d'un témoignage (public)
PUT    /api/testimonials/:id       - Modifier un témoignage (admin)
DELETE /api/testimonials/:id       - Supprimer un témoignage (admin)
```

---

## 🔐 Sécurité et Validation

### Middleware de Validation à Ajouter

**Fichier:** `LesCracks-backend/src/middleware/validation.js`

Ajouter les schémas Joi pour:
- Application creation
- Participant creation/update
- Document creation/update
- Video creation/update
- Solution creation/update
- Testimonial creation/update

### Authentification

- Routes publiques: GET pour documents, vidéos, solutions, témoignages + POST pour applications
- Routes admin: Toutes les opérations POST/PUT/DELETE pour participants + toutes les opérations pour documents/vidéos/solutions/témoignages
- Middleware: `auth.js` (existant) à utiliser

---

## 📝 Fichiers à Modifier

1. **`LesCracks-backend/src/models/index.js`** - Ajouter tous les nouveaux modèles
2. **`LesCracks-backend/src/app.js`** - Ajouter les nouvelles routes
3. **`LesCracks-backend/src/middleware/validation.js`** - Ajouter les schémas de validation
4. **`LesCracks-backend/package.json`** - Ajouter dépendances si nécessaire (nodemailer pour emails)

---

## 🚀 Ordre d'Implémentation Recommandé

1. Créer tous les modèles (6)
2. Créer les relations many-to-many (3)
3. Mettre à jour `models/index.js`
4. Créer les services (3)
5. Créer les contrôleurs (6)
6. Créer les routes (6 fichiers)
7. Ajouter la validation
8. Tester les endpoints

---

## 📞 Support et Questions

Pour toute clarification sur ce plan, veuillez consulter les besoins métier identifiés.

**Date de création:** 2025-12-19
**Version:** 2.0 (Corrigée)
