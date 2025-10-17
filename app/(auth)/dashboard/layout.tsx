"use client"
import { usePathname } from "next/navigation";
import Sidebar from "./managers/_components/_sidebar/Sidebar";
import Header from "./managers/_components/Header";

export default function LayoutDashboard({
    children, 
    locations,
}: Readonly<{
    children: React.ReactNode;
    locations: React.ReactNode;
}>) {
    const path = usePathname();
    return <div className="bg-orange-50">
        <Header/>
        <div className="flex flex-row items-center">
        <Sidebar/>
        {children}
        {path === "/dashboard" ? locations : null}
        </div>
        </div>
}