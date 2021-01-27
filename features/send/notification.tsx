import { useCallback, useEffect, useState } from "react";

import { sendNotification } from "../../api";
import { ResponseInfo, useResponseInfo } from "./response-info";

import s from "./styles.module.css";

export const SendNotification = ({ token }: { token: string | undefined }) => {
  const [showTokenInput, setShowTokenInput] = useState(false); // Fix contain matching
  const { responseInfo, setSuccess, setError } = useResponseInfo();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const data = Object.values(e.target).reduce((acc, element) => {
        if (element.name) {
          acc[element.name] = element.value;
        }
        return acc;
      }, {});

      sendNotification({
        token,
        ...data,
        url: `${process.env.APP_URL}/notification-page`,
      })
        .then(({ data }) => setSuccess(data))
        .catch(setError);
    },
    [token, setSuccess, setError]
  );

  useEffect(() => {
    if (!token) setShowTokenInput(true);
  }, [token]);

  return (
    <form className={s.send} onSubmit={handleSubmit}>
      <h2>Notification</h2>
      {showTokenInput && (
        <input
          key="token"
          required
          name="token"
          className="field"
          placeholder="FCM Token"
        />
      )}
      <input
        required
        name="title"
        className="field"
        placeholder="Title"
        defaultValue="Notification Title"
      />
      <textarea
        required
        name="body"
        className="field"
        placeholder="Body"
        defaultValue="Notification Body"
      />
      <div className={s["send__controls"]}>
        <button className="button">Send</button>
      </div>
      {responseInfo.responseData && (
        <div className={s["send__response"]}>
          <ResponseInfo {...responseInfo} />
        </div>
      )}
    </form>
  );
};
