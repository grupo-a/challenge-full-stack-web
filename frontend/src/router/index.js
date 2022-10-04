import Vue from "vue";
import VueRouter from "vue-router";
import ListStudents from "../views/ListStudents.vue";
import RegisterStudent from "../views/RegisterStudent.vue";
import EditStudent from "../views/EditStudent.vue";
import LoginView from "../views/Login.vue";

Vue.use(VueRouter);

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
  },
  {
    path: "/students/create",
    name: "createStudent",
    component: RegisterStudent,
  },
  {
    path: "/students/:id/edit",
    name: "editStudent",
    component: EditStudent,
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

// router.beforeEach((to, from, next) => {
//   next("/login");
// });

export default router;
