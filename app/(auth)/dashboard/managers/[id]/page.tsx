import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardHeader, CardBody, Divider } from "@heroui/react";
import ManagerCard from "./_componentss/ManagerCard";
import DeleteManagerButton from "./_componentss/DeleteManagerButton";
import UpdateManager from "./_componentss/updateManager";
import FormUpdateManager from "./_componentss/FormUpdateManager";

export default async function ManagerPage({
  params,
}: {
  params: { id: string };
}) {
  // ✅ Obtener headers correctamente
  const headers = await authHeaders();

  // ✅ Llamada a la API
  const response = await fetch(`${API_URL}/managers/${params.id}`, {
    headers,
    next: { tags: [`dashboard:managers:${params.id}`, `dashboard:managers`]},
  });

  // ✅ Manejo de error de red
  if (!response.ok) {
    return (
      <Card className="m-10 p-4 border border-red-500">
        <CardBody>
          <p className="text-red-600 font-semibold">
            Error al obtener los datos del manager.
          </p>
        </CardBody>
      </Card>
    );
  }

  const data: Manager = await response.json();

  return (
    <div className="flex flex-col gap-10 flex-grow-0 items-center justify-center">
      <ManagerCard manager={data}/>
      <div className="bg-gray-50 rounded-md px-10 py-2">
        <UpdateManager>
          <FormUpdateManager manager={data} />
        </UpdateManager>
        <FormUpdateManager manager={data} />
      <DeleteManagerButton managerId={data.managerId}/>
    </div>
    </div>
  );
}
