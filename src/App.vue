<script setup>
import { watch } from "vue";
import gsap from "gsap";
import Navbar from "./components/navbar.vue";
import axios from "axios";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRoute } from "vue-router";

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();

const updateBodyBackground = (path) => {
  document.body.classList.toggle("home", path === "/");
};

watch(
  () => route.path,
  (path) => updateBodyBackground(path),
  { immediate: true },
);
</script>

<template>
  <Navbar />
  <router-view />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Stint+Ultra+Expanded&display=swap"
    rel="stylesheet"
  />
</template>

<style>
.main {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  margin-top: 60px;
  overflow: hidden;
}

.header {
  font-size: 46px;
  font-weight: bold;
}

.text {
  font-size: 26px;
}

.btn {
  padding: 15px 30px;
  font-size: 18px;
  background-color: #084269;
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
}

input {
  background: transparent;
}
</style>
