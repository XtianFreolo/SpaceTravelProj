import { useLocation, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./Loading.jsx";
import NavBar from "./NavBar.jsx";

const Layout = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [location]);

    return (
        <>
            <NavBar />
            {loading && <Loader />}
            {!loading && <Outlet />}
        </>
    );
};

export default Layout;
