import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect } from "react";
import useAuthContext from "./useAuthContext";

const instance = axios.create({
  baseURL: import.meta.env.BASE_URL || "http://localhost:3000",
});

export default function useSecureAxios() {
  const { user, logoutUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      const token = user?.accessToken;
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }

      return config;
    });

    const responseInterceptor = instance.interceptors.response.use(
      (config) => {
        return config;
      },
      (error) => {
        const status = error.status;
        if (status == 401 || status == 403) {
          console.log("Bad request");
          logoutUser().then(() => {
            navigate("/");
          });
        }
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, navigate, logoutUser]);

  return instance;
}
