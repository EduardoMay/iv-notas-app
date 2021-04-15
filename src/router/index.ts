import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Tabs from "@/views/Tabs.vue";
import ViewNote from "@/views/notes/ViewNote.vue";

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
    path: "/notes/view/:id",
    name: "ViewNote",
    component: ViewNote
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
        path: "list",
        component: () => import("@/views/labels/Labels.vue")
      }
    ]
  },
  {
    path: "/labels/label/:id",
    name: "Label",
    component: () => import("@/views/labels/ListLabels.vue")
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
