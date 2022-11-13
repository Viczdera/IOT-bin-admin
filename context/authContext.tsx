import React, { createContext, useReducer } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import jwt, { verify } from "jsonwebtoken"
//import PersistLogin from "./persistLogin";
import Router from "next/router";
import { addToLocalStorage, getFromLocalStorage } from "../utils/browserStorage";

type AppState = typeof initialState;
type Action =
  | {
      type: "LOGIN_START";
      payload: any;
    }
  | {
      type: "LOGIN_SUCCESS";
      payload: any;
    }
  | {
      type: "LOGIN_FAILURE";
      payload: any;
    }
  | {
      type: "LOGOUT";
      payload: any;
    }
  | {
      type: "CURRENCY";
      payload: any;
    }
  | {
      type: "NOTIFY";
      payload: {};
    };
//|{
//     type:"PRODUCTS";
//     payload:{}
//   };

//INTERFACE
interface DataProviderProps {
  children: React.ReactNode;
}

//COOKIE
const cookie: any = getCookie("ShopAdminJWT");
const user = cookie && verify(cookie!, "ShopAdminJWT");
const currency= getFromLocalStorage('currency');
console.log(user);
console.log(currency);
const initialState = {
  user: user || null,
  currency: currency||'NGN',
  notify: "",
};

const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isFetching: action.payload,
      };
    case "LOGIN_SUCCESS":
      let data = action.payload?.data?.data;
     // console.log(data)
      const token = jwt.sign(data, "ShopAdminJWT");
      const serialized = {
        key: "ShopAdminJWT",
        value: token,
        options: {
          httpOnly: false,
          sameSite: true,
          path: "/",
          secure: true,
          maxAge: 86400,
        },
      };
      setCookie(serialized.key, serialized.value, serialized.options);
      Router.push("/");
      return {
        ...state,
        user: action.payload,
        notify: "Login Success",
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        notify: action.payload,
      };
    case "LOGOUT":
      const serializedOut = {
        key: "ShopAdminJWT",
        value: " token",
        options: {
          httpOnly: false,
          sameSite: true,
          path: "/",
          secure: true,
          maxAge: 1,
        },
      };
      deleteCookie(serializedOut.key, serializedOut.options);
      Router.push("/login");
      return {
        ...state,
        user: null,
        notify: "Logout Success",
      };
    case "CURRENCY":
      addToLocalStorage('currency',action.payload)
      return {
        ...state,
        currency: action.payload,
        notify: `Currency changed to ${action.payload}`,
      };
    default:
      return state;
  }
};

const DataValueContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

function DataValueProvider({ children }: DataProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataValueContext.Provider value={{ state, dispatch }}>
      {/* <PersistLogin>{children}</PersistLogin> */}
      {children}
    </DataValueContext.Provider>
  );
}

export { DataValueContext, DataValueProvider };
