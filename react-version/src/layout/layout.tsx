import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <main className="w-full max-w-[1440px]">
                    <Outlet />
            </main>
        </div>
    )
}

export default Layout;