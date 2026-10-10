<script setup>
import { computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  picture: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const title = computed(() => props.picture.title || "Untitled photo");
const authorName = computed(
  () => props.picture.author?.name || "Unknown artist",
);
const authorLogin = computed(() => props.picture.author?.login);
const description = computed(
  () =>
    props.picture.description ||
    props.picture.caption ||
    "A photo from the gallery.",
);

function close() {
  emit("close");
}

function handleKeydown(event) {
  if (event.key === "Escape") close();
}

onMounted(() => {
  document.body.classList.add("modal-open");
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.body.classList.remove("modal-open");
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <Teleport to="body">
    <div
      class="photo-modal"
      role="dialog"
      aria-modal="true"
      :aria-label="`Photo preview: ${title}`"
      @click.self="close"
    >
      <article class="photo-modal-card">
        <button
          class="photo-modal-close"
          type="button"
          aria-label="Close photo preview"
          @click="close"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6 18 18M18 6 6 18" />
          </svg>
          <span>Close</span>
        </button>

        <div class="photo-modal-image-wrap">
          <img
            class="photo-modal-image"
            :src="picture.image_url"
            :alt="title"
          />
        </div>

        <div class="photo-modal-content">
          <p class="photo-modal-eyebrow">Photo preview</p>
          <h2 class="photo-modal-title">{{ title }}</h2>
          <router-link
            v-if="authorLogin"
            :to="`/uProfile/${authorLogin}`"
            class="photo-modal-author"
          >
            <span>By</span> {{ authorName }}
          </router-link>
          <p v-else class="photo-modal-author">
            <span>By</span> {{ authorName }}
          </p>
          <p class="photo-modal-description">{{ description }}</p>
        </div>
      </article>
    </div>
  </Teleport>
</template>

<style scoped>
.photo-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: clamp(16px, 4vw, 48px);
  background: rgba(3, 29, 47, 0.78);
  backdrop-filter: blur(12px);
  animation: modal-fade-in 180ms ease-out;
}

.photo-modal-card {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(250px, 0.75fr);
  width: min(1080px, 100%);
  max-height: min(820px, calc(100dvh - 32px));
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.36);
  border-radius: 28px;
  background: #fff;
  box-shadow: 0 32px 100px rgba(0, 17, 30, 0.5);
  animation: modal-card-in 220ms ease-out;
}

.photo-modal-image-wrap {
  display: grid;
  min-height: 320px;
  place-items: center;
  overflow: hidden;
  background: #e8f0f4;
}

.photo-modal-image {
  display: block;
  width: 100%;
  height: 100%;
  max-height: min(820px, calc(100dvh - 32px));
  object-fit: contain;
}

.photo-modal-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: clamp(32px, 5vw, 64px) clamp(26px, 4vw, 48px);
  color: #084269;
  text-align: left;
}

.photo-modal-eyebrow {
  margin: 0 0 14px;
  color: #4b7088;
  font-family: system-ui, sans-serif;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.photo-modal-title {
  margin: 0;
  color: #084269;
  font-size: clamp(1.9rem, 3.4vw, 3.25rem);
  line-height: 1.06;
  overflow-wrap: anywhere;
}

.photo-modal-author {
  margin: 20px 0 0;
  color: #084269;
  font-family: system-ui, sans-serif;
  font-size: 0.94rem;
  font-weight: 800;
}

a.photo-modal-author {
  text-decoration: underline;
  text-decoration-color: rgba(8, 66, 105, 0.35);
  text-underline-offset: 4px;
}

.photo-modal-author span {
  color: #66869a;
  font-weight: 600;
}

.photo-modal-description {
  margin: 22px 0 0;
  color: #315d78;
  font-family: system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.7;
  overflow-wrap: anywhere;
}

.photo-modal-close {
  position: absolute;
  z-index: 1;
  top: 16px;
  right: 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 13px;
  border: 1px solid rgba(255, 255, 255, 0.52);
  border-radius: 999px;
  background: rgba(8, 66, 105, 0.88);
  color: #fff;
  font-family: system-ui, sans-serif;
  font-size: 0.78rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 27, 44, 0.24);
  transition:
    transform 160ms ease,
    background 160ms ease,
    box-shadow 160ms ease;
}

.photo-modal-close:hover {
  transform: translateY(-2px);
  background: #084269;
  box-shadow: 0 12px 28px rgba(0, 27, 44, 0.32);
}

.photo-modal-close:focus-visible {
  outline: 3px solid #fff;
  outline-offset: 3px;
}

.photo-modal-close svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-width: 2.5;
}

@media (max-width: 760px) {
  .photo-modal {
    align-items: end;
    padding: 12px;
  }

  .photo-modal-card {
    grid-template-columns: 1fr;
    max-height: calc(100dvh - 24px);
    border-radius: 22px;
  }

  .photo-modal-image-wrap {
    min-height: 0;
    height: min(48dvh, 380px);
  }

  .photo-modal-image {
    max-height: min(48dvh, 380px);
  }

  .photo-modal-content {
    justify-content: flex-start;
    max-height: 42dvh;
    overflow-y: auto;
    padding: 26px 24px 30px;
  }

  .photo-modal-title {
    font-size: 1.9rem;
  }

  .photo-modal-description {
    margin-top: 16px;
    font-size: 0.94rem;
    line-height: 1.55;
  }

  .photo-modal-close {
    top: 12px;
    right: 12px;
    width: 44px;
    padding: 0;
    justify-content: center;
  }

  .photo-modal-close span {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
}

@keyframes modal-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modal-card-in {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
