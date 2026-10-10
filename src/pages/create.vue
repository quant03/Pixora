<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const API_URL = "https://nt4dev.pythonanywhere.com/api/v1";
const title = ref("");
const selectedFile = ref(null);
const previewUrl = ref("");
const loading = ref(false);
const error = ref("");
function handleFileChange(event) {
  const file = event.target.files[0];

  if (!file) {
    selectedFile.value = null;
    previewUrl.value = "";
    return;
  }
  if (!file.type.startsWith("image/")) {
    error.value = "Можно выбрать только изображение";
    selectedFile.value = null;
    previewUrl.value = "";
    return;
  }
  selectedFile.value = file;
  previewUrl.value = URL.createObjectURL(file);
}
async function createPost() {
  error.value = "";
  const token = localStorage.getItem("accessToken");
  if (!token) {
    error.value = "Сначала войди в аккаунт";
    return;
  }
  if (!selectedFile.value) {
    error.value = "Выбери фотографию";
    return;
  }
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("image", selectedFile.value);
  loading.value = true;
  try {
    const response = await axios.post(`${API_URL}/photos/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    router.push("/pictures");
  } catch (err) {
    error.value = err.response?.data?.detail || "Не удалось создать пост";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="mainCreate">
    <div style="margin: 0" class="create glass-container">
      <p style="margin-top: 0; color: white" class="header">Create Post</p>
      <form @submit.prevent="createPost" class="create-form">
        <input
          class="inp"
          v-model="title"
          type="text"
          placeholder="Title"
          required
        />

        <input
          class="inp"
          type="file"
          accept="image/*"
          @change="handleFileChange"
          required
        />

        <p v-if="error" class="error">{{ error }}</p>

        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? "Posting..." : "Create" }}
        </button>
      </form>
    </div>
    <div v-if="previewUrl" class="preview">
      <img class="previewImg" :src="previewUrl" alt="Image preview" />
    </div>
  </div>
</template>

<style scoped>
body {
  height: auto;
}

.mainCreate {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  text-align: center;
  justify-content: left;
  align-items: flex-start;
  padding-top: 200px;
  padding-left: 24px;
  padding-right: 24px;
  box-sizing: border-box;
  background: #084269;
  overflow-y: auto;
}

.create {
  max-width: 1020px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header {
  font-size: 80px;
}

.create-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 34px;
}

.inp {
  text-align: left;
  border-radius: 20px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.35),
    inset 0 1px 1px rgba(255, 255, 255, 0.2),
    inset 0 -1px 1px rgba(255, 255, 255, 0.05);
  border: 1px solid #ffffff;
  background: #ffffff;
  color: #084269;
  border-radius: 10px;
  padding: 17px;
  width: 100%;
  max-width: 340px;
  font-size: 20px;
}

.inp::placeholder {
  color: #084269;
}

.error {
  color: #ffffff;
  font-weight: 600;
  text-align: center;
}

.submit-btn {
  border: none;
  width: 374px;
  padding: 24px 31px;
  border-radius: 24px;
  border: 2px solid #ffffff;
  color: #ffffff;
  background: transparent;
  font-size: 31px;
  font-weight: 700;
  cursor: pointer;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 500px;
  max-width: 700px;
  border-radius: 24px;
}

.preview img {
  width: 100%;
  display: block;
}

@media (max-width: 1200px) {
  .mainCreate {
    align-items: center;
    flex-direction: column;
  }

  .preview {
    width: auto;
    height: auto;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .previewImg {
    max-width: 376px;
  }
}

@media (max-width: 620px) {
  .header {
    font-size: 40px;
  }

  .inp {
    width: 266px;
  }

  .submit-btn {
    width: 300px;
    padding: 22px 25px;
    font-size: 24px;
    border-radius: 10px;
  }

  .preview {
    width: auto;
    height: auto;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .previewImg {
    max-width: 300px;
  }
}
</style>
