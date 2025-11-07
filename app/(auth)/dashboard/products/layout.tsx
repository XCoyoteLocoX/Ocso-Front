import Link from "next/link";
import { API_URL } from "@/constants";
import { Product, Provider } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import FilteredCards from "./_components/FilteredCards";
import { ReactNode } from "react";

const LayoutProducts = async ({ children }: { children: ReactNode }) => {
  // ✅ Obtener headers correctamente
  const headers = await authHeaders();

  // ✅ Fetch de productos
  const responseProducts = await fetch(`${API_URL}/products`, {
    headers,
    next: { tags: ["dashboard:products"] },
  });

  if (!responseProducts.ok) {
    return (
      <p className="text-red-500 text-center mt-10">
        Error al cargar los productos.
      </p>
    );
  }

  const products: Product[] = await responseProducts.json();

  // ✅ Fetch de proveedores
  const responseProviders = await fetch(`${API_URL}/providers`, {
    headers,
    next: { tags: ["dashboard:providers"] },
  });

  if (!responseProviders.ok) {
    return (
      <p className="text-red-500 text-center mt-10">
        Error al cargar los proveedores.
      </p>
    );
  }

  const providers: Provider[] = await responseProviders.json();

  // ✅ Render final
  return (
    <div className="h-[90vh] w-full flex">
      {/* Lado izquierdo: lista filtrada */}
      <div className="w-6/12 border-r-2 border-orange-400">
        <FilteredCards products={products} providers={providers} />
      </div>

      {/* Lado derecho: contenido dinámico */}
      <div className="w-6/12 overflow-y-auto">{children}</div>
    </div>
  );
};

export default LayoutProducts;
