<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const showPopUp = ref(false);

function getStarted() {
  const user = localStorage.getItem("currentUser");

  router.push(user ? "/pictures" : "/login");
}
</script>

<template>
  <div class="mainHome">
    <div class="topRow">
      <div class="topContent">
        <div class="topText">
          <p class="header topHeading">Inspire.</p>
          <p class="header topHeading">Create.</p>
          <p class="header topHeading">Share.</p>
          <p class="text topDescription">
            save your favorites, and share what inspires you. Pixora is your
            visual discovery platform. Explore endless ideas and share your own.
          </p>
        </div>
        <div class="topButtons">
          <button @click="getStarted" class="topButton">Get Started</button>
          <button @click="showPopUp = true" class="topButton2">
            How it Works
          </button>

          <div v-if="showPopUp" class="popup">
            <div class="popup-content">
              <h2>How it Works</h2>
              <p style="color: #084269">
                1. Sign up or log in to your account.<br />
                2. Search for specific ideas or inspirations.<br />
                3. Browse through a wide range of visual content.<br />
              </p>
              <button @click="showPopUp = false" class="close-button">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="topImage">
        <img class="brand-logo" src="../assets/logo1.png" alt="" />
        <p class="brand-name">P I X O R A</p>
        <p class="slogan2">
          C u r a t e. <br />
          I n s p i r e. <br />
          D i s c o v e r. <br />
        </p>
        <p class="slogan" style="font-size: 22px; margin-top: 10px">
          Discover. Curate. Inspire.
        </p>
      </div>
      <p class="brand-name2">P I X O R A</p>
    </div>

    <section class="botStrip" aria-label="Community highlights">
      <div class="botItem">
        <div class="botIcon" aria-hidden="true">
          <img src="../assets/piktogram1.svg" alt="" />
        </div>
        <div>
          <p class="botValue">Share your perspective</p>
        </div>
      </div>

      <div class="botDivider"></div>

      <div class="botItem">
        <div class="botIcon" aria-hidden="true">
          <img src="../assets/piktogram2.svg" alt="" />
        </div>
        <div>
          <p class="botValue">Find visual inspiration</p>
        </div>
      </div>

      <div class="botDivider"></div>

      <div class="botItem">
        <div class="botIcon" aria-hidden="true">
          <img src="../assets/piktogram3.svg" alt="" />
        </div>
        <div>
          <p class="botValue">Publish a photo</p>
        </div>
      </div>

      <div class="botDivider"></div>

      <div class="botItem">
        <div class="botIcon" aria-hidden="true">
          <img src="../assets/piktogram4.svg" alt="" />
        </div>
        <div>
          <p class="botValue">Explore from anywhere</p>
        </div>
      </div>

      <div class="botDivider"></div>

      <div class="botCta">
        <div class="botCtaCopyWrap">
          <p class="botCtaTitle">Join the creative community</p>
          <p class="botCtaCopy">Sign up today and start exploring!</p>
        </div>
        <router-link class="botButton" to="/register">
          Sign Up <span aria-hidden="true">→</span>
        </router-link>
      </div>
    </section>

    <div class="topButtons2">
      <button @click="getStarted" class="topButton">Get Started</button>
      <router-link class="topButton2" to="/register">Sign Up</router-link>
    </div>
  </div>
</template>

<style scoped>
.mainHome {
  margin-top: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: 95dvh;
  flex-direction: column;
}

.topRow {
  justify-content: space-between;
  align-items: center;
  display: flex;
  padding: 0px 20px;
}

.topHeading {
  margin: 0;
  font-size: 70px;
  font-weight: bold;
  background: linear-gradient(45deg, #084269, #084269);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

.topDescription {
  margin-top: 20px;
  background: linear-gradient(45deg, #084269, #084269);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 500;
  max-width: 500px;
  line-height: 1.5;
}

.topButtons {
  display: flex;
  gap: 20px;
}

.topButtons2 {
  display: none;
  gap: 50px;
}

.text {
  font-size: 26px;
}

.topButton {
  margin-top: 30px;
  padding: 20px 40px;
  font-size: 18px;
  background-color: #084269;
  font-weight: bold;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.topButton2 {
  display: block;
  margin-top: 30px;
  padding: 20px 40px;
  font-size: 18px;
  background-color: transparent;
  font-weight: bold;
  color: #084269;
  text-align: center;
  border: 2px solid #084269;
  border-radius: 10px;
  cursor: pointer;
}

.popup {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
}

.popup-content {
  font-weight: bold;
  background-color: white;
  padding: 20px 0px 0px;
  display: flex;
  flex-direction: column;
  color: #084269;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  justify-content: flex-end;
  line-height: 1.5;
  height: 400px;
  width: 420px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.35),
    inset 0 1px 1px rgba(255, 255, 255, 0.2),
    inset 0 -1px 1px rgba(255, 255, 255, 0.05);
}

.popup-content h2 {
  color: #084269;
}

.close-button {
  bottom: 0;
  background: #084269;
  color: white;
  padding: 10px 20px;
  border: none;
  margin-top: 100px;
  width: 100%;
  border-radius: 0 0 10px 10px;
  height: 80px;
  font-size: 20px;
  cursor: pointer;
}

.topImage {
  text-align: center;
  margin-right: 60px;
  margin-top: 0px;
}

.brand-name {
  font-size: 60px;
  white-space: nowrap;
  margin: 0;
  font-weight: bold;
}

.slogan2 {
  text-align: left;
  font-size: 22px;
  display: none;
  margin-top: 10px;
  font-family: "Stint Ultra Expanded", serif;
  font-weight: 400;
  font-style: normal;
}

.brand-name2 {
  display: none;
  font-size: 60px;
  margin: 0;
  font-weight: bold;
}

.botStrip {
  margin-top: 60px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  padding: 20px 18px;
  min-height: 92px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(18px);
  box-shadow: 0 14px 34px rgba(8, 66, 105, 0.14);
  color: #084269;
}

.botItem {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1 1 184px;
  min-width: 160px;
}

.botIcon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #084269;
  flex: 0 0 auto;
}

.botIcon img,
.botIcon svg {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.botValue {
  margin: 0;
  color: #084269;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.25;
}

.botLabel {
  margin: 4px 0 0;
  color: rgba(8, 66, 105, 0.8);
  font-size: 11px;
  font-weight: 600;
  line-height: 1.4;
}

.botDivider {
  width: 1px;
  height: 60px;
  background: rgba(8, 66, 105, 0.22);
}

.botCta {
  margin-left: auto;
  display: flex;
  flex: 1 1 320px;
  min-width: 260px;
  align-items: center;
  justify-content: space-between;
}

.botCtaCopyWrap {
  min-width: 0;
  flex: 1 1 auto;
}

.botCtaTitle {
  margin: 0;
  color: #084269;
  font-size: 16px;
  font-weight: 800;
}

.botCtaCopy {
  margin: 6px 0 0;
  color: #084269;
  font-size: 16px;
  font-weight: 600;
}

.botButton {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 100px;
  width: 100px;
  max-width: none;
  padding: 13px 20px;
  border-radius: 14px;
  background: #ffffff;
  color: #084269;
  font-size: 14px;
  box-shadow: 0 10px 24px rgba(8, 66, 105, 0.14);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.botButton:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 34px rgba(8, 66, 105, 0.2);
}

@media (max-width: 1250px) {
  .botButton {
    display: none;
  }

  .botCtaCopyWrap {
    display: none;
  }

  .topDescription {
    display: none;
  }
}
@media (max-width: 950px) {
  .botStrip {
    padding: 20px 10px;
    gap: 10px;
  }

  .brand-name {
    display: none;
  }

  .slogan {
    display: none;
  }

  .topImage {
    margin-right: 0;
  }
}

@media (max-width: 600px) {
  .topText {
    display: none;
  }

  .topButtons {
    display: none;
  }

  .topButtons2 {
    display: flex;
    justify-content: center;
    margin-top: 0;
  }

  .topButtons2 .topButton2 {
    text-decoration: none;
  }

  .topButton2 {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    max-width: 171px;
  }

  .topButton {
    width: 100%;
  }

  .topContent {
    display: contents;
  }

  .topRow {
    margin-top: 30px;
    padding: 0;
    flex-direction: column;
  }

  .topImage {
    margin-right: 0;
    margin-top: 40px;
    gap: 30px;
    display: flex;
  }

  .slogan {
    display: none;
  }

  .slogan2 {
    display: block;
  }

  .brand-logo {
    width: 100px;
    height: 100px;
  }

  .brand-name {
    display: none;
  }

  .brand-name2 {
    white-space: nowrap;
    font-size: clamp(30px, 12vw, 50px);
    display: block;
  }

  .botStrip {
    padding: 20px 10px;
    gap: 10px;
  }

  .Header {
    font-size: 50px;
  }

  .topHeading {
    white-space: wrap;
    font-size: 50px;
  }

  .topDescription {
    font-size: 20px;
  }

  .home {
    overflow: auto;
  }
}
</style>
