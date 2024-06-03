import { useState, useEffect, useCallback } from "react";
import { Params, APIRes } from "../utils/types";
import { api } from "../utils/axios";

export const useFetch = (
  params: Params,
  page: number
): [APIRes | undefined, typeof status] => {
  const [status, setStatus] = useState({ isLoading: false, error: "" });
  const [result, setResult] = useState<APIRes | undefined>(undefined);
  const fetch = useCallback(
    async (params: Params, page: number) => {
      try {
        if (page > 1) {
          const res = await api.get<any, { data: APIRes }>("", {
            params: { ...params, page },
          });
          setResult(res.data);
        } else {
          const res = await api.get<any, { data: APIRes }>("", { params });
          setResult(res.data);
        }
      } catch (e) {
        if (typeof e === "string") {
          setStatus((prev) => ({ ...prev, error: e as string }));
          throw new Error(e);
        } else if (e instanceof Error) {
          setStatus((prev) => ({ ...prev, error: (e as Error).message }));
          throw new Error(e.message, { cause: e });
        }
      } finally {
        setStatus((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [params, page]
  );

  useEffect(() => {
    fetch(params, page);
  }, [params, page]);

  return [result, status];
};
