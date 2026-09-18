import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    { id: 1, title: "React Basics" },
    { id: 2, title: "Redux Toolkit" },
    { id: 3, title: "JavaScript ES6" },
    { id: 4, title: "Machine Learning" },
    { id: 5, title: "Node.js" },
  ],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push({
        id: Date.now(),
        title: action.payload,
      });
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const { addPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
