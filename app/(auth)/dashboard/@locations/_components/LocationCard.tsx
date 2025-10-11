import { API_URL } from "@/constants";
import { Location} from "@/entities";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react"
import axios from "axios";
import { authHeaders } from "@/helpers/authHeaders";

import Link from "next/link";

export default async function LocationCard({store}: {store:string | string[] | undefined}) {
    if (!store) return null;
    const { data } = await axios.get<Location>(`${API_URL}/employees/location/${store}`,{
            headers: {
                ...(await authHeaders()),
            }
        })
    return (
        <Card>
        <CardHeader>
        <b className="w-full">{data.locationName}</b>
        </CardHeader>   
        <Divider/>
            <CardBody>
            <p className="w-full"> 
                Manager:
                <Link href={{pathname: `/dashboard/managers`}}>
                <b>{data.manager?.managerFullName}</b>
                </Link>
                </p> 
            </CardBody>
        </Card>
    )
}