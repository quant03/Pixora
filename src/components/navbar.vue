<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div
    style="
      display: flex;
      margin-top: 10px;
      justify-content: center;
      z-index: 100;
      position: relative;
    "
  >
    <router-link to="/" style="max-width: 280px" class="navbar pixora">
      <img src="../assets/logo1.png" alt="" />
      <p class="pxora">P I X O R A</p>
    </router-link>
    <div class="navbar">
      <router-link to="/">Home</router-link>
      <router-link to="/pictures">Pictures</router-link>
      <router-link to="/profile">Profile</router-link>
      <router-link to="/create">Create</router-link>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  align-items: center;
  display: flex;
  gap: 0px;
  padding: 0px 0px;
  justify-content: space-evenly;
  max-width: 1200px;
  width: 100%;
  background: transparent;
}

.pxora {
  font-size: 22px;
  margin: 0;
  font-weight: bold;
}

img {
  width: 70px;
  height: 70px;
}

a {
  font-size: 17px;
  font-weight: 100;
  transition:
    0.3s ease,
    transform 0.3s ease;
}

a:hover {
  transform: scale(1.1);
  color: #ffffff;
  text-shadow:
    0 0 12px rgba(255, 255, 255, 0.9),
    0 0 20px rgba(255, 255, 255, 0.5);
}

@media (max-width: 920px) {
  a {
    font-size: 14px;
  }

  .pxora {
    font-size: 18px;
  }
}

@media (max-width: 850px) {
  .n2 {
    display: none;
  }
}

@media (max-width: 620px) {
  .pixora {
    display: none;
  }
}
</style>
