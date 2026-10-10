<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import PhotoModal from "../components/PhotoModal.vue";

const pictures = ref([]);
const filteredPictures = ref([]);
const sPost = ref([]);
const selectedPicture = ref(null);
const search = ref("");

async function loadPictures() {
  const response = await axios.get(
    "https://nt4dev.pythonanywhere.com/api/v1/photos/",
  );

  pictures.value = response.data;
  filteredPictures.value = pictures.value;
}

function openModal(picture) {
  selectedPicture.value = picture;
}

function closeModal() {
  selectedPicture.value = null;
}

function searchPictures() {
  const query = search.value.trim().toLowerCase();

  if (!query) {
    filteredPictures.value = pictures.value;
    return;
  }

  filteredPictures.value = pictures.value.filter((picture) => {
    const title = picture.title || "";
    return title.toLowerCase().includes(query);
  });
}

onMounted(async () => {
  await loadPictures();
});
</script>

<template>
  <div class="main">
    <div class="searchContainer">
      <div class="page-header">
        <div>
          <p class="page-subtitle">Browse the latest curated photos</p>
          <h1 class="page-title">Picture Gallery</h1>
        </div>
        <div class="page-stats">{{ filteredPictures.length }} photos</div>
      </div>

      <div class="searchRow">
        <input
          v-model="search"
          @input="searchPictures"
          class="searchInput"
          type="text"
          placeholder="Search pictures..."
        />
      </div>

      <div class="pictures-grid" v-if="filteredPictures.length">
        <div
          class="picture-card"
          v-for="picture in filteredPictures"
          :key="picture.id"
        >
          <button class="picture-button" @click="openModal(picture)">
            <img
              class="picture-img"
              :src="picture.image_url"
              :alt="picture.title || 'Picture'"
            />
          </button>
          <div class="picture-info">
            <p class="picture-title">{{ picture.title }}</p>
            <p class="picture-meta">
              posted by {{ picture.author?.name || "unknown" }}
            </p>
          </div>
        </div>
      </div>
      <div class="no-results" v-else>No pictures found for “{{ search }}”.</div>
    </div>

    <PhotoModal
      v-if="selectedPicture"
      :picture="selectedPicture"
      @close="closeModal"
    />
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
  text-align: left;
}

.searchContainer {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 40px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.35),
    inset 0 1px 1px rgba(255, 255, 255, 0.2),
    inset 0 -1px 1px rgba(255, 255, 255, 0.05);
}
.searchInput {
  padding: 10px;
  margin: 0px 20px;
  text-align: left;
  margin-top: 40px;
  border-radius: 20px;

  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.35),
    inset 0 1px 1px rgba(255, 255, 255, 0.2),
    inset 0 -1px 1px rgba(255, 255, 255, 0.05);

  border: 1px solid #084269;
  background: #ffffff;
  color: #084269;
  padding: 10px;
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
  font-size: 20px;
}

input:focus {
  outline: none;
  caret-color: #084269;
}

input::placeholder {
  color: #084269;
}

.inp {
  border: none;
  background: transparent;
  text-align: center;
  color: #ffffff;
  padding: 10px;
  border-radius: 10px;
  max-width: 200px;
  font-size: 20px;
}

.pictures-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  justify-content: center;
  gap: 24px;
  padding: 0 20px 20px;
}

.no-results {
  width: 100%;
  padding: 40px 20px;
  text-align: center;
  color: #084269;
  font-size: 1.1rem;
  background: #ffffff;
  border: 1px solid #084269;
  border-radius: 20px;
  margin: 0 20px;
}

.picture-card {
  border: 1px solid rgba(8, 66, 105, 0.28);
  overflow: hidden;
  box-shadow: 0 20px 70px rgba(8, 66, 105, 0.08);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.picture-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.16);
}

.picture-info {
  padding: 14px 16px 18px;
}

.picture-title {
  margin: 0;
  color: #084269;
  font-size: 16px;
  line-height: 1.4;
  font-weight: 700;
  min-height: 48px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 24px 32px 8px;
}

.page-title {
  margin: 0;
  font-size: 3rem;
  letter-spacing: -0.05em;
  color: #084269;
}

.page-subtitle {
  margin: 0 0 12px;
  color: #084269;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
}

.page-stats {
  color: #084269;
  font-weight: 700;
  font-size: 1rem;
}

.searchRow {
  display: flex;
  justify-content: center;
  padding: 0 32px 28px;
}

.picture-button {
  border: none;
  background: transparent;
  padding: 0;
  width: 100%;
  cursor: pointer;
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

.picture-meta {
  margin: 8px 0 0;
  color: #084269;
  font-size: 0.95rem;
}

@media (max-width: 774px) {
  .body {
    padding: 10px;
  }

  .searchContainer {
    border-radius: 24px;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 20px 8px;
  }

  .page-title {
    font-size: 2.5rem;
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
    grid-template-columns: repeat(auto-fit, minmax(200px, 2fr));
  }
  .picture-img {
    max-height: 160px;
  }
}

@media (max-width: 500px) {
  .pictures-grid {
    padding: 16px;
    gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(160px, 2fr));
  }
}

@media (max-width: 400px) {
  .pictures-grid {
    padding: 16px;
    grid-template-columns: repeat(auto-fit, minmax(120px, 2fr));
  }
}
</style>
