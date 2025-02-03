"use client";

import { Person } from "@/app/types/person";
import { Button } from "@/app/ui/common";

type DeleteButtonProps = {
  revalidatePath: string;
  revalidate: "layout" | "page";
  person: Person,
  actionDelete?: (person: Person, revalidate?: { originalPath: string, type?: "layout" | "page" }) => Promise<{ success: boolean, error?: any }>;
}

/**
 * Un React Component que extiende la funcionalidad del componente `Button` para eliminar un elemento.
 * 
 * Se renderiza en el lado del **cliente**.
 */
const DeleteButton = ({ revalidatePath, revalidate, person, actionDelete }: DeleteButtonProps) => {

  const handleButton = () => {
    if (actionDelete) {
      actionDelete(person, { originalPath: revalidatePath, type: revalidate })
    }
  }

  return (
    <Button variant="danger" onClick={handleButton} disabled={!actionDelete}>
      Eliminar
    </Button>
  )
}

export { DeleteButton };
export default DeleteButton;