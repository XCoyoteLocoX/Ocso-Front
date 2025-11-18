import { Employee } from "@/entities";
import { Button, Card, CardFooter, CardHeader, Divider, Image } from "@heroui/react";
import Link from "next/link";

export default function EmployeeCard({ employee }: { employee: Employee }) {

  // Fallback si no tiene foto
  const photo =
    employee.employeePhoto && employee.employeePhoto.trim() !== ""
      ? employee.employeePhoto
      : "/images/default-user.png"; // puedes cambiar esta ruta

  return (
    <Card className="max-h-72 relative" isFooterBlurred>
      <CardHeader className="absolute top-0 bg-black bg-opacity-25 z-10">
        <h1 className="font-bold text-xl text-white drop-shadow-sm">
          {employee.employeeName} {employee.employeeLastName}
        </h1>
      </CardHeader>

      <Divider />

      <Image
        src={photo}
        alt={`Foto de ${employee.employeeName}`}
        className="z-0"
        classNames={{
          img: "size-72 object-cover w-full",
        }}
        radius="none"
      />

      <CardFooter className="absolute bottom-0 py-2 h-10">
        <Link href={`/dashboard/employees/${employee.employeeId}`}>
          <Button variant="ghost">Actualizar datos</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
