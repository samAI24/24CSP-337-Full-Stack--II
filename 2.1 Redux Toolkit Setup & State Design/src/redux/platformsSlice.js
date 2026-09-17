import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedFilter: 'all',
  availablePlatforms: [
    {
      id: 'twitter',
      name: 'Twitter / X',
      badge: 'X.com',
      charLimit: 280,
      color: '#38bdf8',
      bgColor: 'rgba(56, 189, 248, 0.1)',
      icon: 'Twitter'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Pro',
      badge: 'Professional',
      charLimit: 3000,
      color: '#60a5fa',
      bgColor: 'rgba(96, 165, 250, 0.1)',
      icon: 'Linkedin'
    },
    {
      id: 'instagram',
      name: 'Instagram Feed',
      badge: 'Visual',
      charLimit: 2200,
      color: '#f43f5e',
      bgColor: 'rgba(244, 63, 94, 0.1)',
      icon: 'Instagram'
    },
    {
      id: 'facebook',
      name: 'Facebook Page',
      badge: 'Community',
      charLimit: 5000,
      color: '#818cf8',
      bgColor: 'rgba(129, 140, 248, 0.1)',
      icon: 'Facebook'
    }
  ]
};

const platformsSlice = createSlice({
  name: 'platforms',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.selectedFilter = action.payload;
    }
  }
});

export const { setFilter } = platformsSlice.actions;
export default platformsSlice.reducer;
