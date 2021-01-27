import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const getTokenFromStorage = () =>
  window.localStorage.getItem("_notifyToken") || undefined;

const setTokenToStorage = (token: string) =>
  window.localStorage.setItem("_notifyToken", token);

export const useGetFCMToken = () => {
  const { query } = useRouter();
  const [token, setToken] = useState<string>(() => {
    if (process.browser)
      return query._notifyToken
        ? String(query._notifyToken)
        : getTokenFromStorage();
    return query._notifyToken && String(query._notifyToken);
  });

  useEffect(() => {
    if (query._notifyToken) {
      const tokenFromQuery = String(query._notifyToken);
      setToken(tokenFromQuery);
      setTokenToStorage(tokenFromQuery);
    }
  }, [query._notifyToken]);

  return token;
};
