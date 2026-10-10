<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const email = ref("");
const login = ref("");
const name = ref("");
const password = ref("");
const errorMessage = ref("");

async function Register() {
  errorMessage.value = "";

  try {
    const response = await axios.post(
      "https://nt4dev.pythonanywhere.com/api/v1/auth/register",
      {
        email: email.value,
        login: login.value,
        name: name.value,
        password: password.value,
      },
    );
    router.push("/login");
    console.log(response);
  } catch (err) {
    if (err?.response?.status === 409) {
      errorMessage.value =
        "That account already exists. Try a different email or login.";
      return;
    }

    errorMessage.value = "Registration failed. Please try again.";
    console.error(err);
  }
}
</script>

<template>
  <div class="main">
    <div class="register glass-container">
      <p style="color: #084269" class="header">Sign up</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <form @submit.prevent="Register">
        <input
          class="inp"
          v-model="email"
          type="text"
          placeholder="Email"
          required
        />
        <input
          class="inp inp-password"
          v-model="password"
          style="margin-bottom: 40px"
          type="password"
          placeholder="Password"
          required
        />
        <input
          class="inp"
          v-model="name"
          type="text"
          placeholder="Name"
          required
        />
        <input
          class="inp"
          v-model="login"
          type="text"
          npm
          placeholder="Login"
          required
        />
      </form>
      <button @click="Register" type="submit" class="su-button1">
        Sign Up
      </button>
    </div>
  </div>
</template>

<style scoped>
.register {
  position: relative;
  max-width: 500px;
  width: 100%;
  max-height: 600px;
  height: 100%;
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

.error-message {
  margin: 0;
  color: #23648f;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
}

.inp {
  margin: 10px;
  border: none;
  background: transparent;
  text-align: center;
  color: #084269cb;
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
  max-height: 60px;
  width: 100%;
  color: white;
  font-size: 22px;
  font-weight: bold;
  height: 100%;
  background-color: #084269;
  background-size: 130px, 200px;
  border-radius: 10px;
  background-repeat: no-repeat;
  background-position: center;
}

@media (max-width: 600px) {
  .su-button1 {
    height: 60px;
    font-size: 16px;
  }

  .register {
    height: 600px;
  }

  .inp {
    max-width: 100%;
    height: 16px;
    font-size: 16px;
  }
}
</style>
