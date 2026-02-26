import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { VehicleService, VehicleQuery } from '../../services/vehicle.service';

export interface Vehicle {
  id: string;
  model: string;
  description: string;
  basePrice: number;
  range: number;
  topSpeed: number;
  acceleration: string;
  modelImg: string;
  category: string;
}

interface VehiclesState {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  search: string;
  category: string;
}

const initialState: VehiclesState = {
  vehicles: [],
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  search: '',
  category: 'All',
};

export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async (params: VehicleQuery & { page: number; limit: number }) => {
    const response = await VehicleService.getVehicles(params) as {
      data: Vehicle[];
      totalCount: number;
    };
    return {
      data: response.data,
      totalCount: response.totalCount,
      currentPage: params.page,
    };
  }
);

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.currentPage = 1;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload.data;
        state.totalPages = Math.ceil(action.payload.totalCount / 2);
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch vehicles';
      });
  },
});

export const { setSearch, setCategory, setPage, clearError } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;
