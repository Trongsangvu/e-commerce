import React from "react";
import Header from "../navigation/Header";

export const DefaultLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
