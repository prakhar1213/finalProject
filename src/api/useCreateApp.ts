import { useMutation, useQueryClient } from "react-query";
import { baseUrl } from "../constant";

const setData = async (data: any) => {
  const raw = await fetch(`${baseUrl}apps`, {
    method: "POST",

    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      authorization: "efd7ff29-5072-4121-8dc8-7a65f9e5bbbd",
    },
    body: JSON.stringify(data),
  });
  const res = await raw.json();
  alert(res.message ? res.message : "App Created Successfully");
  return res;
};

const useCreateApp = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => setData(data), {
    onSuccess: ({ value }) => {
      queryClient.invalidateQueries(["apps"]);
    },
  });
};

export default useCreateApp;
