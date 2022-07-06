import { useMutation, useQueryClient } from "react-query";
import { baseUrl } from "../constant";

const setData = async (data: any, authorization?: string) => {
  const raw = await fetch(`${baseUrl}approveQrLogin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "efd7ff29-5072-4121-8dc8-7a65f9e5bbbd",
    },
    body: JSON.stringify(data),
  });
  const res = await raw.json();
  alert(raw.status == 200 ? res.data.message : res.errors[0]);
  return res;
};

const useCustLogin = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => setData(data), {
    onSuccess: ({ value }) => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};

export default useCustLogin;
