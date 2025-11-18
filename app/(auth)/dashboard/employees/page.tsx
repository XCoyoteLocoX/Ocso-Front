import { API_URL } from "@/constants";
import { Employee } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import EmployeeCard from "./_components/EmployeeCard";

const EmployeesPage = async () => {
  // ✅ Esperar los headers (porque authHeaders es async)
  const headers = await authHeaders();

  // ✅ Hacer el fetch con los headers correctos
  const response = await fetch(`${API_URL}/employees`, {
    headers,
    next: { tags: ["dashboard:employees"] }, // opcional: si usas revalidación
  });

  if (!response.ok) {
    return <p className="text-red-500 text-center mt-10">Error al cargar empleados.</p>;
  }

  const employees: Employee[] = await response.json();

return (
  <div className="flex flex-wrap flex-grow-0 h-[90vh] gap-4 overflow-y-auto p-10">
    {employees.map((employee: Employee) => {
      if (employee.employeePhoto !== "") {
        return <EmployeeCard key={employee.employeeId} employee={employee} />;
      } else {
        return <EmployeeCard key={employee.employeeId} employee={employee} />;
      }
    })}
  </div>
);

};

export default EmployeesPage;
