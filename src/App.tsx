import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import AuthApi from "./api/auth";
import BackendApi from "./api/backend";
import useLocalStorage from "./hook/useLocalStorage";
import { UserType } from "./utils/types";
import Provider from "./components/provider";
import LoginPage from "./pages/login";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Upbar from "./components/up-bar";
import SideBar from "./components/side-bar";
import { twMerge } from "tailwind-merge";
import Loading from "./components/Loading";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "@tanstack/react-query";

export type AppContextType = {
  accessToken: string;
  setAccessToken: (value: string) => void;
  setRefreshToken: (value: string) => void;
  refreshToken: string;
  authApi: AuthApi;
  backendApi: BackendApi;
  user: UserType | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserType | null | undefined>>;
  lang: "ar" | "en" | "fr",
  setLang: React.Dispatch<"ar" | "en" | "fr">
};

function App() {
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
  const [lang, setLang] = useLocalStorage<"en" | "ar" | "fr">("lang", "en");

  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");
  const [user, setUser] = useState<UserType | null | undefined>(undefined);
  const [openSideBar, setOpenSideBar] = useState(false);
  const authApi = useMemo(
    () => new AuthApi({ accessToken, refreshToken }),
    [accessToken, refreshToken],
  );

  const backendApi = useMemo(
    () =>
      new BackendApi({
        accessToken: refreshToken,
        logout: () => {
          setUser(null);
          setAccessToken("");
          setRefreshToken("");
        },
      }),
    [refreshToken],
  );

  const value: AppContextType = {
    accessToken,
    setAccessToken,
    setRefreshToken,
    refreshToken,
    authApi,
    backendApi,
    user,
    setUser,
    lang,
    setLang
  };

  /*useEffect(() => {
    setUser(undefined);
    authApi
      .verify()
      .then((u) => {
        setUser(u);
      })
      .catch(() => {
        setUser(null);
      });
  }, [accessToken, refreshToken]);*/
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider value={value}>
        {/*user === undefined && (
          <div className="flex-center h-screen w-screen ">
            <Loading />
          </div>
        )}
        {user === null && <LoginPage />*/}
        {/*user &&*/ (
          <div className="text-dark flex h-screen  text-xs sm:text-sm md:text-base">
            <SideBar
              openSideBar={openSideBar}
              setOpenSideBar={setOpenSideBar}
            />
            <div className="flex  h-screen w-screen flex-col pt-16">
              <Upbar />
              <div
                className={twMerge(
                  "transation-[padding] flex-1 overflow-x-hidden bg-[#F6F8FA] pl-[4rem] duration-300",
                  openSideBar && "xl:pl-[20rem]",
                )}
              >
                <Outlet />
              </div>
            </div>
          </div>
        )}
        <ToastContainer
          style={{
            zIndex: 999999,
          }}
        />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
