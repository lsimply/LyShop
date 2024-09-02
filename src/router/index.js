import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Index from "../views/Index.vue";
import Detail from "../views/Detail.vue";
import Pay from "../views/Pay.vue";

const routes = [
  {
    path: "/",
    name: "首页",
    redirect: '/index'
  },
  // {
  //   path: "/",
  //   name: "home",
  //   component: HomeView,
  // },
  {
    path: "/index",
    name: "index",
    component:Index ,
  },
  {
    path: "/detail",
    name: "Detail",
    component:Detail ,
  },
  {
    path: "/pay/:id",
    name: "Pay",
    component:Pay ,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
