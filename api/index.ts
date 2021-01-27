import Axios from "axios";

export const apiInstance = Axios.create({
  headers: {
    Authorization: `key=${process.env.FCM_API_KEY}`,
  },
});

export type SendNotificationProps = {
  token: string;
  title: string;
  body: string;
  url: string;
};
export const sendNotification = ({
  token,
  url,
  ...notification
}: SendNotificationProps) =>
  apiInstance.post("https://fcm.googleapis.com/fcm/send", {
    to: token,
    notification,
    data: {
      url,
    },
  });

export type SendDataMessageProps = {
  token: string;
  title: string;
  body: string;
  url: string;
  action_name: string;
  action_url: string;
  payload: string;
};
export const sendDataMessage = ({ token, ...data }: SendDataMessageProps) =>
  apiInstance.post("https://fcm.googleapis.com/fcm/send", {
    to: token,
    data,
  });
