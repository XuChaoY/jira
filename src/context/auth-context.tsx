import React, { useEffect, ReactNode } from "react";
import * as auth from "../auth-provider";
import { User } from "../screens/project-list/search-panel";
import { http } from "../utils/http";
import { useAsync } from "../utils/use-async";
import { FullPageLoading, FullPageErrorFallBack } from "../components/lib";
interface AuthForm {
  username: string;
  password: string;
}
//初始化用户信息，做持久化登陆
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token: token });
    user = data.user;
  }
  return user;
};
//声明context
const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

//重新包装的login、register、logut的原因是形成全局的user以及方法全局化
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();
  const login = (form: AuthForm) =>
    auth.login(form).then((user) => setUser(user));
  const register = (form: AuthForm) =>
    auth.register(form).then((user) => setUser(user));
  const logout = () => auth.logout().then(() => setUser(null));
  useEffect(() => {
    run(bootstrapUser());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }
  if (isError) {
    return <FullPageErrorFallBack error={error} />;
  }
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, register, login, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
