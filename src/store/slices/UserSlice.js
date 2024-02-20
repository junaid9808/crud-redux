import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://65cf4bfcbdb50d5e5f5af566.mockapi.io/crud",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const res = await response.json();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const readUser = createAsyncThunk(
  "readUser",
  async ({ rejectWithValue }) => {
    const response = await fetch(
      "https://65cf4bfcbdb50d5e5f5af566.mockapi.io/crud"
    );
    try {
      const res = await response.json();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://65cf4bfcbdb50d5e5f5af566.mockapi.io/crud/${id}`,
      { method: "DELETE" }
    );
    try {
      const res = await response.json();
      console.log("res", res);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      `https://65cf4bfcbdb50d5e5f5af566.mockapi.io/crud/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const res = await response.json();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const UserSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isLoading: false,
    isError: null,
    searchData: [],
  },
  reducers: {
    searchUser: (state, action) => {
      console.log(action.payload);
      state.searchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users.push(action.payload);
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.message;
    });
    builder.addCase(readUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(readUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(readUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.message;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      const { id } = action.payload;
      if (id) {
        state.users = state.users.filter((ele) => ele.id !== id);
      }
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.message;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("action", action.payload);
      state.users = state.users.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.message;
    });
  },
});
export default UserSlice.reducer;
export const { searchUser } = UserSlice.actions;
