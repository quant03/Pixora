import Lenis from "lenis";
import Home from "./pages/home.vue";
import Login from "./pages/login.vue";
import Profile from "./pages/profile.vue";
import Refister from "./pages/register.vue";
import Pictures from "./pages/pictures.vue";
import Create from "./pages/create.vue";
import UProfile from "./pages/uProfile.vue";

import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/uProfile/:login", component: UProfile },
  { path: "/create", component: Create },
  { path: "/pictures", component: Pictures },
  { path: "/", component: Home },
  { path: "/register", component: Refister },
  { path: "/login", component: Login },
  { path: "/profile", component: Profile },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
