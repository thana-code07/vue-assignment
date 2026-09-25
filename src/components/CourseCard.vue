<template>
  <article class="course-card">
    <div class="course-info">
      <h3>ชื่อคอร์ส: {{ course.title }}</h3>
      <p>ราคา: {{ formattedPrice }} บาท</p>
    </div>
    <button
      type="button"
      :disabled="!canFavorite"
      :aria-label="`เพิ่ม ${course.title} ในรายการโปรด`"
      @click="addToFavorites"
    >
      เพิ่มในรายการโปรด
    </button>
  </article>
</template>

<script setup>
// TODO: import { useFavoriteStore } แล้วเขียนฟังก์ชันเพิ่มคอร์สลง store
// TODO: defineProps({ course: Object })
import { computed } from "vue";
import { useFavoriteStore } from "../stores/favorite";

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
});

const favoriteStore = useFavoriteStore();

const canFavorite = computed(() => favoriteStore.username.trim().length > 0);

const formattedPrice = computed(() =>
  Number(props.course.price).toLocaleString("th-TH"),
);

function addToFavorites() {
  if (!canFavorite.value) return;
  favoriteStore.addFavorite(props.course);
}
</script>

<style scoped>
.course-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;
  padding: 12px 16px;
  text-align: left;
}

.course-info {
  min-width: 0;
}

h3 {
  margin: 0;
  color: #213547;
  font-size: 16px;
  font-weight: 600;
  overflow-wrap: anywhere;
}

p {
  margin: 4px 0 0;
  color: #555;
  font-variant-numeric: tabular-nums;
}

button {
  flex-shrink: 0;
  min-height: 44px;
  background-color: #42b883;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  touch-action: manipulation;
}

button:hover:not(:disabled) {
  background-color: #2c9c6d;
}

button:focus-visible {
  outline: 3px solid #213547;
  outline-offset: 2px;
}

button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
