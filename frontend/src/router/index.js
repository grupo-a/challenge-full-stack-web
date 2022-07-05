import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "List Students",
      component: () => import("@/components/StudentsList")
    },
    {
      path: "/form",
      name: "Create Student",
      component: () => import("@/components/StudentsForm")
    },
    {
      path: "/form/:id",
      name: "Update Student",
      component: () => import("@/components/StudentsForm"),
      props: true
    }
  ]
});