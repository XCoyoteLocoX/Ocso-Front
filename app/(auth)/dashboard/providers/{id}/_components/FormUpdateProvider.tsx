"use client";

import { Input, Button } from "@heroui/react";
import { Provider } from "@/entities";
import updateProvider from "@/actions/providers/update";
import DeleteProviderButton from "./DeleteButton";
import DeleteProvider from "../DeleteProvider";

export default function FormUpdateProvider({ provider }: { provider: Provider }) {
  // ✅ Vinculamos la acción de actualización con el ID del proveedor
  const updateProviderWithId = updateProvider.bind(null, provider.providerId);

  return (
    <form
      action={updateProviderWithId}
      className="flex flex-wrap gap-4 bg-orange-200 rounded-md px-10 py-10 ml-10 items-center justify-center"
    >
      <Input
        className="max-w-[250px]"
        defaultValue={provider.providerName}
        label="Nombre"
        placeholder="Pecsi"
        name="providerName"
        isRequired
      />
      <Input
        className="max-w-[250px]"
        defaultValue={provider.providerEmail}
        label="Correo"
        placeholder="business@pecsi.com"
        name="providerEmail"
        isRequired
      />
      <Input
        className="max-w-[250px]"
        defaultValue={provider.providerPhoneNumber}
        label="Número"
        placeholder="444XXXXXXX"
        name="providerPhoneNumber"
        isRequired
      />

      <Button color="primary" type="submit">
        Actualizar Proveedor
      </Button>

      {/* ✅ Confirmación y eliminación */}
      <DeleteProvider>
        <h1 className="text-white text-4xl text-center">
          ¿Estás seguro de eliminar al proveedor {provider.providerName}?
        </h1>
        <DeleteProviderButton providerId={provider.providerId} />
      </DeleteProvider>
    </form>
  );
}
