import { TOKEN_NAME, API_URL } from "@/constants";
import { Location} from "@/entities";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react"
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function LocationCard({store}: {store:string | string[] | undefined}) {
    if (!store) return null;
    const userCookies = cookies()
    const token = (await userCookies).get(TOKEN_NAME)?.value;
    const { data } = await axios.get<Location>(`${API_URL}/employees/location/${store}`,{
            headers: {
                Authorization: `Bearer ${token}`
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