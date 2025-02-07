import { ReactNode } from "react";


type DefaultLayoutProps = {
    children: ReactNode
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    return ( 
        <div>
            {children}
        </div>
     );
}

export default DefaultLayout;