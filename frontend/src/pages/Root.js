import { Fragment } from "react";
import MainHeader from "../components/layout/MainHeader";
import { Outlet } from "react-router-dom";

function RootLayout() {
    return (
        <Fragment>
            <MainHeader />
            <main>
                <Outlet />
            </main>
        </Fragment>
    );
}

export default RootLayout;