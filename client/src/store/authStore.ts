import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../lib/api";
import type {
  AuthStore,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  User,
} from "../types/auth";
import { toast } from "react-hot-toast";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginCredentials) => {
        try {
          set({ isLoading: true });
          const response = await api.post<AuthResponse>(
            "/auth/login",
            credentials
          );

          const { user, token } = response.data.data;

          // Store in localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });

          toast.success("Login successful!");
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (credentials: RegisterCredentials) => {
        try {
          set({ isLoading: true });
          const response = await api.post<AuthResponse>(
            "/auth/register",
            credentials
          );

          const { user, token } = response.data.data;

          // Store in localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });

          toast.success("Registration successful!");
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        // Clear localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });

        toast.success("Logged out successfully");
      },

      checkAuth: () => {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");

        if (token && userStr) {
          try {
            const user: User = JSON.parse(userStr);
            set({
              user,
              token,
              isAuthenticated: true,
            });
          } catch {
            // Clear invalid data
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
