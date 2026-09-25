// TODO1: สร้าง store ชื่อ useFavoriteStore
// state:
//   username (string)
//   favorites (array)
// actions:
//   setUsername(name) → เก็บชื่อผู้ใช้
//   addFavorite(course) → เพิ่มคอร์สใน favorites
import { ref } from "vue";
import { defineStore } from "pinia";

export interface Course {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image?: string;
}

export const useFavoriteStore = defineStore("favorite", () => {
  const username = ref("");
  const favorites = ref<Course[]>([]);

  const setUsername = (name: string) => {
    username.value = name;
  };

  const addFavorite = (course: Course) => {
    favorites.value.push(course);
  };

  return { username, favorites, setUsername, addFavorite };
});
