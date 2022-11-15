import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { DataValueContext } from "../context/authContext";

//export const baseUrl = process.env.APP_URL;

export const headers = (json: boolean, access_token?: string) => {
  return {
    "Content-Type": `${json ? "application/json" : "multipart/form-data"}`,
    "Access-Control-Allow-Origin": "*",
    // Accept: "application/json",
    Authorization: `Bearer ${access_token}`,
  };
};
export const headers2 = (access_token?: string) => {
  return {
    "Access-Control-Allow-Origin": "*",
    // Accept: "application/json",
    Authorization: `Bearer ${access_token}`,
  };
};

export const useGetRequest = (endpoint: string,queryName:string, access_token?: string) => {
  const Toast = useToast();
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    Authorization: `Bearer ${access_token}`,
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`${endpoint}`, { headers: headers });
      let data = {
        status: res.status,
        data: res.data,
      };
      console.log(data);
      return data;
    } catch (error: any) {
      let err = {
        status: error?.response?.status,
        error: error?.response?.data,
      };
      return err || error;
    }
  };

  const { isLoading, isSuccess,isFetching, data } = useQuery(queryName, () => fetchData(), {
    onSuccess: (response: any) => {
      console.log(response);
      let s = response?.status;
      let e = response?.error;
      let d = response?.data;
      if (s == 200 || s == 201) {
        Toast({
          position: "top-right",
          title: "Success.",
          description: d?.message,
          status: "success",
          duration: 1500,
          isClosable: true,
        });
        // queryClient.invalidateQueries("all_linked_devices");
      } else {
        Toast({
          position: "top-right",
          title: "Error",
          description: e?.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    },
    onError: (error: any) => {
      console.log(error);
      Toast({
        position: "top-right",
        title: "Error",
        description: error,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });
  return { isLoading, isSuccess,isFetching, data };
};

export const usePostRequest = (
  json: boolean = true,
  endpoint: string,
  access_token?: string
) => {
  const Toast = useToast();
  const { state, dispatch } = useContext(DataValueContext);

  const createRequest = async (formData: any) => {
    try {
      const res = await axios.post(`${endpoint}`, formData, {
        headers: headers(json, access_token),
      });
      let data = {
        status: res.status,
        data: res.data,
      };
      // console.log(data);
      return data;
    } catch (error: any) {
      let err = {
        status: error?.response?.status,
        error: error?.response?.data,
      };
      return err || error;
    }
  };

  const {
    mutateAsync: createPost,
    isLoading,
    isSuccess,
    data,
  } = useMutation(createRequest, {
    onSuccess: (response: any) => {
      console.log(response);
      let s = response?.status;
      let e = response?.error;
      let d = response?.data;
      if (s == 200 || s == 201) {
        Toast({
          position: "top-right",
          title: "Success.",
          description: d?.message,
          status: "success",
          duration: 1500,
          isClosable: true,
        });
        // queryClient.invalidateQueries("all_linked_devices");
      } else {
        Toast({
          position: "top-right",
          title: "Error",
          description: e?.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    },
    onError: (error: any) => {
      console.log(error);
      Toast({
        position: "top-right",
        title: "Error",
        description: error,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  return { createPost, data, isLoading, isSuccess };
};

// export const useDeleteRequest = (
//   endpoint,
//   access_token,
//   invalidateQueryKey
// ) => {
//   const queryClient = useQueryClient();
//   const [errorResp, setErrorResp] = useState();
//   const [success, setSuccess] = useState();

//   const headers = {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//     Accept: "application/json",
//     Authorization: `Bearer ${access_token}`,
//   };

//   const createDelete = async (id) => {
//     try {
//       const res = await axios.delete(`${baseUrl}/${endpoint}/${id}`, {
//         headers: headers,
//       });
//       setSuccess(res.data);
//     } catch (error) {
//       setErrorResp({
//         errorStatus: error?.response?.status,
//         errorResponse: error?.response?.data.message,
//       });
//       if (parseInt(error?.response?.status) === 401) {
//         dispatch(logout());
//         router.replace("/auth/login");
//       }
//     }
//   };

//   const { mutateAsync: deleteRequest, isLoading } = useMutation(createDelete, {
//     onSuccess: () => queryClient.invalidateQueries(invalidateQueryKey),
//   });

//   return { deleteRequest, isLoading, errorResp, success };
// };

// export const usePatchRequest = (endpoint, token, invalidateQueryKey) => {
//   const queryClient = useQueryClient();
//   const [errorResp, setErrorResp] = useState();
//   const [success, setSuccess] = useState();

//   const headers = {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//     Accept: "application/json",
//     Authorization: `Bearer ${access_token}`,
//   };

//   const createRequest = async (formData) => {
//     try {
//       const res = await axios.patch(`${baseUrl}/${endpoint}`, formData, {
//         headers: headers,
//       });
//       setSuccess(res.data);
//     } catch (error) {
//       setErrorResp({
//         errorStatus: error?.response?.status,
//         errorResponse: error?.response?.data.message,
//       });
//       if (parseInt(error?.response?.status) === 401) {
//         dispatch(logout());
//         router.replace("/auth/login");
//       }
//     }
//   };

//   const { mutateAsync: createPost, isLoading } = useMutation(createRequest, {
//     onSuccess: () => queryClient.invalidateQueries(invalidateQueryKey),
//   });

//   return { createPost, isLoading, errorResp, success };
// };
