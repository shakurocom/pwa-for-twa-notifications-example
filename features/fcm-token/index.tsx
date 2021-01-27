import { useEffect, useState } from "react";
import s from "./styles.module.css";

export const FCMToken = ({ token }: { token: string | undefined }) => {
  const [showToken, setShowToken] = useState(false); // Fix contain matching

  useEffect(() => {
    if (token) setShowToken(true);
  }, [token]);

  return (
    <>
      <p>FCM token:</p>
      {showToken ? <span className={s.token}>{token}</span> : "None"}
    </>
  );
};
