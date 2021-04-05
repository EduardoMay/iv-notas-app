import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Tabs from "../views/Tabs.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/notes/list"
  },
  {
    path: "/notes/",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "/notes/list"
      },
      {
        path: "list",
        component: () => import("@/views/notes/ListNotes.vue")
      },
      {
        path: "view/:id",
        component: () => import("@/views/notes/ViewNote.vue")
      },
      {
        path: "add",
        component: () => import("@/views/notes/AddNote.vue")
      },
      {
        path: "edit/:id",
        component: () => import("@/views/notes/AddNote.vue")
      }
    ]
  },
  {
    path: "/labels/",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "/labels/list"
      },
      {
        path: "edit/:id",
        component: () => import("@/views/labels/ListLabels.vue")
      },
      {
        path: "list",
        component: () => import("@/views/labels/Labels.vue")
      }
    ]
  },
  {
    path: "/favorites",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "/favorites/list"
      },
      {
        path: "list",
        component: () => import("@/views/favorites/FavoritesNotes.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
