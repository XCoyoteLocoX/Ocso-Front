import SelectManager from "./SelectManager";
import { Input, Button } from "@heroui/react";
import { createLocation } from "@/actions/locations/create";
import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { Manager, Location } from "@/entities";

export default async function FormNewLocation({store,}: {store: string | string[] | undefined;}) {
  if (store) return null;

  // ✅ obtener headers correctamente
  const headers = await authHeaders();

  // ✅ obtener managers
  const responseManagers = await fetch(`${API_URL}/managers`, {
    headers,
    next: { tags: ["dashboard:managers"] },
  });

  const dataManagers: Manager[] = await responseManagers.json();
  const responseLocation = await fetch(`${API_URL}/locations`, {
    headers,
    next: { tags: ["dashboard:locations"] },
  });

  const dataLocations: Location[] = await responseLocation.json();
  return (
    <form action={createLocation} className="bg-orange-400 py-6 px-6 flex flex-col gap-4 w-full rounded-lg">
      <h1 className="text-2xl text-white text-center font-semibold"> Crear tienda </h1>
      <Input required={true} label="Nombre" placeholder="Ocso Juriquilla" name="locationName" />
      <Input required={true} label="Dirección" placeholder="Av De La Luz" name="locationAddress"/>
      <Input required={true} label="Latitud" placeholder="120" name="locationLat" />
      <Input required={true} label="Longitud" placeholder="20" name="locationLng" />
      <SelectManager managers={dataManagers} locations={dataLocations} />
      <Button type="submit" color="primary" className="mt-2"> Subir</Button>
    </form>
  );
}
