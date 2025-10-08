import Header from "./_components/Header";
import Sidebar from "./_components/_sidebar/Sidebar";

export default function LayoutDashboard({
    children, 
    locations,
}: Readonly<{
    children: React.ReactNode;
    locations: React.ReactNode;
}>) {
    return <div className="w-screen h-screen bg-orange-50">
        <div className="flex flex-row items-center">
        <Sidebar/>
        {children}
        {locations}
        </div>
        </div>
}