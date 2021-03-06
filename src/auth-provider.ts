//在真实微环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发
import { User } from "./screens/project-list/search-panel";
const localStorageKey = "__auth_provider_token__";
const apiUrl = process.env.REACT_APP_API_URL;
export const getToken = () => window.localStorage.getItem(localStorageKey);

//处理请求返回参数
export const handlerUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

//定义登录函数
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handlerUserResponse(await res.json());
    } else {
      return Promise.reject(await res.json());
    }
  });
};

//定义注册函数
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handlerUserResponse(await res.json());
    } else {
      return Promise.reject(await res.json());
    }
  });
};

//定义登出函数
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
