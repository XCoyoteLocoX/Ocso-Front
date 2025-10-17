import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";

export default async function LoadingCountManagersPage() {
  // ✅ Esperar los headers correctamente
  const headers = await authHeaders();

  const response = await fetch(`${API_URL}/managers`, {
    headers,
    next: {
      tags: ["dashboard:managers"],
    },
  });

  // ✅ Manejo de error HTTP
  if (!response.ok) {
    return (
      <div className="font-bold text-red-500">
        Error al obtener la lista de managers.
      </div>
    );
  }

  const managers: Manager[] = await response.json();

  // ✅ Contar managers sin tienda (sin location)
  const countNoStore = managers.filter((manager) => !manager.location).length;

  // ✅ Calcular salario máximo
  let salary = 0; 
  const maxSalary =
    managers.length > 0
      ? Math.max(...managers.map((m) => m.managerSalary || 0))
      : 0;

  return (
    <div className=" w-fit px-2 py-4 text-center">
      <h1>
        Hay {managers.length} manager{managers.length !== 1 ? "s" : ""}
      </h1>
      <h1>Hay {countNoStore} sin tienda</h1>
      <h1>El salario máximo es {maxSalary}</h1>
      <h1> El salario promedio es {(salary/managers.length)} </h1>
    </div>
  );
}
