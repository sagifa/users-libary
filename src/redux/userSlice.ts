import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  GetUsersResponse,
  UserCreateType,
  UserDataApp,
  UserState,
  UserUpdateFields,
} from "../utils/types";
import { axiosPaths } from "../utils/axiosPaths";
import axios from "axios";
import { Dispatch } from "react";
import { parseLocation, parseName } from "../utils/helpers";
import { v4 as uuidv4 } from "uuid";

export const initialState: UserState = {
  isLoading: false,
  isError: false,
  data: [
    {
      name: "",
      email: "",
      picture: "",
      location: "",
      uuid: "",
    },
  ],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload || false;
    },
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload || false;
    },
    setUserListData: (state, action: PayloadAction<UserDataApp[]>) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    deleteUser: (state, action: PayloadAction<any>) => {
      state.data = state.data?.filter(
        (user) => user.uuid !== action.payload.uuid
      );
    },
    editUser: (state, action: PayloadAction<UserUpdateFields>) => {
      state.data = state.data.map((user: UserDataApp) => {
        if (user.uuid !== action.payload.uuid) {
          return { ...user };
        } else {
          return {
            ...user,
            name: action.payload.name,
            email: action.payload.email,
            location: action.payload.location,
          };
        }
      });
    },
    createUser: (state, action: PayloadAction<UserCreateType>) => {
      let uuid = uuidv4();
      state.data?.push({ ...action.payload, uuid });
    },
  },
});

// --*--*--*--*--*--*--*--*--*--*--*-- //  Actions

export const {
  setIsLoading,
  setIsError,
  setUserListData,
  editUser,
  deleteUser,
  createUser,
} = userSlice.actions;

// --*--*--*--*--*--*--*--*--*--*--*-- // Selectors

// export const selectUserListData = (state: RootState) => state.user.data;
// export const selectIsLoading = (state: RootState) => state.user.isLoading;
// export const selectIsError = (state: RootState) => state.user.isError;

// --*--*--*--*--*--*--*--*--*--*--*-- //Functions

export async function getUsers(dispatch: Dispatch<any>) {
  dispatch(setIsLoading(true));
  try {
    const { data } = await axios.get<GetUsersResponse>(axiosPaths.userList);
    const res = parseServerData(data);
    dispatch(setUserListData(res));
  } catch (error) {
    dispatch(setIsError(true));
  } finally {
    dispatch(setIsLoading(false));
  }
}

const parseServerData = (data: GetUsersResponse) => {
  return data.results.map((user) => {
    const name = parseName(user);
    const location = parseLocation(user);
    return {
      ...user,
      name: name,
      location: location,
      picture: user.picture.medium,
      uuid: user.login.uuid,
    };
  });
};
