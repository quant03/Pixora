<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import PhotoModal from "../components/PhotoModal.vue";
const router = useRouter();
const pictures = ref([]);
const selectedPicture = ref(null);
const loadError = ref("");

const user = JSON.parse(localStorage.getItem("currentUser"));
const displayName = user?.name ?? "Your profile";
const displayLogin = user?.login ?? "guest";
async function loadPictures() {
  if (!user?.login) {
    router.push("/login");
    return;
  }

  try {
    const resp = await axios.get(
      `https://nt4dev.pythonanywhere.com/api/v1/photos/by-user/${user.login}`,
    );
    pictures.value = resp.data;
  } catch (error) {
    console.error("Failed to load profile photos:", error);
    loadError.value = "Unable to load your photos. Please try again later.";
  }
}

function openModal(picture) {
  selectedPicture.value = picture;
}

function closeModal() {
  selectedPicture.value = null;
}

function logout() {
  localStorage.removeItem("currentUser");
  router.push("/");
}

onMounted(() => {
  loadPictures();
});
</script>

<template>
  <div class="main">
    <div class="profile-container">
      <div class="page-header profile-header">
        <div class="header-info">
          <p class="page-subtitle">Your saved gallery</p>
          <h1 class="page-title">{{ displayName }}</h1>
          <p class="profile-meta">@{{ displayLogin }}</p>
          <p class="profile-meta">{{ pictures.length }} shared photos</p>
        </div>
        <div class="profile-actions">
          <button @click="logout" class="logout-button">Log out</button>
        </div>
      </div>

      <div v-if="loadError" class="empty-state">
        <p class="empty-title">Photos unavailable</p>
        <p class="empty-copy">{{ loadError }}</p>
      </div>

      <div v-else-if="pictures.length" class="pictures-grid">
        <div class="picture-card" v-for="picture in pictures" :key="picture.id">
          <button class="picture-button" @click="openModal(picture)">
            <img
              class="picture-img"
              :src="picture.image_url"
              :alt="picture.title || 'Photo'"
            />
          </button>
          <div class="picture-info">
            <p class="picture-title">{{ picture.title || "Photo" }}</p>
            <p class="picture-meta">
              posted by {{ picture.author?.name || "unknown" }}
            </p>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <p class="empty-title">No photos yet</p>
        <p class="empty-copy">
          Your uploaded pictures will appear here once you add them.
        </p>
      </div>

      <PhotoModal
        v-if="selectedPicture"
        :picture="selectedPicture"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<style scoped>
.main {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  min-height: 100vh;
  width: 100%;
}

.profile-container {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 40px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.35),
    inset 0 1px 1px rgba(255, 255, 255, 0.2),
    inset 0 -1px 1px rgba(255, 255, 255, 0.05);
}

.page-header {
  padding: 20px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 28px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(8, 66, 105, 0.16);
}

.profile-header {
  align-items: center;
}

.header-info {
  margin-left: 30px;
}

.page-title {
  margin: 0;
  font-size: clamp(2.5rem, 4vw, 3.75rem);
  line-height: 1.02;
  color: #084269;
}

.page-subtitle {
  margin: 0 0 12px;
  color: #084269;
  font-size: 0.95rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.profile-meta {
  margin: 10px 0 0;
  color: #084269;
  font-size: 1rem;
  font-weight: 600;
}

.profile-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
}

.logout-button {
  border: none;
  border-radius: 10px;
  padding: 14px 28px;
  background: #084269;
  color: #ffffff;
  font-size: 0.95rem;
  margin-right: 20px;
  font-weight: 800;
  letter-spacing: 0.02em;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(8, 66, 105, 0.24);
}

.pictures-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 24px;
  padding: 0 20px 20px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 360px;
  text-align: center;
  padding: 32px 24px;
}

.empty-title {
  margin: 0;
  color: #084269;
  font-size: 2rem;
  font-weight: 800;
}

.empty-copy {
  margin: 0;
  max-width: 480px;
  color: #084269;
  font-size: 1rem;
  line-height: 1.75;
}

.picture-card {
  width: 100%;
  border: 1px solid rgba(8, 66, 105, 0.28);
  overflow: hidden;
  box-shadow: 0 20px 70px rgba(8, 66, 105, 0.08);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.picture-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 26px 95px rgba(8, 66, 105, 0.16);
}

.picture-button {
  border: none;
  padding: 0;
  width: 100%;
  background: transparent;
  cursor: pointer;
}

.picture-img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  display: block;
  background: #ffffff;
}

.picture-info {
  padding: 18px 20px 22px;
}

.picture-title {
  margin: 0;
  color: #084269;
  font-size: 16px;
  line-height: 1.4;
  font-weight: 700;
  min-height: 48px;
}

.picture-meta {
  margin: 8px 0 0;
  color: #084269;
  font-size: 0.95rem;
}

@media (max-width: 774px) {
  .profile-container {
    border-radius: 24px;
  }

  .picture-info {
    padding: 4px;
    height: 80px;
  }

  .pictures-grid {
    padding: 16px;
    grid-template-columns: repeat(auto-fit, minmax(240px, 2fr));
  }

  .picture-title {
    font-size: 16px;
  }

  .picture-meta {
    font-size: 12px;
  }
}

@media (max-width: 580px) {
  .pictures-grid {
    padding: 16px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 2fr));
  }

  .picture-img {
    max-height: 160px;
  }
}

@media (max-width: 500px) {
  .pictures-grid {
    padding: 16px;
    grid-template-columns: repeat(auto-fit, minmax(160px, 2fr));
  }
}

@media (max-width: 400px) {
  .pictures-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 2fr));
  }
}
</style>
