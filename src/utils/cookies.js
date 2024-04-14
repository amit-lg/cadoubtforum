import Cookies from 'universal-cookie';

export const getAccessToken = () => {
  const cookies = new Cookies();
  const token = cookies.get("forum-access-token");
  return token;
};

export const setAccessToken = (token) => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);
  const cookies = new Cookies();
  cookies.set("forum-access-token", token, { path: "/", expires: expiryDate });
};

export const removeCookies = () => {
  const cookies = new Cookies();
  cookies.remove("forum-access-token");
};
