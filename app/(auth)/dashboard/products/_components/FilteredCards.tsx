"use client";

import { Input, Select, SelectItem } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product, Provider } from "@/entities";
import ProductCard from "./ProductCard";

export default function FilteredCards({
  products,
  providers,
}: {
  products: Product[];
  providers: Provider[];
}) {
  const [filtered, setFiltered] = useState("");
  const [provider, setProvider] = useState("");
  const [productsList, setProductsList] = useState<Product[]>(products);
  const [show, setShow] = useState(false);

  // ✅ Filtrar productos
  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const matchesName = product.productName
        .toLowerCase()
        .includes(filtered.toLowerCase());

      const matchesProvider = provider
        ? String(product.provider.providerId) === provider
        : true;

      return matchesName && matchesProvider;
    });

    setShow(true);
    setProductsList(filteredProducts);
  }, [filtered, provider, products]);

  return (
    <div className="max-h-[90vh] min-h-[90vh] overflow-y-auto flex flex-col gap-8 border-r-orange-400 border-r-2 pt-10 px-10">
      {/* ✅ Selector de proveedor */}
      <Select
        label="Proveedor"
        placeholder="Selecciona un proveedor"
        selectedKeys={provider ? [provider] : []}
        onSelectionChange={(keys) => {
          const selected = Array.from(keys)[0] as string;
          setProvider(selected || "");
        }}
      >
        {providers.map((prov) => (
          <SelectItem key={String(prov.providerId)}>
            {prov.providerName}
          </SelectItem>
        ))}
      </Select>

      {/* ✅ Filtro por nombre */}
      <Input
        autoFocus
        label="Nombre del producto"
        placeholder="Buscar producto..."
        onChange={(e) => setFiltered(e.target.value)}
        value={filtered}
      />

      {/* ✅ Renderizado de productos filtrados */}
      <div className="flex flex-col gap-4">
        {productsList.length > 0 ? (
          show &&
          productsList.map((product) => (
            <Link
              className="hover:scale-110 transition-transform"
              key={product.productId}
              href={`/dashboard/products/${product.productId}`}
            >
              <ProductCard product={product} />
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No se encontraron productos.
          </p>
        )}
      </div>
    </div>
  );
}
