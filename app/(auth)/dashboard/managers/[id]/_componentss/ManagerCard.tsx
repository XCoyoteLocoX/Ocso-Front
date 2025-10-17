import { Manager } from "@/entities";
import { Card, CardHeader, Divider, CardBody } from "@heroui/react";
import Link from "next/link";

export default function ManagerCard({manager}: {manager:Manager}) {
    return (
            <Card className="mx-20 py-2">
    <CardHeader>
        <p className="w-full">
        Nombre: <b> {manager.managerFullName} </b>
        </p>
    </CardHeader>
    <Divider />
    <CardBody className="flex flex-row flex-grow-0 items-center gap-10 justify-center">
        <div className="flex flex-col text-lg">
        <p className="w-full">
        Email: <b>{manager.managerEmail}</b>
        </p>
        <p className="w-full">
        Teléfono: <b>{manager.managerPhoneNumber}</b>
        </p>
        <p className={manager.location ? "": "hidden"}>
            Tienda:{" "}
            <Link
            href={{
                pathname: `/dashboard/locations}`,
                query: {
                    store: manager?.location?.locationId
                }
            }}
            >
                <b>{manager.location.locationName}</b>
            </Link>
        </p>
        </div>
        {manager.location ? (
            <>
        <iframe
        className="border-2 border-orange-800 rounded-md my-2"
        width="300"
        height="200"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAz0Y6dhhUVleZmt7-H4P01QQWCSEz3LBg&q=${manager.location.locationLatLng[0]},${manager.location.locationLatLng[1]}`}>
        </iframe>
        </>
            ) : (<p> No tiene tienda </p>)
        }
    </CardBody>
    </Card>
    )
}