import { create } from "zustand";
import axios from "axios";

// Store for ads
export const useAdsStore = create((set) => ({
  notifier: false,
  categories: [],
  ads: [],
  partialAds: [],
  status: "idle",
  error: null,
  fetchAds: async () => {
    set({ status: "loading" });
    try {
      const response = await axios.get("/api/v1/ads");
      // const response = await axios.get("https://anuncios-app-back.onrender.com/api/v1/ads");
      set({ ads: response.data, status: "succeeded" });
    } catch (error) {
      set({ status: "failed", error: error.message });
    }
  },
  createAd: async (body) => {
    try {
      const response = await axios.post("/api/v1/ads", body);
      // const response = await axios.post("https://anuncios-app-back.onrender.com/api/v1/ads", body);
      // set({ ads: [...get().ads, response.data] });
      set((state) => ({ ads: [...state.ads, response.data] }));
    } catch (error) {
      console.error("Error creating ad:", error);
    }
  },
  updateAd: async (id, body) => {
    try {
      const response = await axios.put(`/api/v1/ads/${id}`, body);
      // const response = await axios.put(`https://anuncios-app-back.onrender.com/api/v1/ads/${id}`, body);
      set((state) => ({
        ads: state.ads.map((ad) => (ad.id === id ? response.data.ad : ad)),
      }));
    } catch (error) {
      console.error("Error updating ad:", error);
    }
  },
  deleteAd: async (id) => {
    try {
      await axios.delete(`/api/v1/ads/${id}`);
      // await axios.delete(`https://anuncios-app-back.onrender.com/api/v1/ads/${id}`);
      set((state) => ({ ads: state.ads.filter((ad) => ad.id !== id) }));
    } catch (error) {
      console.error("Error deleting ad:", error);
    }
  },
  fetchCategories: async () => {
    try {
      const response = await axios.get("/api/v1/categories");
      // const response = await axios.get("https://anuncios-app-back.onrender.com/api/v1/categories");
      set({ categories: response.data });
      // set((state) => ({ categories: response.data }));
      // set((state) => ({
      //   categories: [...state.categories, response.data],
      // }));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },
  toggleNotifier: () => set((state) => ({ notifier: !state.notifier })),
  findInAds: (keyword) =>
    set((state) => ({
      partialAds: state.ads.filter((ad) => ad.body.includes(keyword)),
    })),
  filterInAds: (categoryId) =>
    set((state) => ({
      partialAds: state.ads.filter((ad) => ad.categoryId === categoryId),
    })),
}));

// Store for users
export const useUserStore = create((set) => ({
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  users: [],
  signupUser: async (body) => {
    try {
      const response = await axios.post("/api/v1/user/signup", body);
      // const response = await axios.post("https://anuncios-app-back.onrender.com/api/v1/user/signup", body);
      localStorage.setItem("user", JSON.stringify(response.data));
      set({ user: response.data });
    } catch (error) {
      console.error("Error signing up user:", error);
    }
  },
  loginUser: async (body) => {
    try {
      const response = await axios.post("/api/v1/user/signin", body);
      // const response = await axios.post("https://anuncios-app-back.onrender.com/api/v1/user/signin", body);
      localStorage.setItem("user", JSON.stringify(response.data));
      set({ user: response.data });
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  },
  logoutUser: async () => {
    await axios.get("/api/v1/user/logout");
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
