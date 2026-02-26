import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Vehicle } from './vehiclesSlice';

interface DashboardState {
  featuredCars: Vehicle[];
  loading: boolean;
  error: string | null;
  currentIndex: number;
}

const initialState: DashboardState = {
  featuredCars: [],
  loading: false,
  error: null,
  currentIndex: 0,
};

export const fetchFeaturedCars = createAsyncThunk(
  'dashboard/fetchFeaturedCars',
  async () => {
    const response = await fetch('http://localhost:3001/cars/getAllCars?page=1&limit=3');
    if (!response.ok) {
      throw new Error('Failed to fetch featured cars');
    }
    const data = await response.json();
    return data.data as Vehicle[];
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    nextSlide: (state) => {
      state.currentIndex = (state.currentIndex + 1) % state.featuredCars.length;
    },
    prevSlide: (state) => {
      state.currentIndex = 
        state.currentIndex === 0 ? state.featuredCars.length - 1 : state.currentIndex - 1;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedCars.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredCars = action.payload;
        state.currentIndex = 0;
      })
      .addCase(fetchFeaturedCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch featured cars';
      });
  },
});

export const { setCurrentIndex, nextSlide, prevSlide, clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
