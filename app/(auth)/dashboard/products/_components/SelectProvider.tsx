"use client";

import { Select, SelectItem } from "@heroui/react";
import { Provider } from "@/entities"; // ✅ CORREGIDO

export default function SelectProvider({
  providers,
  selectedProviderId,
  onChange,
}: {
  providers: Provider[];
  selectedProviderId?: string;
  onChange?: (id: string) => void;
}) {
  return (
    <Select
      name="providerId"
      label="Proveedor"
      placeholder="Selecciona un proveedor"
      selectedKeys={selectedProviderId ? [selectedProviderId] : []}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0] as string;
        onChange?.(selected);
      }}
    >
      {providers.map((provider) => (
        <SelectItem key={provider.providerId}>
          {provider.providerName}
        </SelectItem>
      ))}
    </Select>
  );
}
