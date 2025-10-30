import Link from "next/link"; // ✅ CORREGIDO
import { API_URL } from "@/constants";
import { Product } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import FilteredCards from "./_components/FilteredCards";


const ProductsPage = async () => {
  // ✅ Esperar headers correctamente
  const headers = await authHeaders();

  // ✅ Hacer fetch
  const response = await fetch(`${API_URL}/products`, {
    headers,
    next: {
      tags: ["dashboard:products"],
    },
  });

  if (!response.ok) {
    return (
      <p className="text-red-500 text-center mt-10">
        Error al cargar los productos.
      </p>
    );
  }

  const products: Product[] = await response.json();

  return (
    <div className="h-[90vh]">
        <div className="w-6/12">
        </div>
        <FilteredCards products={products}/>
    </div>
  );
};

export default ProductsPage;
