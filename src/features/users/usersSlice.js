import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await fetch(
    `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`
  );
  const users = await response.json();
  return { users };
});

export const addUserAsync = createAsyncThunk(
  "users/addUserAsync",
  async (payload) => {
    const response = await fetch(
      "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          userId: payload.id,
        }),
      }
    );
    const user = await response.json();
    return { user };
  }
);

export const deleteUserAsync = createAsyncThunk(
  "users/deleteUserAsync",
  async (payload) => {
    fetch(
      `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${payload.id}`,
      {
        method: "DELETE",
      }
    );
    return { id: payload.id };
  }
);

export const updateUserAsync = createAsyncThunk(
  "users/updateUserAsync",
  async (payload) => {
    const response = await fetch(
      `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${payload.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          id: payload.id,
        }),
      }
    );
    const user = await response.json();
    return { user };
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    status: null,
    sortOrder: "default",
  },
  reducers: {
    addUser: (state, action) => {
      const user = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
      };
      state.list.push(user);
    },
    deleteUser: (state, action) => {
      state.list = state.list.filter((user) => user.id !== action.payload.id);
    },
    updateUser: (state, action) => {
      let userToUpdate = state.list.find(
        (user) => user.id === action.payload.id
      );
      userToUpdate.name = action.payload.name;
      userToUpdate.email = action.payload.email;
    },
    sortUsers: (state, action) => {
      const sortingAlgo = function (a, b) {
        if (a.username === undefined) return 1;
        if (b.username === undefined) return -1;
        if (a.username === b.username) return 0;
        return a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1;
      };
      if (state.sortOrder === "default") {
        state.sortOrder = "ascending";
        state.list.sort(sortingAlgo);
      } else if (state.sortOrder === "ascending") {
        state.sortOrder = "descending";
        state.list.sort(sortingAlgo).reverse();
      } else if (state.sortOrder === "descending") {
        state.sortOrder = "ascending";
        state.list.sort(sortingAlgo);
      }
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.status = "loading";
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.list = payload.users;
      state.status = "success";
    },
    [getUsers.rejected]: (state) => {
      state.status = "failed";
    },
    [addUserAsync.fulfilled]: (state, action) => {
      state.list.push(action.payload.user);
    },
    [deleteUserAsync.fulfilled]: (state, action) => {
      state.list = state.list.filter((user) => user.id !== action.payload.id);
    },
    [updateUserAsync.fulfilled]: (state, action) => {
      let userToUpdate = state.list.find(
        (user) => user.id === action.payload.user.id
      );
      userToUpdate.name = action.payload.user.name;
      userToUpdate.email = action.payload.user.email;
    },
  },
});

export const { addUser, deleteUser, updateUser, sortUsers } =
  usersSlice.actions;

export default usersSlice.reducer;
