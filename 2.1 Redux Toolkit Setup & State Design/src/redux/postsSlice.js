import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [
    {
      id: 'post-1',
      title: '🚀 Launching Centralized State Architecture',
      content: 'Exploring how Redux Toolkit simplifies global state management in modern scalable frontend applications. Single store, predictable state updates, zero prop drilling!',
      platforms: ['linkedin', 'twitter'],
      status: 'Published', // 'Draft' | 'Published' | 'Scheduled'
      tags: ['ReduxToolkit', 'ReactJS', 'WebDev'],
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      author: 'Sam Fawaz Hadi Ali AL-Basara (24BAI70236)'
    },
    {
      id: 'post-2',
      title: '💡 AI & ML Full Stack Integration Insights',
      content: 'Combining deep learning models with React state management provides real-time monitoring of inference pipelines and dataset tracking.',
      platforms: ['twitter', 'instagram'],
      status: 'Draft',
      tags: ['AIML', 'FullStack', 'StateManagement'],
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      author: 'Sam Fawaz Hadi Ali AL-Basara (24BAI70236)'
    }
  ]
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      const newPost = {
        id: `post-${Date.now()}`,
        createdAt: new Date().toISOString(),
        author: 'Sam Fawaz Hadi Ali AL-Basara (24BAI70236)',
        status: action.payload.status || 'Draft',
        tags: action.payload.tags || [],
        platforms: action.payload.platforms || ['twitter'],
        ...action.payload
      };
      state.posts.unshift(newPost);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    toggleStatus: (state, action) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.status = post.status === 'Published' ? 'Draft' : 'Published';
      }
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = { ...state.posts[index], ...action.payload };
      }
    }
  }
});

export const { addPost, deletePost, toggleStatus, updatePost } = postsSlice.actions;
export default postsSlice.reducer;
