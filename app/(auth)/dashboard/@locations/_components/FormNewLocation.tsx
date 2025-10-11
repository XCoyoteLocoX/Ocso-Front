
import { cookies } from "next/headers";
import SelectManager from "./SelectManager";
import { Input } from "@heroui/react";
import {createLocation} from "@/actions/locations/create"
import { API_URL, TOKEN_NAME } from "@/constants";
import axios from "axios";
import { Key } from "react";

export default async function FormNewLocation({store}: {store: string | string[] | undefined})  {
    if (store) return null;
    const userCookies = cookies()
    const token = (await userCookies).get(TOKEN_NAME)?.value;
    const responseManagers = await axios.get(`${API_URL}/managers`, {
            headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const responseLocation = await axios.get(`${API_URL}/locations`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return (
        <form action = {createLocation} className="bg-orange-400 py-2 px-4 flex flex-col gap-6 w-full rounded-lg">
            <h1 className="text-3xl text-white text-center">Crear tienda</h1>
            <Input label = "Nombre" placeholder="Ocso Juriquilla" name="locationName"/>
            <Input label = "Direccion" placeholder="Av De La Luz" name="locationName"/>
            <Input label = "Latitud" placeholder="120" name="locationName"/>
            <Input label = "Longitud" placeholder="20" name="locationName"/>
            <SelectManager managers={responseManagers.data} locations={responseLocation.data}/>
            <Input label = "submit" name="locationName"/>

            <button type = "submit" color = "primary"> subir</button>
        </form>
    )
}