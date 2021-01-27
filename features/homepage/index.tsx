import Head from "next/head";

import { FCMToken } from "../fcm-token";
import { useGetFCMToken } from "../fcm-token/use-get-fcm-token";
import { SendDataMessage } from "../send/data-message";
import { SendNotification } from "../send/notification";

import s from "./styles.module.css";

export const Homepage = () => {
  const token = useGetFCMToken();
  return (
    <div className="container">
      <Head>
        <title>Homepage</title>
      </Head>
      <FCMToken token={token} />
      <div className={s["cards-list"]}>
        <SendDataMessage token={token} />
        <SendNotification token={token} />
      </div>
    </div>
  );
}
