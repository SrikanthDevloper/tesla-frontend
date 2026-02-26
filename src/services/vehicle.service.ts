import { apiFetch } from "./api";

export interface VehicleQuery {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export const VehicleService = {
    async getVehicles(query?: VehicleQuery) {
        const params = new URLSearchParams();

        if (query?.search) params.append("search", query.search);
        if (query?.category) params.append("category", query.category);
        if (query?.page) params.append("page", String(query.page));
        if (query?.limit) params.append("limit", String(query.limit));

        const queryString = params.toString();

        return apiFetch(
        `/getAllCars${queryString ? `?${queryString}` : ""}`
        );
    },

    async getVehicleById(id: string) {
        return apiFetch(`/cars/${id}`);
    },
};