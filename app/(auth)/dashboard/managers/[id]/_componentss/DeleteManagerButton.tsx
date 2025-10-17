"use client";

import deleteManager from "@/actions/managers/delete";
import { LuTrash } from "react-icons/lu";
import { Button } from "@heroui/react";
import { useTransition } from "react";

export default function DeleteManagerButton({
  managerId,
}: {
  managerId: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteManager(managerId);
    });
  };

  return (
    <Button
      color="danger"
      onClick={handleDelete}
      isLoading={isPending}
      disabled={isPending}
      startContent={<LuTrash size={20} />}
    >
      {isPending ? "Eliminando..." : "Eliminar"}
    </Button>
  );
}
