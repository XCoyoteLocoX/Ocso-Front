"use client";

import { Input, Button } from "@heroui/react";
import { Product, Provider } from "@/entities";
import updateProduct from "@/actions/products/update";
import SelectProvider from "../../_components/SelectProvider";
import DeleteProduct from "./DeleteProduct";

export default function UpdateProduct({
  product,
  providers,
}: {
  product: Product;
  providers: Provider[];
}) {
  const updateProductById = updateProduct.bind(null, product.productId);

  return (
    <form
      action={updateProductById}
      className="flex flex-col gap-4 bg-orange-100 p-4 rounded-lg"
    >
      <Input
        name="productName"
        label="Nombre"
        defaultValue={product.productName}
        isRequired
      />
      <Input
        name="countSeal"
        label="No. Sellos"
        defaultValue={String(product.countSeal)}
        isRequired
      />
      <Input
        name="price"
        label="Precio"
        defaultValue={String(product.price)}
        isRequired
      />

      <SelectProvider
        providers={providers}
        selectedProviderId={product.provider.providerId}
      />

      <Button type="submit" color="primary">
        Guardar Cambios
      </Button>
    </form>
  );
}
