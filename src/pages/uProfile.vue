<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import PhotoModal from "../components/PhotoModal.vue";

const route = useRoute();
const router = useRouter();
const pictures = ref([]);
const selectedPicture = ref(null);
const user = JSON.parse(localStorage.getItem("currentUser"));
const displayName = user?.name ?? "Your profile";
const displayLogin = user?.login ?? "guest";
const name = route.params.login;

// filteredPictures.value = pictures.value.filter((picture) => {
//     const title = picture.title || "";
//     return title.toLowerCase().includes(query);
//   });
// }

async function loadPictures() {
  if (!user?.login) {
    router.push("/login");
    return;
  }

  const resp = await axios.get(
    `https://nt4dev.pythonanywhere.com/api/v1/photos/by-user/${name}`,
  );

  pictures.value = resp.data;
}

function openModal(picture) {
  selectedPicture.value = picture;
}

function closeModal() {
  selectedPicture.value = null;
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
          <h1 class="page-title">{{ name }}</h1>
          <p class="profile-meta">
            @{{ displayLogin }} • {{ pictures.length }} shared photos
          </p>
        </div>
      </div>

      <div v-if="pictures.length" class="pictures-grid">
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

      <div class="modal" v-if="false && selectedPicture">
        <div class="modal-card">
          <img
            class="modal-image"
            :src="selectedPicture.image_url"
            :alt="selectedPicture.title || 'Photo preview'"
          />
          <div class="modal-info">
            <p class="modal-title">
              {{ selectedPicture.title || "Untitled photo" }}
            </p>
            <p class="modal-meta">
              {{
                selectedPicture.author?.name
                  ? `posted by ${selectedPicture.author.name}`
                  : "Saved photo"
              }}
            </p>
            <p class="modal-description">
              {{
                selectedPicture.description ||
                selectedPicture.caption ||
                "This photo was saved to your profile."
              }}
            </p>
          </div>
          <button class="modal-close" @click="closeModal">×</button>
        </div>
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
  min-height: 100vh;
  width: 100%;
}

.profile-container {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 40px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.35),
    inset 0 1px 1px rgba(255, 255, 255, 0.2),
    inset 0 -1px 1px rgba(255, 255, 255, 0.05);
}

.page-header {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 28px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(8, 66, 105, 0.16);
}

.header-info {
  margin-left: 40px;
  margin-top: 20px;
}

.profile-header {
  align-items: center;
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
  border-radius: 999px;
  padding: 14px 28px;
  background: #084269;
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(8, 66, 105, 0.24);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    filter 0.2s ease;
}

.logout-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 32px rgba(8, 66, 105, 0.3);
  filter: brightness(1.04);
}

.pictures-grid {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 380px));
  justify-content: center;
  gap: 20px;
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
  max-width: 380px;
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

.modal {
  position: absolute;
  inset: 0;
  background: rgba(8, 66, 105, 0.72);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 120;
}

.modal-card {
  position: relative;
  max-width: 1100px;
  width: 100%;
  min-height: 70vh;
  padding: 28px;
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 36px 120px rgba(8, 66, 105, 0.34);
}

.modal-image {
  width: 100%;
  object-fit: contain;
  border-radius: 24px;
  max-height: 80vh;
}

.modal-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
  color: #084269;
}

.modal-title {
  color: #084269;
  margin: 0;
  font-size: 2.8rem;
  line-height: 1.05;
}

.modal-meta {
  margin: 0;
  color: #084269;
  font-size: 1rem;
  font-weight: 700;
}

.modal-description {
  margin: 0;
  color: #084269;
  font-size: 1rem;
  line-height: 1.7;
}

.modal-close {
  position: absolute;
  top: -18px;
  right: -18px;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.98);
  color: #084269;
  font-size: 1.9rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.modal-close:hover {
  transform: scale(1.05);
}

@media (max-width: 900px) {
  .pictures-grid {
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  }
}

@media (max-width: 900px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .profile-actions {
    width: 100%;
    justify-content: flex-start;
  }
}

@media (max-width: 774px) {
  .profile-container {
    border-radius: 24px;
  }

  .picture-info {
    padding: 4px;
    height: 80px;
  }

  .picture-title {
    font-size: 16px;
  }

  .picture-meta {
    font-size: 12px;
  }

  .pictures-grid {
    padding: 16px;
    grid-template-columns: repeat(auto-fit, minmax(240px, 2fr));
  }
}

@media (max-width: 580px) {
  .pictures-grid {
    padding: 16px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .picture-img {
    max-height: 160px;
  }

  .picture-card {
    max-width: 244px;
  }

  .profile-header {
    flex-direction: column;
  }
}
</style>
