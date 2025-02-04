/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { create } from "zustand";
import axios from "axios";
import { API_ENDPOINTS } from "@/utils/apiUrls";
import { Dog, DogStore, Location } from "@/utils/Interfaces/interfaces";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  withCredentials: true,
});

export const useDogStore = create<DogStore>((set) => ({
  favorites: [],
  isLoading: false,
  error: null,

  setLoading: (status: boolean) => set({ isLoading: status }),

  addFavorite: (dog: Dog) =>
    set((state) => ({ favorites: [...state.favorites, dog] })),

  removeFavorite: (id: string) =>
    set((state) => ({
      favorites: state.favorites.filter((dog) => dog.id !== id),
    })),

  login: async (name: string, email: string) => {
    set({ isLoading: true });
    try {
      await axiosInstance.post(API_ENDPOINTS.login, { name, email });
      window.location.href = "/search";
      toast.success("Successfully logged in!");
    } catch (error: any) {
      toast.error(error.message);
      set({ error: "Login failed" });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await axiosInstance.post(API_ENDPOINTS.logout);
      toast.info("Logged out successfully!");
    } catch (error: any) {
      toast.error(error.message);
      set({ error: "Logout failed" });
    } finally {
      set({ isLoading: false });
    }
  },

  getBreeds: async (): Promise<string[]> => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get<string[]>(API_ENDPOINTS.breeds);
      return data;
    } catch (error: any) {
      toast.error(error.message);
      set({ error: "Error fetching breeds" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  searchDogs: async (filters: Record<string, unknown>) => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get<{
        resultIds: string[];
        total: number;
      }>(API_ENDPOINTS.searchDogs, {
        params: filters,
      });
      return data;
    } catch (error: any) {
      toast.error(error.message);
      set({ error: "Error fetching dogs" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchDogDetails: async (dogIds: string[]): Promise<Dog[]> => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.post<Dog[]>(
        API_ENDPOINTS.dogDetails,
        dogIds
      );
      return data;
    } catch (error: any) {
      toast.error(error.message);
      set({ error: "Error fetching dog details" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  matchDog: async (favoriteIds: string[]): Promise<string> => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.post<{ match: string }>(
        API_ENDPOINTS.matchDog,
        favoriteIds
      );
      toast.success("Match found! Check out your perfect dog.");
      return data.match;
    } catch (error: any) {
      toast.error(error.message);
      set({ error: "Error finding match" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  searchLocations: async (
    city?: string,
    states?: string[]
  ): Promise<string[]> => {
    set({ isLoading: true });

    try {
      const requestBody: Record<string, any> = {};
      if (city) requestBody.city = city;
      if (states && states.length) requestBody.states = states;

      const { data } = await axiosInstance.post<{
        results: { zip_code: string }[];
      }>(API_ENDPOINTS.searchLocations, requestBody);

      return data.results.map((location) => location.zip_code);
    } catch (error: any) {
      toast.error(error.message);
      set({ error: "Error fetching locations" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  searchLocationsByBoundingBox: async (
    topLeft: { lat: number; lon: number },
    bottomRight: { lat: number; lon: number },
    size: number = 25
  ): Promise<string[]> => {
    set({ isLoading: true });

    try {
      const validatedSize = Math.min(Math.max(size, 1), 10000);

      const requestBody = {
        geoBoundingBox: {
          bottom_right: bottomRight,
          top_left: topLeft,
        },
        size: validatedSize,
      };

      const { data } = await axiosInstance.post<{
        results?: { zip_code: string }[];
        total?: number;
      }>(API_ENDPOINTS.geoLocationSearch, requestBody);

      if (!data?.results || data.results.length === 0) {
        toast.warn("No locations found for the given area.");
        return [];
      }

      return data.results.map((location) => location.zip_code);
    } catch (error: any) {
      console.error("Error fetching locations:", error);
      toast.error(error.message);
      set({ error: "Error fetching locations by geoBoundingBox" });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchLocationDetails: async (zipCodes: string[]): Promise<Location[]> => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.post<Location[]>(
        API_ENDPOINTS.locationDetails,
        zipCodes
      );
      return data.map((loc: Location) => ({
        zip_code: loc?.zip_code || "",
        city: loc.city || "Unknown",
        state: loc.state || "Unknown",
      }));
    } catch (error: any) {
      toast.error(error.message);
      set({ error: "Error fetching location details" });
      return [];
    } finally {
      set({ isLoading: false });
    }
  },
}));
