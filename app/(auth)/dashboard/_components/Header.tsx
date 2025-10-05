import Image from "next/image";
export default function Header () {
    return (
        <div className="w-screen h-[10vh] bg-orange-200 flex flex-row items-center px-10">
        <Image 
        src="/ocsoLogo.png" 
        width={100} 
        height={100} 
        alt="Ocso Logo" 
        draggable={false}/>
        </div>
    ); 
}