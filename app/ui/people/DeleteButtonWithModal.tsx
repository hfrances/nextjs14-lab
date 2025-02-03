"use client";

import { useState } from "react";
import { Person } from "@/app/types/person";
import { Button } from "@/app/ui/common";
import { DeletePersonDelegate } from "@/app/lib/actions/people";

type DeleteButtonProps = {
  revalidatePath: string;
  revalidate: "layout" | "page";
  person: Person,
  actionDelete?: DeletePersonDelegate;
}

/**
 * Un React Component que extiende la funcionalidad del componente `Button` para eliminar un elemento desde el lado del cliente.
 * 
 * Incluye una ventana modal de confirmación antes del borrado.
 * 
 * Se renderiza en el lado del **cliente**.
 */
const DeleteButtonWithModal = ({ revalidatePath, revalidate, person, actionDelete }: DeleteButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    if (actionDelete) {
      actionDelete(person, {originalPath: revalidatePath, type: revalidate});
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleButton = () => {
    setIsModalOpen(true);
  }

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-80 relative">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">¿Estás seguro?</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">¿Esta persona ya no es simpática?</p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={handleCancel}
              >
                Era broma
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                onClick={handleConfirm}
              >
                A pastar 🐏🐐
              </button>
            </div>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={handleCancel}
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <Button variant="danger" onClick={handleButton} disabled={!actionDelete}>
        Eliminar
      </Button>
    </>
  )
}

export { DeleteButtonWithModal };
export default DeleteButtonWithModal;