<template>
  <div class="page-container">
    <header>
      <h2>📚 Course List</h2>
      <!-- TODO: แสดงจำนวนคอร์สที่ถูกใจจาก store -->
      <p aria-live="polite">
        ❤️ ถูกใจแล้ว {{ favoriteStore.favorites.length }} คอร์ส
      </p>
      <RouterLink class="page-link" to="/summary">ไปหน้า Summary</RouterLink>
    </header>

    <div class="form-section">
      <label for="username">ชื่อผู้ใช้:</label>
      <!-- TODO: v-model username -->
      <input
        id="username"
        v-model="username"
        name="username"
        type="text"
        autocomplete="name"
        placeholder="กรอกชื่อของคุณ…"
      />
      <p v-if="!hasUsername" class="hint">กรอกชื่อก่อน จึงจะเพิ่มคอร์สในรายการโปรดได้</p>
    </div>

    <p v-if="loading">กำลังโหลด…</p>
    <p v-else-if="error" class="error" role="alert">
      {{ error }}
      <button type="button" @click="loadCourses">ลองอีกครั้ง</button>
    </p>
    <div v-else class="course-list">
      <!-- TODO: Render CourseCard -->
      <CourseCard
        v-for="course in courses"
        :key="course.id"
        :course="course"
      />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import CourseCard from "../components/CourseCard.vue";
// TODO: import axios
// TODO: import { useFavoriteStore } จาก "../stores/favorite"
import { useFavoriteStore } from "../stores/favorite";

const PRODUCTS_URL = "https://fakestoreapi.com/products";

const courses = ref([]);
// TODO: ดึงข้อมูลจาก API ด้วย axios.get() แล้วเก็บใน courses
// TODO: ใช้ store เพื่อเข้าถึง username และ favorites
const loading = ref(false);
const error = ref("");
const favoriteStore = useFavoriteStore();

const username = computed({
  get: () => favoriteStore.username,
  set: (name) => favoriteStore.setUsername(name),
});

const hasUsername = computed(() => favoriteStore.username.trim().length > 0);

async function loadCourses() {
  loading.value = true;
  error.value = "";

  try {
    const { data } = await axios.get(PRODUCTS_URL);
    if (!Array.isArray(data)) {
      throw new Error("Unexpected response");
    }

    courses.value = data;
  } catch {
    error.value = "โหลดรายการคอร์สไม่สำเร็จ";
  } finally {
    loading.value = false;
  }
}

onMounted(loadCourses);
</script>

<style scoped>
.page-container {
  max-width: 600px;
  margin: auto;
  text-align: center;
}

.form-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
}

label {
  font-weight: 600;
}

input {
  width: min(100%, 320px);
  min-height: 44px;
  padding: 8px 12px;
  font-size: 16px;
  color: #213547;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
}

input:focus-visible {
  outline: 3px solid #42b883;
  outline-offset: 2px;
}

.hint,
.error {
  margin: 0;
  color: #a33;
}

.error button {
  display: block;
  margin: 12px auto 0;
  min-height: 44px;
}

.course-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
}

.page-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: #42b883;
  font-weight: 600;
}

.page-link:focus-visible {
  outline: 3px solid #42b883;
  outline-offset: 2px;
}
</style>
