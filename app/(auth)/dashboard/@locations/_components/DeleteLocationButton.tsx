import deleteLocation from "@/actions/locations/delete";
import { Button } from "@heroui/react";
import { LuTrash } from "react-icons/lu";

export default function DeleteLocationButton({
  store,
}: {
  store: string | string[] | undefined;
}) {
  if (!store) return null;

  // ✅ Convertir a string seguro
  const storeValue = Array.isArray(store) ? store[0] : store;

  return (
    <form action={deleteLocation} className="my-4">
      <Button type="submit" name="deleteValue" value={storeValue} color="danger"> 
        <LuTrash size="20"/>
        Borrar Tienda
      </Button>
    </form>
  );
}
