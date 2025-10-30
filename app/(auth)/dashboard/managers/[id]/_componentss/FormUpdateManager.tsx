import { Manager } from "@/entities";
import { Button, Input } from "@heroui/react";
import updateManager from "@/actions/managers/update";
import SelectStore from "./SelectStore";
import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";

export default async function FormUpdateManager({ manager }: { manager: Manager }) {
  // ✅ Server Action con ID ya enlazado
  const updateManagerWithId = async (formData: FormData) => {
    "use server";
    await updateManager(manager.managerId, formData);
  };

  // ✅ authHeaders probablemente devuelve una promesa
  const headers = await authHeaders();

  const responseStores = await fetch(`${API_URL}/locations`, {
    headers,
    cache: "no-store", // evita datos viejos
  });
  const stores = await responseStores.json();

  return (
    <form
      action={updateManagerWithId}
      className="bg-orange-400 rounded-md flex flex-col flex-grow-0 gap-2"
    >
      <h1 className="text-2xl text-white font-semibold text-center">
        Actualizar Manager
      </h1>

      <Input
      required={true}
      isRequired
        defaultValue={manager.managerFullName}
        placeholder="Marco Aurelio"
        label="Nombre completo"
        name="managerFullName"
      />

      <Input
      required={true}
      isRequired
        defaultValue={manager.managerEmail}
        placeholder="manager@ocso.com"
        label="Correo electrónico"
        name="managerEmail"
      />

      <Input
      required={true}
      isRequired
        defaultValue={String(manager.managerSalary)}
        placeholder="12000"
        label="Salario"
        name="managerSalary"
        type="number"
      />

      <Input
      required={true}
      isRequired
        defaultValue={manager.managerPhoneNumber}
        placeholder="4423134589"
        label="Teléfono"
        name="managerPhoneNumber"
      />

      <SelectStore
        stores={stores}
        defaultStore={manager?.location?.locationId}
      />

      <Button color="primary" type="submit">
        Actualizar
      </Button>
    </form>
  );
}
