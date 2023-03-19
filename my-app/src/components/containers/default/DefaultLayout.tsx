import { Outlet } from "react-router-dom";
import DefaultHeader from "./DefaultHeader";

const DefaultLayout = () => {
    return (
        <>
            <DefaultHeader/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default DefaultLayout;