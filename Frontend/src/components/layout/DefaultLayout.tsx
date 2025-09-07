import { ReactNode } from "react";
import { Header } from "../navigation/Header";

type DefaultLayoutProps = {
  children: ReactNode;
};
export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
