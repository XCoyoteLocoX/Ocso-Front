"use client";
import { API_URL } from "@/constants";
import { Button, Input, Link } from "@heroui/react";
import axios from "axios";

export default function LoginPage() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const authData = {
      userEmail: formData.get("userEmail"),
      userPassword: formData.get("userPassword"),
    };

    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, authData);
      console.log("✅ JWT recibido:", data.token || data);
    } catch (error: any) {
      console.error("❌ Error en login:", error.response?.data || error.message);
    }
  };

  return (
    <form
      className="bg-orange-500 px-10 py-2 rounded-md"
      onSubmit={handleSubmit}
    >
      <p className="text-2xl my-4">Iniciar Sesión</p>

      <div className="flex flex-col gap-2 my-4 items-center">
        <Input
          label="Email"
          name="userEmail"     
          type="email"
          isRequired={true}
          size="sm"
        />
        <Input
          label="Contraseña"
          name="userPassword" 
          type="password"
          isRequired={true}
          size="sm"
        />
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button color="primary" type="submit">
          Iniciar Sesión
        </Button>
        <p className="text-white">
          ¿No tienes cuenta?
          <Link href="/signup" className="text-red-600 underline">
            {" "}
            Registrarse
          </Link>
        </p>
      </div>
    </form>
  );
}
