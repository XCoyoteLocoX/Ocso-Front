import Link from "next/link";
import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import ProviderCard from "./_components/ProviderCard";
import { Provider } from "@/entities";

const ProviderPage = async () => {
  // ✅ Esperar correctamente los headers
  const headers = await authHeaders();

  // ✅ Fix: faltaban los dos puntos ":" después de 'headers'
  const response = await fetch(`${API_URL}/providers`, {
    headers: {
      ...headers,
    },
    next: {
      tags: ["dashboard:providers"],
    },
  });

  if (!response.ok) {
    console.error("Error al obtener los proveedores");
    return <p className="text-red-500">Error al cargar proveedores</p>;
  }

  const providers: Provider[] = await response.json();

  return (
    <div className="w-full flex flex-wrap gap-4 p-10 justify-center">
      {providers.length > 0 ? (
        providers.map((provider: Provider) => (
          <Link
            key={provider.providerId}
            href={`/dashboard/providers/${provider.providerId}`}
            className="hover:scale-105 transition-transform duration-200"
          >
            <ProviderCard provider={provider} />
          </Link>
        ))
      ) : (
        <p className="text-gray-500">No hay proveedores registrados.</p>
      )}
    </div>
  );
};

export default ProviderPage;
