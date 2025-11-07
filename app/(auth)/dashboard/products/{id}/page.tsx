import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import ProductCard from "../_components/ProductCard";
import UpdateProduct from "./_components/UpdateProduct";
import { Product, Provider } from "@/entities";
import DeleteProduct from "./_components/DeleteProduct";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  // ✅ Obtener headers
  const headers = await authHeaders();

  // ✅ Fetch del producto
  const responseProduct = await fetch(`${API_URL}/products/${params.id}`, {
    headers,
    next: { tags: ["dashboard:products"] },
  });

  if (!responseProduct.ok) {
    return (
      <p className="text-red-500 text-center mt-10">
        Error al cargar el producto.
      </p>
    );
  }

  const product: Product = await responseProduct.json();

  // ✅ Fetch de los proveedores
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
    <div className="flex flex-col gap-10 p-10">
      <ProductCard product={product} />

      <div className="max-w-md">
        <h1>{product.productName}</h1>
        <h1>{product.price}</h1>
        <h1>{product.countSeal}</h1>

        <UpdateProduct product={product} providers={providers} /> {/* ✅ ahora correcto */}
        <DeleteProduct productId={product.productId} />
      </div>
    </div>
  );
}
