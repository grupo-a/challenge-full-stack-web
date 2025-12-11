---
description: "Frontend Vue.js agent for student management application following modular architecture and best practices."
tools:
  [
    "runCommands",
    "runTasks",
    "edit",
    "runNotebooks",
    "search",
    "new",
    "GitKraken/*",
    "Copilot Container Tools/*",
    "pylance mcp server/*",
    "App Modernization Deploy/*",
    "extensions",
    "cweijan.vscode-database-client2/dbclient-getDatabases",
    "cweijan.vscode-database-client2/dbclient-getTables",
    "cweijan.vscode-database-client2/dbclient-executeQuery",
    "usages",
    "vscodeAPI",
    "problems",
    "changes",
    "testFailure",
    "openSimpleBrowser",
    "fetch",
    "githubRepo",
    "github.vscode-pull-request-github/copilotCodingAgent",
    "github.vscode-pull-request-github/issue_fetch",
    "github.vscode-pull-request-github/suggest-fix",
    "github.vscode-pull-request-github/searchSyntax",
    "github.vscode-pull-request-github/doSearch",
    "github.vscode-pull-request-github/renderIssues",
    "github.vscode-pull-request-github/activePullRequest",
    "github.vscode-pull-request-github/openPullRequest",
    "postman.postman-for-vscode/openRequest",
    "postman.postman-for-vscode/getCurrentWorkspace",
    "postman.postman-for-vscode/switchWorkspace",
    "postman.postman-for-vscode/sendRequest",
    "postman.postman-for-vscode/runCollection",
    "postman.postman-for-vscode/getSelectedEnvironment",
    "todos",
    "runSubagent",
  ]
---

# Frontend Development Agent

This agent is responsible for implementing and maintaining the Vue.js frontend application following modular architecture, TypeScript best practices, and Vuetify design system.

## 📋 Tech Stack

- **Framework**: Vue 3 (Composition API)
- **UI Library**: Vuetify 3
- **State Management**: Pinia
- **Routing**: Vue Router
- **HTTP Client**: Axios
- **Language**: TypeScript
- **Validation**: Zod
- **Notifications**: Vue Toastification

## 🏗️ Project Structure - Modular Architecture

```
frontend/
├── src/
│   ├── core/                          # Core application layer
│   │   ├── components/               # Shared global components
│   │   │   ├── ui/                  # Base UI components
│   │   │   │   ├── AppButton.vue
│   │   │   │   ├── AppInput.vue
│   │   │   │   ├── AppCard.vue
│   │   │   │   └── AppDialog.vue
│   │   │   └── layout/              # Layout components
│   │   │       ├── AppBar.vue
│   │   │       ├── NavigationDrawer.vue
│   │   │       └── MainLayout.vue
│   │   ├── composables/             # Shared composables
│   │   │   ├── useApi.ts
│   │   │   ├── useNotification.ts
│   │   │   └── useDialog.ts
│   │   ├── guards/                  # Route guards
│   │   │   └── auth.guard.ts
│   │   ├── services/                # Base services
│   │   │   └── api.service.ts
│   │   ├── types/                   # Global types
│   │   │   └── common.types.ts
│   │   └── utils/                   # Global utilities
│   │       ├── validators.ts
│   │       └── formatters.ts
│   │
│   ├── modules/                      # Domain modules
│   │   ├── auth/                    # Authentication module
│   │   │   ├── components/
│   │   │   │   └── LoginForm.vue
│   │   │   ├── composables/
│   │   │   │   └── useAuth.ts
│   │   │   ├── services/
│   │   │   │   └── auth.service.ts
│   │   │   ├── stores/
│   │   │   │   └── auth.store.ts
│   │   │   ├── types/
│   │   │   │   └── auth.types.ts
│   │   │   ├── views/
│   │   │   │   └── LoginView.vue
│   │   │   └── routes.ts
│   │   │
│   │   └── students/                # Students module
│   │       ├── components/
│   │       │   ├── StudentCard.vue
│   │       │   ├── StudentForm.vue
│   │       │   ├── StudentList.vue
│   │       │   └── StudentDeleteDialog.vue
│   │       ├── composables/
│   │       │   ├── useStudents.ts
│   │       │   └── useStudentForm.ts
│   │       ├── services/
│   │       │   └── students.service.ts
│   │       ├── stores/
│   │       │   └── students.store.ts
│   │       ├── types/
│   │       │   └── student.types.ts
│   │       ├── utils/
│   │       │   ├── student.validators.ts
│   │       │   └── cpf.utils.ts
│   │       ├── views/
│   │       │   ├── StudentsListView.vue
│   │       │   └── StudentFormView.vue
│   │       └── routes.ts
│   │
│   ├── router/
│   │   └── index.ts                 # Main router importing module routes
│   ├── plugins/
│   │   ├── vuetify.ts
│   │   ├── pinia.ts
│   │   └── toast.ts
│   ├── assets/
│   ├── App.vue
│   └── main.ts
```

## 🎯 Naming Conventions

### **1. File Naming**

- **Components**: PascalCase (e.g., `StudentCard.vue`, `FormInput.vue`, `AppButton.vue`)
- **Composables**: camelCase with `use` prefix (e.g., `useStudents.ts`, `useAuth.ts`, `useDialog.ts`)
- **Stores**: camelCase with `.store` suffix (e.g., `students.store.ts`, `auth.store.ts`)
- **Services**: camelCase with `.service` suffix (e.g., `students.service.ts`, `api.service.ts`)
- **Types**: camelCase with `.types` suffix (e.g., `student.types.ts`, `auth.types.ts`)
- **Views**: PascalCase with `View` suffix (e.g., `StudentsListView.vue`, `LoginView.vue`)
- **Utils**: camelCase with `.utils` suffix (e.g., `cpf.utils.ts`, `formatters.ts`)

### **2. Type/Interface Naming**

- **Interfaces**: PascalCase (e.g., `Student`, `User`, `PaginatedResponse<T>`)
- **DTOs**: PascalCase with `DTO` suffix (e.g., `CreateStudentDTO`, `UpdateStudentDTO`)
- **Types**: PascalCase (e.g., `StudentFilters`, `AuthState`)
- **Enums**: PascalCase (e.g., `UserRole`, `StudentStatus`)

### **3. Variable/Constant Naming**

- **Variables**: camelCase (e.g., `studentList`, `isLoading`, `errorMessage`)
- **Constants**: UPPER_SNAKE_CASE for true constants (e.g., `API_BASE_URL`, `MAX_ITEMS_PER_PAGE`)
- **Reactive refs**: camelCase (e.g., `const students = ref<Student[]>([])`)
- **Boolean variables**: prefix with `is`, `has`, `should` (e.g., `isLoading`, `hasError`, `shouldValidate`)

### **4. Function/Method Naming**

- **Actions**: verb + noun (e.g., `fetchStudents()`, `deleteStudent()`, `handleSubmit()`)
- **Event handlers**: `handle` + EventName (e.g., `handleClick()`, `handleDelete()`, `handleFormSubmit()`)
- **Computed properties**: noun or adjective (e.g., `filteredStudents`, `totalCount`, `isValid`)
- **Validators**: `validate` + Field (e.g., `validateCPF()`, `validateEmail()`)
- **Formatters**: `format` + Type (e.g., `formatCPF()`, `formatDate()`)

## 📐 Component Structure Convention

```vue
<!-- StudentCard.vue -->
<script setup lang="ts">
// 1. Imports (external first, then internal)
import { computed, ref } from "vue";
import type { Student } from "../types/student.types";

// 2. Props & Emits
interface Props {
  student: Student;
  loading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const emit = defineEmits<{
  edit: [id: string];
  delete: [id: string];
}>();

// 3. Composables (if any)
// const { someFunction } = useComposable()

// 4. Reactive state
const isExpanded = ref(false);

// 5. Computed properties
const fullName = computed(() => props.student.name.toUpperCase());

// 6. Methods
const handleEdit = () => {
  emit("edit", props.student.id);
};

// 7. Lifecycle hooks (if any)
// onMounted(() => {})
</script>

<template>
  <!-- Template with proper indentation -->
  <v-card>
    <v-card-title>{{ fullName }}</v-card-title>
    <v-card-actions>
      <v-btn @click="handleEdit">Edit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
/* Scoped styles only */
.custom-class {
  /* ... */
}
</style>
```

## 🏪 Pinia Store Structure

```typescript
// stores/students.store.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Student, StudentFilters } from "../types/student.types";
import { studentsService } from "../services/students.service";

export const useStudentsStore = defineStore("students", () => {
  // State
  const students = ref<Student[]>([]);
  const currentStudent = ref<Student | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters (computed)
  const totalStudents = computed(() => students.value.length);
  const hasStudents = computed(() => students.value.length > 0);

  // Actions
  async function fetchStudents(filters?: StudentFilters) {
    loading.value = true;
    error.value = null;
    try {
      const response = await studentsService.list(filters);
      students.value = response.data;
    } catch (e) {
      error.value = "Erro ao carregar alunos";
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function deleteStudent(id: string) {
    loading.value = true;
    error.value = null;
    try {
      await studentsService.delete(id);
      students.value = students.value.filter((s) => s.id !== id);
    } catch (e) {
      error.value = "Erro ao excluir aluno";
      throw e;
    } finally {
      loading.value = false;
    }
  }

  function $reset() {
    students.value = [];
    currentStudent.value = null;
    loading.value = false;
    error.value = null;
  }

  return {
    // State
    students,
    currentStudent,
    loading,
    error,
    // Getters
    totalStudents,
    hasStudents,
    // Actions
    fetchStudents,
    deleteStudent,
    $reset,
  };
});
```

## 🔌 Service Layer Pattern

```typescript
// services/students.service.ts
import { api } from "@/core/services/api.service";
import type {
  Student,
  CreateStudentDTO,
  UpdateStudentDTO,
  PaginatedResponse,
} from "../types/student.types";

export const studentsService = {
  async list(params?: {
    page?: number;
    limit?: number;
    name?: string;
    email?: string;
    ra?: number;
  }) {
    const { data } = await api.get<PaginatedResponse<Student>>("/students", {
      params,
    });
    return data;
  },

  async getById(id: string) {
    const { data } = await api.get<Student>(`/students/${id}`);
    return data;
  },

  async create(student: CreateStudentDTO) {
    const { data } = await api.post<Student>("/students", student);
    return data;
  },

  async update(id: string, student: UpdateStudentDTO) {
    const { data } = await api.put<Student>(`/students/${id}`, student);
    return data;
  },

  async delete(id: string) {
    await api.delete(`/students/${id}`);
  },
};
```

## 🎨 Best Practices

### **1. TypeScript**

- Always define types for props, emits, and function parameters
- Use `interface` for object shapes, `type` for unions/intersections
- Avoid `any` - use `unknown` when type is truly unknown
- Use generics for reusable components/functions

### **2. Composition API**

- Use `<script setup>` syntax
- Group related reactive state together
- Extract reusable logic to composables
- Keep components focused and single-responsibility

### **3. Vuetify**

- Use Vuetify components instead of custom HTML
- Leverage Vuetify's built-in validation with `v-form`
- Use `v-data-table-server` for server-side pagination
- Follow Vuetify's spacing and sizing conventions

### **4. Error Handling**

- Always handle errors in async functions
- Display user-friendly error messages via toast notifications
- Log detailed errors to console for debugging
- Implement loading states for async operations

### **5. Performance**

- Use `v-show` for frequently toggled elements
- Use `v-if` for conditionally rendered expensive components
- Implement proper pagination for large lists
- Lazy load routes and heavy components

### **6. Accessibility**

- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers when possible

## 🧪 Testing Conventions (when applicable)

- Test files should be named `*.spec.ts` or `*.test.ts`
- Place tests near the code they test
- Use descriptive test names: `it('should fetch students successfully')`
- Mock external dependencies (API calls, stores)

## 📝 Module Development Workflow

When creating a new domain module:

1. Create module folder structure in `src/modules/[module-name]/`
2. Define types first in `types/[module-name].types.ts`
3. Implement service layer in `services/[module-name].service.ts`
4. Create Pinia store in `stores/[module-name].store.ts`
5. Build reusable composables in `composables/`
6. Create components in `components/`
7. Build views in `views/`
8. Define routes in `routes.ts`
9. Add barrel export in `index.ts`

## 🚫 What This Agent Should NOT Do

- Do not use Options API (use Composition API only)
- Do not create global CSS that affects other modules
- Do not bypass TypeScript type checking
- Do not store sensitive data in localStorage without encryption
- Do not create circular dependencies between modules
- Do not use `@ts-ignore` (fix the type issue instead)

## 🎯 Agent Goals

- Maintain consistent code structure across modules
- Ensure type safety throughout the application
- Follow Vue 3 and Vuetify best practices
- Keep modules decoupled and maintainable
- Provide clear error messages and loading states
- Write clean, readable, and well-documented code
