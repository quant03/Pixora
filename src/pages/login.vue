<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const email = ref("");
const password = ref("");

async function Login() {
  try {
    const data = await axios.post(
      "https://nt4dev.pythonanywhere.com/api/v1/auth/login",
      {
        email: email.value,
        password: password.value,
      },
    );

    localStorage.setItem("accessToken", data.data.access_token);
    localStorage.setItem("currentUser", JSON.stringify(data.data.user));
    router.push("/profile");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
</script>

<template>
  <div class="main">
    <form @submit.prevent="Login" class="login glass-container">
      <p style="color: #084269" class="header">Login</p>

      <p style="color: #084269">you have to log in first</p>

      <input
        class="inp"
        v-model="email"
        type="text"
        placeholder="Email"
        required
      />
      <input
        class="inp"
        v-model="password"
        style="margin-bottom: 40px"
        type="password"
        placeholder="Password"
        required
      />
      <button @click="Login" type="submit" class="su-button1">Login</button>
    </form>
  </div>
</template>

<style scoped>
.login {
  position: relative;
  max-width: 500px;
  width: 100%;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.glass-container {
  height: 500px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.35),
    inset 0 1px 1px rgba(255, 255, 255, 0.2),
    inset 0 -1px 1px rgba(255, 255, 255, 0.05);
}

.su-button1 {
  position: absolute;
  bottom: 0;
  background: #084269;
  color: white;
  padding: 10px 20px;
  border: none;
  width: 100%;
  border-radius: 0 0 30px 30px;
  height: 80px;
  font-size: 20px;
  cursor: pointer;
}

.inp {
  border: none;
  background: transparent;
  text-align: center;
  color: #084269;
  padding: 10px;
  border-radius: 10px;
  max-width: 200px;
  font-size: 20px;
}

.inp:-webkit-autofill,
.inp:-webkit-autofill:hover,
.inp:-webkit-autofill:focus {
  -webkit-text-fill-color: #084269;
  -webkit-box-shadow: 0 0 0 1000px rgba(255, 255, 255, 0.94) inset;
}

.singup {
  border: none;
  max-width: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 60px;
  width: 100%;
  color: white;
  font-size: 22px;
  font-weight: bold;
  height: 100%;
  background-color: #084269;
  background-size: 130px, 200px;
  border-radius: 10px;
  padding: 24px 0px;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
