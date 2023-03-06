import { useNavigate } from "react-router-dom";
import Signin from "./Signin";

// Этим компонентом нужно обернуть компоненты в роутах для которых нужно делать проверку
export const WithAuthRedirect = ({ children }) => {
  const isAuth = localStorage.getItem("username"); // При логине пользователь ложиться в localstorage
  const navigate = useNavigate();

  // Проверяем если пользователь залогинен, то возвращаем компонент из роута
  if (isAuth) return <> {children} </>;

  // если не залогинен то перенаправляем на страничку логина
  navigate("/", { replace: true });
  return <Signin />;
};
