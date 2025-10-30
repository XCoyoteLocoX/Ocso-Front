import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import ProviderCard from "../_components/ProviderCard";
import { Provider, Product } from "@/entities"; // ✅ Importar ambos tipos
import ProductCard from "./_components/ProductCard";
import FormUpdateProvider from "./_components/FormUpdateProvider";

export default async function ProviderPage({
  params,
}: {
  params: { id: string };
}) {
  // ✅ Esperar los headers (authHeaders es async)
  const headers = await authHeaders();

  // ✅ Fetch del proveedor
  const response = await fetch(`${API_URL}/providers/${params.id}`, {
    headers,
    next: {
      tags: [`dashboard:providers`, `dashboard:providers:${params.id}`],
    },
  });

  if (!response.ok) {
    return (
      <p className="text-red-500 font-semibold p-4">
        Error al cargar la información del proveedor.
      </p>
    );
  }

  const provider: Provider = await response.json();

  return (
    <div className="flex flex-grow-0 flex-col pl-10 gap-10 h-[90vh] pt-10">
      {/* ✅ Tarjeta del proveedor */}
      <ProviderCard provider={provider} />
      <FormUpdateProvider provider={provider}/>
      <div className="h-1 bg-black w-[90vw]" />

      {/* ✅ Lista de productos del proveedor */}
      <div className="flex flex-wrap gap-6">
        {provider.products && provider.products.length > 0 ? (
          provider.products.map((product: Product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <p className="text-gray-500">Este proveedor no tiene productos registrados.</p>
        )}
      </div>
    </div>
  );
}
