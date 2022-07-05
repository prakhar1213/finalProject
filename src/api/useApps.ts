import { useQuery } from "react-query";

const useApps = () => {
  return useQuery(["apps"], async () => {
    const res = await fetch(`https://lit-shelf-15554.herokuapp.com/api/apps`, {
      headers: { authorization: "efd7ff29-5072-4121-8dc8-7a65f9e5bbbd" },
    });
    const data = await res.json();
    return data.data.data;
  });
};

// const getData = async () => {
//   console.log("here");
//   const res = await fetch(`https://lit-shelf-15554.herokuapp.com/api/apps`, {
//     headers: { authorization: "efd7ff29-5072-4121-8dc8-7a65f9e5bbbd" },
//   });
//   const data = await res.json();
//   console.log(data.data.data);
//   return data.data.data;
// };

export default useApps;
