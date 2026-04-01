# 📁 Frontend‑Ordnerstruktur (komplett & GitHub‑fertig)

```bash
frontend/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   │
│   └── customers/
│       ├── page.tsx              # Kundenliste (Server Component)
│       ├── new/
│       │   └── page.tsx          # Neuer Kunde (Server Component + Client Form)
│       └── [id]/
│           ├── page.tsx          # Kunde bearbeiten
│           └── CustomerForm.tsx  # Client Component
│
├── src/
│   ├── services/
│   │   └── customerService.ts    # REST-Client
│   │
│   ├── types/
│   │   └── customer.ts           # DTO-Typen
│   │
│   └── components/
│       ├── Layout/
│       │   └── Header.tsx        # optional
│       └── ui/
│           ├── Button.tsx
│           └── Input.tsx
│
├── public/
│   └── favicon.ico
│
├── .eslintrc.json
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── .gitignore

```

# 🌐 .env.local (lokale Entwicklung ohne Docker)

Wenn dein Backend lokal auf Port 8080 läuft:
```Env
NEXT_PUBLIC_API_URL=http://localhost:8080`
```
Das ist alles, was dein Frontend braucht.

# 🐳 .env.local (wenn du Docker Compose verwendest)

Wenn dein Frontend im Container läuft und dein Backend im Container backend heißt:

```Env
NEXT_PUBLIC_API_BASE_URL=http://backend:8080
```
Das ist wichtig, weil Container sich über Service‑Namen ansprechen, nicht über localhost.

# 🔐 Optionale zusätzliche Variablen (falls du später erweiterst)

Falls du später Auth, Logging oder Feature Flags einbaust:
```Env
NEXT_PUBLIC_APP_NAME=Fakturierung
NEXT_PUBLIC_ENV=local
```
# 💡 Hinweis
* .env.local wird nicht eingecheckt (steht in .gitignore)
* Next.js lädt alle Variablen, die mit NEXT_PUBLIC_ beginnen, automatisch im Browser
* Backend‑URL ist damit überall im Frontend zentral konfiguriert

# 👉 eine .env.docker für Compose

Natürlich, Franz — hier ist eine saubere, production‑ready .env.docker, perfekt abgestimmt auf dein Docker‑Compose‑Setup mit:
* SQL Server
* Backend (Spring Boot 4.0.5)
* Frontend (Next.js 16)

```Env
# -------------------------
# FRONTEND (Next.js)
# -------------------------
# Der Frontend-Container spricht den Backend-Container über den Service-Namen an
NEXT_PUBLIC_API_BASE_URL=http://backend:8080


# -------------------------
# BACKEND (Spring Boot)
# -------------------------
SPRING_DATASOURCE_URL=jdbc:sqlserver://sqlserver:1433;databaseName=fakturierung;encrypt=false
SPRING_DATASOURCE_USERNAME=sa
SPRING_DATASOURCE_PASSWORD=YourStrong!Passw0rd

# Optional: Logging-Level
SPRING_PROFILES_ACTIVE=docker


# -------------------------
# SQL SERVER
# -------------------------
ACCEPT_EULA=Y
SA_PASSWORD=YourStrong!Passw0rd
MSSQL_PID=Developer
```

## 💡 Warum diese Datei perfekt ist
### ✔ Frontend → Backend

Der Frontend‑Container kann den Backend‑Container nicht über localhost erreichen.
Darum:
```Code
NEXT_PUBLIC_API_BASE_URL=http://backend:8080
```
### ✔ Backend → SQL Server

Der Backend‑Container erreicht SQL Server über:
```Code
sqlserver:1433
```
### ✔ Spring Boot nutzt ENV‑Variablen

Spring Boot 4 liest automatisch:
```Code
SPRING_DATASOURCE_URL
SPRING_DATASOURCE_USERNAME
SPRING_DATASOURCE_PASSWORD
```
### ✔ SQL Server Variablen

Compose startet SQL Server korrekt mit:
```Code
ACCEPT_EULA=Y
SA_PASSWORD=YourStrong!Passw0rd
MSSQL_PID=Developer`
```
## 🔧 Bonus: Docker‑Compose‑Snippet (falls du es brauchst)

Damit du siehst, wie .env.docker eingebunden wird:
```Code
services:
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2022-latest
    env_file: .env.docker
    ports:
      - "1433:1433"

  backend:
    build: ./backend
    env_file: .env.docker
    depends_on:
      - sqlserver
    ports:
      - "8080:8080"

  frontend:
    build: ./frontend
    env_file: .env.docker
    depends_on:
      - backend
    ports:
      - "3000:3000"
```
============================================================

# .env für das Backend erstellen

============================================================

hier ist eine saubere, production‑ready .env für dein Spring‑Boot‑Backend, perfekt abgestimmt auf:
* SQL Server
* Flyway
* Spring Boot 4.0.5
* DDD/Hexagon Architektur
* Docker‑unabhängige lokale Entwicklung

Sie ist bewusst minimal, klar strukturiert und sofort einsatzbereit.

## 🌐 .env (für lokales Backend ohne Docker)
```Env
# ----------------------------------------
# DATASOURCE (lokale Entwicklung)
# ----------------------------------------
SPRING_DATASOURCE_URL=jdbc:sqlserver://localhost:1433;databaseName=fakturierung;encrypt=false
SPRING_DATASOURCE_USERNAME=sa
SPRING_DATASOURCE_PASSWORD=YourStrong!Passw0rd

# ----------------------------------------
# JPA / Hibernate
# ----------------------------------------
SPRING_JPA_HIBERNATE_DDL_AUTO=validate
SPRING_JPA_SHOW_SQL=false

# ----------------------------------------
# Flyway
# ----------------------------------------
SPRING_FLYWAY_ENABLED=true
SPRING_FLYWAY_BASELINE_ON_MIGRATE=true

# ----------------------------------------
# Server
# ----------------------------------------
SERVER_PORT=8080

# ----------------------------------------
# Logging
# ----------------------------------------
LOGGING_LEVEL_ROOT=INFO
LOGGING_LEVEL_COM_BCS=DEBUG
```

### 💡 Warum diese .env optimal ist
✔ Trennung von Code & Konfiguration

Spring Boot 4 liest automatisch alle Variablen im Format:
```Code
SPRING_*
SERVER_*
LOGGING_*
```

### ✔ Flyway sauber aktiviert  
Damit deine Migrationen immer laufen.

### ✔ ddl-auto=validate
Perfekt für DDD/Hexagon, weil:
* keine zufälligen Schema‑Änderungen
* Flyway ist die einzige Quelle der Wahrheit
### ✔ Logging fein steuerbar  
* Du kannst später pro Bounded Context eigene Level setzen.

## 🔧 Bonus: application.yml so anpassen, dass .env Vorrang hat

Damit deine .env sauber greift, sollte dein application.yml so aussehen:

```Yaml
spring:
  datasource:
    url: ${SPRING_DATASOURCE_URL}
    username: ${SPRING_DATASOURCE_USERNAME}
    password: ${SPRING_DATASOURCE_PASSWORD}

  jpa:
    hibernate:
      ddl-auto: ${SPRING_JPA_HIBERNATE_DDL_AUTO:validate}
    show-sql: ${SPRING_JPA_SHOW_SQL:false}

flyway:
  enabled: ${SPRING_FLYWAY_ENABLED:true}
  baseline-on-migrate: ${SPRING_FLYWAY_BASELINE_ON_MIGRATE:true}

server:
  port: ${SERVER_PORT:8080}

logging:
  level:
    root: ${LOGGING_LEVEL_ROOT:INFO}
    com.bcs: ${LOGGING_LEVEL_COM_BCS:DEBUG}
```

Damit ist dein Backend 100% environment‑driven, wie es in Enterprise‑Projekten üblich ist

# 👉 eine application-docker.yml für Container‑Deployments erstellen

# 🚀 application-docker.yml (für Container‑Deployments) 

```Yaml
spring:
  datasource:
    url: ${SPRING_DATASOURCE_URL}
    username: ${SPRING_DATASOURCE_USERNAME}
    password: ${SPRING_DATASOURCE_PASSWORD}
    driver-class-name: com.microsoft.sqlserver.jdbc.SQLServerDriver

  jpa:
    hibernate:
      ddl-auto: validate
    properties:
      hibernate:
        dialect: org.hibernate.dialect.SQLServerDialect
    open-in-view: false
    show-sql: false

flyway:
  enabled: true
  baseline-on-migrate: true
  url: ${SPRING_DATASOURCE_URL}
  user: ${SPRING_DATASOURCE_USERNAME}
  password: ${SPRING_DATASOURCE_PASSWORD}

server:
  port: ${SERVER_PORT:8080}

logging:
  level:
    root: ${LOGGING_LEVEL_ROOT:INFO}
    com.bcs: ${LOGGING_LEVEL_COM_BCS:INFO}

springdoc:
  api-docs:
    path: /v3/api-docs
  swagger-ui:
    path: /swagger-ui.html
```

## 💡 Warum diese Datei perfekt für Docker ist
### ✔ Keine Hardcodings
Alles kommt aus .env.docker:
* DB‑URL
* Credentials
* Logging
* Port

### ✔ Flyway nutzt dieselben Variablen wie Spring
Damit Migrationen im Container garantiert laufen.

*  ✔ ddl-auto=validate

In Produktion absolut korrekt:
* Schema wird nicht verändert
  *  Flyway ist die einzige Quelle der Wahrheit

### ✔ open-in-view=false

### Best Practice für DDD/Hexagon.
* ✔ Swagger/OpenAPI bleibt aktiv
  * Sehr hilfreich für Container‑Deployments.

## 🔧 Wie du application-docker.yml aktivierst

In deiner Dockerfile:
```Dockerfile
ENV SPRING_CONFIG_NAME=application-docker
```
Oder in docker-compose.yml:
```Yaml
environment:
  - SPRING_CONFIG_NAME=application-docker
  ```

### =============================================
# 👉 eine vollständige docker-compose.yml mit Healthchecks    
### =====================================================

Alles klar, Franz — hier kommt eine vollständige, production‑ready docker-compose.yml mit:
* SQL Server 2022
* Backend (Spring Boot 4.0.5)
* Frontend (Next.js 16)
* Healthchecks für alle Services
* Restart‑Strategien
* Saubere Netzwerk‑Isolation
* Optimale Startup‑Reihenfolge

Das ist exakt das Setup, das du in einem echten Enterprise‑Projekt verwenden würdest.

### 🚀 docker-compose.yml (vollständig, mit Healthchecks)

```Yaml
version: "3.9"

services:
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: fakturierung-sqlserver
    env_file: .env.docker
    ports:
      - "1433:1433"
    healthcheck:
      test: ["CMD", "/opt/mssql-tools/bin/sqlcmd", "-S", "localhost", "-U", "sa", "-P", "$$SA_PASSWORD", "-Q", "SELECT 1"]
      interval: 10s
      timeout: 5s
      retries: 10
    restart: unless-stopped

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: fakturierung-backend
    env_file: .env.docker
    depends_on:
      sqlserver:
        condition: service_healthy
    ports:
      - "8080:8080"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 10s
      timeout: 5s
      retries: 10
    restart: unless-stopped

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: fakturierung-frontend
    env_file: .env.docker
    depends_on:
      backend:
        condition: service_healthy
    ports:
      - "3000:3000"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 10s
      timeout: 5s
      retries: 10
    restart: unless-stopped

networks:
  default:
    name: fakturierung-net

```
# ✅ PowerShell: .next löschen
## wenn Compilieren nict funktioniert: Remove-Item -Recurse -Force .next

```powershell
Remove-Item -Recurse -Force .next
```