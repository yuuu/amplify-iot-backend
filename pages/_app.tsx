import "../styles/globals.css";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "@aws-amplify/ui-react/styles.css";
import Head from "next/head";
import { useState } from "react";
import type { AppProps } from "next/app";
import Navbar from "../src/components/layouts/Navbar";
import Sidebar from "../src/components/layouts/Sidebar";
import CopyRight from "../src/components/layouts/CopyRight";
import Footer from "../src/components/layouts/Footer";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";

import awsconfig from "../src/aws-exports";

Amplify.configure(awsconfig);

const formFields = {
  confirmVerifyUser: {
    confirmation_code: {
      labelHidden: false,
      label: "New Label",
      placeholder: "Enter your Confirmation Code:",
      isRequired: false,
    },
  },
};

const App = (props: AppProps) => {
  return (
    <Authenticator.Provider>
      <MyApp {...props} />
    </Authenticator.Provider>
  );
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [sidebarClosed, setSidebarClosed] = useState(true);
  const onSidebarToggle = (closed: boolean) => setSidebarClosed(closed);
  const { authStatus, signOut } = useAuthenticator((context) => [
    context.authStatus,
  ]);

  return (
    <>
      <Head>
        <title>Enviiewer | Monitoring the environment with IoT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {authStatus === "configuring" && "Loading..."}
      {authStatus !== "authenticated" ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <Authenticator hideSignUp={true} />
        </div>
      ) : (
        <>
          <Navbar
            sidebarClosed={sidebarClosed}
            onSidebarToggle={onSidebarToggle}
            onSignOut={() => signOut && signOut()}
          />
          <div className="flex overflow-hidden bg-white pt-16">
            <Sidebar closed={sidebarClosed} onClick={onSidebarToggle} />
            <div
              id="main-content"
              className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
            >
              <main>
                <div className="pt-8 px-4">
                  <Component {...pageProps} />
                </div>
              </main>
              <Footer />
              <CopyRight />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default App;
