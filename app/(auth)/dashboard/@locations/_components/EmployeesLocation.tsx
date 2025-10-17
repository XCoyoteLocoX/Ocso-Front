import { API_URL } from "@/constants";
import { Employee } from "@/entities";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { authHeaders } from "@/helpers/authHeaders";

export default async function EmployeesLocation({
  store,
}: {
  store: string | string[] | undefined;
}) {
  if (!store) return "No hay empleados";

  // ✅ Esperar correctamente a los headers
  const headers = await authHeaders();

  const response = await fetch(`${API_URL}/employees/location/${store}`, {
    method: "GET",
    headers,
    next: {
      tags: ["dashboard:locations:employees"], // ✅ Para revalidar automáticamente
    },
  });

  // ✅ Manejo de errores HTTP
  if (!response.ok) {
    console.error("Error al obtener empleados:", response.status);
    return <p>Error al cargar los empleados</p>;
  }

  const data: Employee[] = await response.json();

  // ✅ Renderizar empleados si existen
  if (!data || data.length === 0) {
    return <p className="text-center mt-10">No hay empleados en esta tienda.</p>;
  }

  return (
    <>
      {data.map((employee: Employee) => {
        const fullName = `${employee.employeeName} ${employee.employeeLastName}`;

        return (
          <Card key={employee.employeeId} className="mx-10 my-10">
            <CardHeader>
              <p className="w-full">
                Nombre: <b>{fullName}</b>
              </p>
            </CardHeader>
            <Divider />
            <CardBody>
              <p className="w-full">
                Email: <b>{employee.employeeEmail}</b>
              </p>
              <p className="w-full">
                Teléfono: <b>{employee.employeePhoneNumber}</b>
              </p>
            </CardBody>
          </Card>
        );
      })}
    </>
  );
}
