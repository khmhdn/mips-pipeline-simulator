<template>
  <div
    class="fullscreen-container"
    v-if="showFullscreen"
    @click="toggleFullscreen"
  >
    <div class="fullscreen-background"></div>
    <img :src="imageUrl" alt="Fullscreen Image" class="fullscreen-image" />
  </div>
  <div
    class="thumbnail-container"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="toggleFullscreen"
  >
    <img :src="imageUrl" alt="Thumbnail" class="thumbnail-image" />
    <div class="overlay" v-if="isHovered">Fullscreen View</div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    imageUrl: String,
  },
  data() {
    return {
      showFullscreen: false,
      isHovered: false,
    };
  },
  methods: {
    toggleFullscreen() {
      this.showFullscreen = !this.showFullscreen;
    },
  },
};
</script>

<style scoped>
/* Styles for FullScreenImage.vue */
.fullscreen-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fullscreen-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.fullscreen-image {
  max-width: 100%;
  max-height: 100%;
  z-index: 999;
  transition: all 0.2s;
}

.thumbnail-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.thumbnail-image {
  cursor: pointer;
  border-radius: 8px;
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 18px;
  display: none;
}

.thumbnail-container:hover .overlay {
  display: block;
}
</style>
