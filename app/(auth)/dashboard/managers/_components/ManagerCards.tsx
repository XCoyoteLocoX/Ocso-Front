import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import Link from "next/link";

export default async function ManagerCards() {
  // ✅ Esperar headers correctamente
  const headers = await authHeaders();

  // ✅ Hacer fetch correctamente
  const response = await fetch(`${API_URL}/employees/managers`, {
    method: "GET",
    headers,
    next: {
      tags: ["dashboard:managers"],
    },
  });

  // ✅ Manejo de errores
  if (!response.ok) {
    return (
      <Card className="m-10 p-4 border border-red-500">
        <CardBody>
          <p className="text-red-600 font-semibold">
            Error al obtener la lista de managers.
          </p>
        </CardBody>
      </Card>
    );
  }

  const data: Manager[] = await response.json();

  // ✅ Mostrar los datos
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-10">
      {data.map((manager: Manager) => (
        <Link
          key={manager.managerId}
          href={`/dashboard/managers/${manager.managerId}`}
          className="hover:scale-[1.02] transition-transform"
        >
          <Card className="p-4 shadow-md cursor-pointer">
            <CardHeader>
              <h3 className="text-lg font-bold">{manager.managerFullName}</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <div></div>
              <p>
                Email: <b>{manager.managerEmail}</b>
              </p>
              <p>
                Teléfono: <b>{manager.managerPhoneNumber}</b>
              </p>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
}
