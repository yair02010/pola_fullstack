    import { Outlet } from "react-router-dom";
    import Navbar from "./Navbar";
    import Footer from "./Footer";

    export default function Layout() {
    return (
        <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 ">
            <Outlet />
        </main>
        <Footer />
        </div>
    );
    }
