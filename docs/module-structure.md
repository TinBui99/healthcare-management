# Healthcare Management - Module Structure Diagram

## 🏗️ Project Architecture Overview

```mermaid
graph TB
    subgraph "Root Level"
        A[index.html]
        B[package.json]
        C[vite.config.js]
        D[README.md]
    end
    
    subgraph "src/"
        E[main.js]
        F[App.vue]
        G[assets/]
        H[components/]
        I[layouts/]
        J[router/]
        K[views/]
        L[data/]
    end
    
    subgraph "src/assets/"
        G1[css/]
        G2[images/]
        G3[fonts/]
    end
    
    subgraph "src/layouts/"
        I1[MainLayout.vue]
    end
    
    subgraph "src/router/"
        J1[index.js]
    end
    
    subgraph "src/views/"
        K1[Dashboard.vue]
        K2[Patients.vue]
        K3[Appointments.vue]
    end
    
    subgraph "src/data/"
        L1[index.js]
        L2[dashboard.js]
        L3[patients.js]
        L4[appointments.js]
        L5[notifications.js]
    end
    
    A --> E
    E --> F
    F --> J1
    J1 --> K1
    K1 --> I1
    K1 --> L1
    I1 --> L1
    
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
```

## 📁 Detailed Module Breakdown

### 1. **Root Configuration Files**

```
healthcare-management/
├── index.html              # Entry point HTML
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── README.md              # Project documentation
└── docs/                  # Documentation files
    ├── execution-flow.md  # Execution flow diagrams
    └── module-structure.md # Module structure docs
```

### 2. **Source Code Structure (`src/`)**

```
src/
├── main.js                 # Application entry point
├── App.vue                 # Root Vue component
├── assets/                 # Static assets
│   └── css/
│       └── main.css       # Global styles
├── components/             # Reusable Vue components
├── layouts/               # Layout components
│   └── MainLayout.vue    # Main application layout
├── router/                # Vue Router configuration
│   └── index.js          # Route definitions
├── views/                 # Page-level Vue components
│   ├── Dashboard.vue     # Dashboard page
│   ├── Patients.vue      # Patients management page
│   └── Appointments.vue  # Appointments management page
└── data/                  # Mock data and data layer
    ├── index.js          # Central data exports
    ├── dashboard.js      # Dashboard statistics
    ├── patients.js       # Patient data
    ├── appointments.js   # Appointment data
    └── notifications.js  # Notification data
```

## 🔗 Module Dependencies

```mermaid
graph LR
    subgraph "Core Dependencies"
        A[Vue 3]
        B[Vue Router]
        C[Pinia]
        D[Vite]
    end
    
    subgraph "UI Dependencies"
        E[Lucide Vue Next]
        F[@vueuse/core]
    end
    
    subgraph "Development Dependencies"
        G[@vitejs/plugin-vue]
        H[Sass]
    end
    
    subgraph "Application Modules"
        I[main.js]
        J[App.vue]
        K[Router]
        L[Views]
        M[Layouts]
        N[Data Layer]
    end
    
    A --> I
    B --> I
    C --> I
    D --> I
    E --> L
    F --> L
    G --> D
    H --> D
    
    I --> J
    J --> K
    K --> L
    L --> M
    L --> N
    
    style A fill:#42b883
    style B fill:#42b883
    style C fill:#42b883
    style D fill:#646cff
    style E fill:#ff6b6b
    style F fill:#ff6b6b
    style G fill:#ffd93d
    style H fill:#ffd93d
```
```mermaid
## 🎯 Component Hierarchy


graph TD
    A[App.vue] --> B[Router View]
    B --> C[Dashboard.vue]
    B --> D[Patients.vue]
    B --> E[Appointments.vue]
    
    C --> F[MainLayout.vue]
    D --> F
    E --> F
    
    F --> G[Sidebar Navigation]
    F --> H[Header Section]
    F --> I[Main Content Slot]
    
    H --> J[User Menu]
    H --> K[Notifications]
    H --> L[Page Title]
    
    G --> M[Menu Items]
    M --> N[Dashboard Link]
    M --> O[Patients Link]
    M --> P[Appointments Link]
    
    I --> Q[Dashboard Content]
    I --> R[Patients Content]
    I --> S[Appointments Content]
    
    Q --> T[Stats Cards]
    Q --> U[Charts]
    Q --> V[Lists]
    Q --> W[Quick Actions]
    
    style A fill:#e1f5fe
    style F fill:#f3e5f5
    style G fill:#e8f5e8
    style H fill:#fff3e0
    style I fill:#fce4ec
    style Q fill:#f1f8e9
```

## 📊 Data Layer Architecture

```mermaid
graph TB
    subgraph "Data Layer"
        A[data/index.js]
        B[data/dashboard.js]
        C[data/patients.js]
        D[data/appointments.js]
        E[data/notifications.js]
    end
    
    subgraph "Data Exports"
        F[dashboardStats]
        G[weeklyChartData]
        H[monthlyChartData]
        I[quarterlyChartData]
        J[quickActions]
        K[patientsData]
        L[recentPatientsData]
        M[appointmentsData]
        N[todayAppointmentsData]
        O[notificationsData]
    end
    
    subgraph "Consumers"
        P[Dashboard.vue]
        Q[MainLayout.vue]
        R[Patients.vue]
        S[Appointments.vue]
    end
    
    A --> B
    A --> C
    A --> D
    A --> E
    
    B --> F
    B --> G
    B --> H
    B --> I
    B --> J
    
    C --> K
    C --> L
    
    D --> M
    D --> N
    
    E --> O
    
    F --> P
    G --> P
    H --> P
    I --> P
    J --> P
    K --> R
    L --> P
    M --> S
    N --> P
    O --> Q
    
    style A fill:#e0f2f1
    style P fill:#e1f5fe
    style Q fill:#f3e5f5
    style R fill:#e8f5e8
    style S fill:#fff3e0
```

## 🔧 Configuration Files

### **package.json Dependencies**
- **Core**: Vue 3, Vue Router 4, Pinia
- **Build**: Vite 5, @vitejs/plugin-vue
- **UI**: Lucide Vue Next, @vueuse/core
- **HTTP**: Axios (for future API calls)
- **Styling**: Sass

### **vite.config.js**
- Vue plugin configuration
- Path alias (@ → src/)
- Development server port (3000)

### **Router Configuration**
- History mode routing
- Route definitions for Dashboard, Patients, Appointments
- Future routes: Medical Records, Billing (commented out)

## 🎨 Styling Architecture

```mermaid
graph LR
    A[main.css] --> B[CSS Variables]
    A --> C[Global Styles]
    A --> D[Utility Classes]
    
    B --> E[Primary Colors]
    B --> F[Text Colors]
    B --> G[Surface Colors]
    B --> H[Border Colors]
    
    C --> I[Typography]
    C --> J[Layout]
    C --> K[Animations]
    
    D --> L[Button Styles]
    D --> M[Card Styles]
    D --> N[Form Styles]
    
    E --> O[Component Scoped Styles]
    F --> O
    G --> O
    H --> O
    
    style A fill:#e0f2f1
    style B fill:#f3e5f5
    style C fill:#e8f5e8
    style D fill:#fff3e0
    style O fill:#fce4ec
```

## 🚀 Module Responsibilities

| Module | Responsibility | Key Features |
|--------|----------------|-------------|
| **main.js** | App initialization | Vue app setup, plugin registration |
| **App.vue** | Root component | Router view, global styles |
| **router/** | Navigation | Route definitions, navigation logic |
| **layouts/** | UI structure | Consistent layout across pages |
| **views/** | Page components | Specific page functionality |
| **data/** | Data management | Mock data, data layer abstraction |
| **assets/** | Static resources | CSS, images, fonts |

## 🔄 Data Flow Pattern

```mermaid
sequenceDiagram
    participant V as View Component
    participant D as Data Layer
    participant L as Layout
    participant R as Router
    
    V->>D: Import data
    D-->>V: Return mock data
    V->>L: Emit events
    L->>R: Handle navigation
    R-->>L: Route updates
    L-->>V: Layout changes
    V->>V: Update UI
```

## 📋 Future Module Extensions

### Planned Modules:
- **stores/** - Pinia stores for global state
- **services/** - API service layer
- **utils/** - Utility functions
- **composables/** - Vue composables
- **middleware/** - Route guards and middleware
- **types/** - TypeScript definitions (if migrating to TS)

### Integration Points:
- API integration in services/
- Global state management in stores/
- Shared logic in composables/
- Type safety with TypeScript
