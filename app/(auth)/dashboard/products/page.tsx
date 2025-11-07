import createProduct from "@/actions/products/create";
import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { Button, Input } from "@heroui/react";
import { LuDollarSign } from "react-icons/lu";
import SelectProvider from "./_components/SelectProvider";
import { Provider } from "@/entities";

const ProductsPage = async () => {
  // ✅ Obtener headers correctamente
  const headers = await authHeaders();

  // ✅ Fetch de proveedores con los headers
  const responseProviders = await fetch(`${API_URL}/providers`, {
    headers,
    next: { tags: ["dashboard:providers"] },
  });

  if (!responseProviders.ok) {
    return <p className="text-red-500 text-center mt-10">Error al cargar proveedores.</p>;
  }

  // ✅ Parsear respuesta a JSON
  const providers: Provider[] = await responseProviders.json();

  // ✅ Formulario de creación de producto
  return (
    <form
      className="w-full flex flex-col gap-4 px-40 justify-center"
      action={createProduct}
    >
      <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>

      <Input
        label="Nombre"
        name="productName"
        placeholder="Ej. Agua Mineral"
        isRequired
      />

      <Input
        label="Precio"
        name="productPrice"
        placeholder="0.00"
        type="number"
        endContent={<LuDollarSign size="20" />}
        isRequired
      />

      <Input
        label="No. Sellos"
        name="countSeal"
        type="number"
        placeholder="Ej. 3"
      />

      {/* ✅ Selector dinámico de proveedor */}
      <SelectProvider providers={providers} />

      <Button type="submit" color="primary" className="mt-4">
        Crear Producto
      </Button>
    </form>
  );
};

export default ProductsPage;
