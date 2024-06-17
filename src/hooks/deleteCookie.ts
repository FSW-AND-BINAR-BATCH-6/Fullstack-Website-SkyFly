import { setCookie } from "cookies-next";

export const deleteCookie = (name: any) => {
  setCookie(name, "", { maxAge: -1 });
};
