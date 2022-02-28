# Poke-fu-mi

```mermaid
graph TB;
    A[Arena API] -- S'authentifie --> B[Auth API]
    B[Auth API] -- Requête --> C[Users API]
    D[Proxy NGINX] -- Redirige --> A
    D -- Redirige --> B
    D -- Redirige --> C
    E[Utilisateur] --> D
```

## Architecture

L'application se découpe en 3 micro-services différents, ayant chacun un rôle précis :
- Arena : API de gestion des matches
- Auth : API de gestion de l'authentification (autorité de certification)
- Users : API de gestion des utilisateurs

Chaque micro-service dispose de sa propre base de données, à l'exception de Auth qui s'appuie sur Users afin d'apporter un mécanisme de génération de tokens JSONWebToken (JWT)

