import { UserServerData } from "./types";

export const parseName = (userData: UserServerData) => {
  return (
    userData.name.title + " " + userData.name.first + " " + userData.name.last
  );
};

export const parseLocation = (userData: UserServerData) => {
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
