import { createRouter, createWebHistory } from "vue-router";
import Signin from "@/pages/SignIn.vue"; // Vai resolver corretamente o caminho agora
import Dashboard from "@/pages/Dashboard.vue";
import Students from "@/pages/Students.vue";

const routes = [
  {
    path: "/login",
    name: "SignIn",
    component: Signin, // Alterado de '@/pages/Login.vue' para Login
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "students",
        name: "Students",
        component: Students,
      },
    ],
  },
  {
    path: "/",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
