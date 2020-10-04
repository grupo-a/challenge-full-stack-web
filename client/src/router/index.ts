import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import StudentsView from "../views/Students.vue";
import { ROUTES } from "../constants";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: any) {
  return (originalPush.call(this, location) as any).catch((err: Error) => {
    if (err.name !== "NavigationDuplicated") {
      throw err;
    }
  });
};

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  { path: "/", redirect: ROUTES.STUDENTS.PATH },
  {
    path: ROUTES.STUDENTS.PATH,
    name: ROUTES.STUDENTS.NAME,
    component: StudentsView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
