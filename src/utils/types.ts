export type UserServerData = {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    medium: string;
  };
  location: {
    country: string;
    city: string;
    street: {
      number: number;
      name: string;
    };
  };
  login: {
    uuid: string;
  };
};

export type UserDataApp = {
  name: string;
  email: string;
  picture: string;
  location: string;
  uuid: string;
};

export type UserUpdateFields = {
  name: string;
  email: string;
  location: string;
  uuid: string;
};

export type UserCreateType = {
  name: string;
  email: string;
  picture: string;
  location: string;
};

export interface UserState {
  isLoading: boolean;
  isError: boolean;
  data: UserDataApp[];
}

export type GetUsersResponse = {
  results: UserServerData[];
};

export type UserCardProps = {
  userData: UserDataApp;
};

export type CardItems = "name" | "email" | "location" | "uuid";
