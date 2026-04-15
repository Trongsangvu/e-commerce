import React from "react";
import Header from "../navigation/Header";
// import { Outlet } from "react-router-dom";
// import { Footer } from "../navigation/Footer";

export const DefaultLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div>
      <Header />
      {children}
    </div>

    // <>
    //   <Header />
    //   <Outlet />
    //   <Footer />
    // </>
  );
};
