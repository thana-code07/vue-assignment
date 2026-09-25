<template>
  <div class="page-container">
    <h2>📋 Summary</h2>
    <!-- TODO: ดึง username และ favorites.length จาก store -->
    <p v-if="!hasSelection">ยังไม่มีข้อมูลการเลือกคอร์ส</p>
    <template v-else>
      <p>ชื่อผู้ใช้: {{ displayName }}</p>
      <p>จำนวนคอร์สที่ถูกใจ: {{ favoriteStore.favorites.length }}</p>
    </template>
    <RouterLink class="page-link" to="/">กลับไปหน้า Course</RouterLink>
  </div>
</template>

<script setup>
// TODO: import { useFavoriteStore }
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useFavoriteStore } from "../stores/favorite";

const favoriteStore = useFavoriteStore();

const displayName = computed(() => favoriteStore.username.trim());

const hasSelection = computed(
  () => displayName.value.length > 0 && favoriteStore.favorites.length > 0,
);
</script>

<style scoped>
.page-container {
  text-align: center;
  padding: 40px;
}

.page-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  margin-top: 16px;
  color: #42b883;
  font-weight: 600;
}

.page-link:focus-visible {
  outline: 3px solid #42b883;
  outline-offset: 2px;
}
</style>
