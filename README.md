# TraceFlow

### Real-time Website Observability Platform

TraceFlow is a developer-focused observability platform that provides real-time insights into website performance, errors, and user interactions.

It enables developers to **trace the flow of data** across their applications by collecting events from client-side SDKs and visualizing them through a reactive dashboard.

---
```text
# Clone the repository
git clone https://github.com/Slayer-X164/TraceFlow.git
```
 Navigate to /server
```text
# Install dependencies
npm install

# Compiles TypeScript to dist/
npm run build

# Runs server using tsx
npm run dev

# Runs compiled production build
npm run start
```

##  Features (Planned / In Progress)

-  Real-time event ingestion (via SDK)
-  Error & log tracking
-  Performance monitoring (API latency, load time)
-  Live dashboard for visualization
-  Project-based tracking using API keys

---

## Tech Stack

**Backend**
: Node.js (v20+),
Express,
ypeScript,

**Frontend (Planned)**
: React

**Database**
: PostgreSQL

**Architecture**
: Controller → Service → Model pattern

---

## high level idea TraceFlow works
###
Developers integrate the TraceFlow SDK into their website
SDK captures events (errors, logs, performance)
Events are sent to the backend via HTTP requests
Backend processes and stores data
Dashboard visualizes insights in real-time

