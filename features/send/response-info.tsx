import { useCallback, useState } from "react";
import ReactJson from "react-json-view";

export const useResponseInfo = () => {
  const [[responseStatus, responseData], setResponse] = useState<
    [boolean, any]
  >([false, null]);

  const setSuccess = useCallback((data: any) => {
    setResponse([true, data]);
  }, []);

  const setError = useCallback((error: any) => {
    setResponse([false, error]);
  }, []);

  return {
    responseInfo: { responseStatus, responseData },
    setSuccess,
    setError,
  };
};

export const ResponseInfo = ({
  responseStatus,
  responseData,
}: {
  responseStatus: boolean;
  responseData: any;
}) => {
  if (!responseData) return null;

  if (responseStatus) return <ReactJson name="data" src={responseData} />;

  return <>{String(responseData)}</>;
};
