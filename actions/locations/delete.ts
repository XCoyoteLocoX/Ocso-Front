"use server"
import { API_URL, TOKEN_NAME } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";


export default async function deleteLocation(formData: FormData){
    const locationId = formData.get("deleteValue")
    if (!locationId) return;
    const userCookies = cookies()
    const token = (await userCookies).get(TOKEN_NAME)?.value;
    axios.delete(`${API_URL}/locations/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}