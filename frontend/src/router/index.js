import Vue from "vue";
import VueRouter from "vue-router";
import ListStudents from "../views/ListStudents.vue";
import RegisterStudent from "../views/RegisterStudent.vue";
import EditStudent from "../views/EditStudent.vue";
import LoginView from "../views/Login.vue";
import { getValue } from "@/data/local-storage";

Vue.use(VueRouter);

const beforeEnter = (to, from, next) => {
  console.log("PEGUEI??", getValue("token"));
  if (getValue("token") === null) next("/login");
  next();
};

const routes = [
  {
    path: "*",
    redirect: "/login",
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/students",
    name: "students",
    component: ListStudents,
    beforeEnter,
  },
  {
    path: "/students/create",
    name: "createStudent",
    component: RegisterStudent,
    beforeEnter,
  },
  {
    path: "/students/:id/edit",
    name: "editStudent",
    component: EditStudent,
    beforeEnter,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
