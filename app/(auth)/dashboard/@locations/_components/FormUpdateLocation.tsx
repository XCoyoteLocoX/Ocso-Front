import SelectManager from "./SelectManager";
import { Input, Button } from "@heroui/react";
import { createLocation } from "@/actions/locations/create";
import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { Manager, Location } from "@/entities";
import { updateLocation } from "@/actions/locations/update";

export default async function FormUpdateLocation({store,}: {store: string | string[] | undefined;}) {
  if (!store || store === undefined || typeof store === "object" ) return null;

  // ✅ obtener headers correctamente
  const headers = await authHeaders();

  // ✅ obtener managers
  const updateWithStoreId = updateLocation.bind(null, store)
  const responseManagers = await fetch(`${API_URL}/managers`, {
    headers,
    next: { tags: ["dashboard:managers"] },
  });

  const dataManagers: Manager[] = await responseManagers.json();
  // ✅ obtener locations
  const responseLocation = await fetch(`${API_URL}/locations`, {
    headers,
    next: { tags: ["dashboard:locations"] },
  });

  const dataLocations: Location[] = await responseLocation.json();
  let foundLocation = dataLocations.find((location)=>location.locationId === +store)
  let foundManager = dataManagers.find((manager)=> manager.managerId === foundLocation?.manager?.managerId)
  return (
    <form action={updateWithStoreId} className="bg-orange-400 py-6 px-6 flex flex-col gap-4 w-full rounded-lg">
      <h1 className="text-2xl text-white text-center font-semibold"> Crear tienda </h1>
      <Input defaultValue={foundLocation?.locationName} label="Nombre" placeholder="Ocso Juriquilla" name="locationName" />
      <Input defaultValue={foundLocation?.locationAddress} label="Dirección" placeholder="Av De La Luz" name="locationAddress"/>
      <Input defaultValue={foundLocation?.locationLatLng[0].toString()} label="Latitud" placeholder="120" name="locationLat" />
      <Input defaultValue= {foundLocation?.locationLatLng[1].toString()}label="Longitud" placeholder="20" name="locationLng" />
      <SelectManager defaultManager = {foundManager?.managerId} managers={dataManagers} locations={dataLocations} />
      <Button type="submit" color="primary" className="mt-2"> Actualizar </Button>
    </form>
  );
}
