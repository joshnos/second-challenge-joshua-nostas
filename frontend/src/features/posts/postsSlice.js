import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PostsService from "../../services/posts";

const initialState = [];

export const createPost = createAsyncThunk(
  "posts/create",
  async ({ name, description }) => {
    const res = await PostsService.create({ name, description });
    return res.data;
  }
);

export const retrievePosts = createAsyncThunk(
  "posts/retrieve",
  async () => {
    const res = await PostsService.getAll();
    return res.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/update",
  async ({ id, data }) => {
    const res = await PostsService.update(id, data);
    return res.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id) => {
    await PostsService.remove(id);
    return { id };
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: {
    [createPost.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrievePosts.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updatePost.fulfilled]: (state, action) => {
      const index = state.findIndex(tutorial => tutorial.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deletePost.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

export const { reducer } = postSlice;
export default reducer;