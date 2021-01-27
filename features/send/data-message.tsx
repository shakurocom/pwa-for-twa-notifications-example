import { useCallback, useEffect, useState } from "react";
import qs from "qs";

import { sendDataMessage } from "../../api";
import { useResponseInfo, ResponseInfo } from "./response-info";

import s from "./styles.module.css";

export const SendDataMessage = ({ token }: { token: string | undefined }) => {
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

      sendDataMessage({
        token,
        ...data,
        url: `${process.env.APP_URL}/notification-page`,
        action_url: `${process.env.APP_URL}/action-page${qs.stringify(
          { payload: data.payload },
          { addQueryPrefix: true }
        )}`,
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
      <h2>Data Message</h2>
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
        defaultValue="Data Message Title"
      />
      <textarea
        required
        name="body"
        className="field"
        placeholder="Body"
        defaultValue="Data Message Body"
      />
      <input
        required
        name="action_name"
        className="field"
        placeholder="Action button"
        defaultValue="Open Page With Payload"
      />
      <textarea
        required
        name="payload"
        className="field"
        placeholder="Payload"
        defaultValue="Some payload"
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
