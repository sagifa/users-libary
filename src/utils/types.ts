export type UserData = {
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
  picture: {
    medium: string;
  };
  location: string;
  login: {
    uuid: string;
  };
};

export type UserUpdateFields = {
  name: string;
  email: string;
  location: string;
  uuid: string;
};
