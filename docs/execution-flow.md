# Healthcare Management - Execution Flow Diagram

## 🔄 Flow Execution Order (localhost:3000)

```mermaid
graph TD
    A["Browser: localhost:3000"] --> B["index.html"]
    B --> C["Load main.js via script tag"]
    C --> D["createApp(App)"]
    D --> E["Register Pinia Store"]
    E --> F["Register Vue Router"]
    F --> G["Mount to #app"]
    G --> H["App.vue renders"]
    H --> I["<router-view />"]
    I --> J["Router matches route '/'"]
    J --> K["Load Dashboard.vue"]
    K --> L["Dashboard uses MainLayout"]
    L --> M["MainLayout renders sidebar"]
    M --> N["MainLayout renders header"]
    N --> O["MainLayout renders main content"]
    O --> P["Dashboard content renders"]
    P --> Q["Import data from @/data"]
    Q --> R["Display stats, charts, lists"]
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#e8f5e8
    style D fill:#fff3e0
    style E fill:#fce4ec
    style F fill:#f1f8e9
    style G fill:#e0f2f1
    style H fill:#f9fbe7
    style I fill:#e8eaf6
    style J fill:#fff8e1
    style K fill:#e0f7fa
    style L fill:#f3e5f5
    style M fill:#e8f5e8
    style N fill:#fff3e0
    style O fill:#fce4ec
    style P fill:#f1f8e9
    style Q fill:#e0f2f1
    style R fill:#f9fbe7
```

## 📋 Detailed Execution Steps

### Phase 1: Application Bootstrap
1. **index.html** - Entry point HTML file
2. **main.js** - Vue app initialization
3. **App.vue** - Root component with router-view

### Phase 2: Routing & Component Loading
4. **router/index.js** - Route configuration
5. **Dashboard.vue** - Main dashboard component
6. **MainLayout.vue** - Layout wrapper component

### Phase 3: Data Integration
7. **data/index.js** - Central data export
8. **data/dashboard.js** - Dashboard statistics
9. **data/patients.js** - Patient data
10. **data/appointments.js** - Appointment data
11. **data/notifications.js** - Notification data

### Phase 4: Rendering
12. **Sidebar Navigation** - Menu items and navigation
13. **Header Section** - User info, notifications
14. **Dashboard Content** - Stats cards, charts, lists
15. **Interactive Elements** - Modals, forms, buttons

## ⚡ Performance Flow

```mermaid
sequenceDiagram
    participant Browser
    participant Index
    participant MainJS
    participant App
    participant Router
    participant Dashboard
    participant MainLayout
    participant Data
    
    Browser->>Index: Request localhost:3000
    Index->>MainJS: Load main.js
    MainJS->>App: createApp(App)
    MainJS->>App: use(Pinia)
    MainJS->>App: use(Router)
    MainJS->>App: mount('#app')
    App->>Router: <router-view />
    Router->>Dashboard: Match route '/'
    Dashboard->>MainLayout: Import and use
    MainLayout->>Data: Import notifications
    Dashboard->>Data: Import dashboard data
    Data-->>Dashboard: Return mock data
    Dashboard-->>MainLayout: Render content
    MainLayout-->>App: Complete layout
    App-->>Browser: Render final page
```

## 🎯 Key Integration Points

### 1. **Data Flow**
- Mock data from `/src/data/` files
- Centralized exports through `index.js`
- Reactive data binding in Vue components

### 2. **Component Hierarchy**
```
App.vue
├── Router View
    └── Dashboard.vue
        └── MainLayout.vue
            ├── Sidebar
            ├── Header
            └── Main Content (Dashboard Content)
```

### 3. **State Management**
- Local component state with `ref()` and `reactive()`
- No global state (Pinia not actively used yet)
- Props and events for component communication

### 4. **Routing Logic**
- Default route: `/` → Dashboard
- Named routes for navigation
- Router-link components for navigation

## 🚀 Initialization Timeline

| Time | Component | Action |
|------|-----------|--------|
| 0ms | Browser | Request localhost:3000 |
| 10ms | index.html | Load HTML and scripts |
| 50ms | main.js | Initialize Vue app |
| 100ms | App.vue | Mount root component |
| 150ms | Router | Process route matching |
| 200ms | Dashboard.vue | Load dashboard component |
| 250ms | MainLayout.vue | Render layout structure |
| 300ms | Data files | Import mock data |
| 350ms | Components | Render final UI |
| 400ms | Page | Fully interactive dashboard |
