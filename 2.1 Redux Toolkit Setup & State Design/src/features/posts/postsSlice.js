import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: 1,
      title: "🚀 Redux Toolkit Centralized State Management",
      category: "Full Stack Architecture",
      createdAt: "2026-07-09T10:00:00.000Z",
      author: "Sam Fawaz Hadi AL_Basara (24BAI70236)",
    },
    {
      id: 2,
      title: "💡 Scalable Global State without Prop Drilling",
      category: "React Optimization",
      createdAt: "2026-07-09T11:30:00.000Z",
      author: "Sam Fawaz Hadi AL_Basara (24BAI70236)",
    },
    {
      id: 3,
      title: "⚡ Normalizing Data Structure for Predictable Updates",
      category: "State Design",
      createdAt: "2026-07-09T14:15:00.000Z",
      author: "Sam Fawaz Hadi AL_Basara (24BAI70236)",
    },
  ],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.items.unshift(action.payload);
    },

    updatePost: (state, action) => {
      const { id, title } = action.payload;
      const post = state.items.find((post) => post.id === id);
      if (post) {
        post.title = title;
      }
    },

    deletePost: (state, action) => {
      state.items = state.items.filter((post) => post.id !== action.payload);
    },
  },
});

export const { addPost, updatePost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
