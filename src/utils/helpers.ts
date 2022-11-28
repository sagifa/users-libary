import { UserData } from "./types";

export const parseName = (userData: UserData) => {
  return (
    userData.name.title + " " + userData.name.first + " " + userData.name.last
  );
};

export const parseLocation = (userData: UserData) => {
  return (
    userData.location.country +
    " " +
    userData.location.city +
    " " +
    userData.location.street.name +
    " " +
    userData.location.street.number
  );
};
