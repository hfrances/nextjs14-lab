"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { UserIcon, EnvelopeOpenIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { CreatePersonDelegate } from "@/app/lib/actions/people";

type InvitationFormProps = {
  redirectPath: string;
  revalidate: "none" | "layout" | "page";
  actionCreate: CreatePersonDelegate;
}

/**
 * Un formulario que se ejecuta desde el lado del cliente.
 * 
 * Realiza algunas comprobaciones y transformación de datos antes de la llamada a `actionCreate` 
 * y algunas acciones de control sobre la respuesta después.
 * 
 * Se renderiza en el lado del **cliente**.
 */
export default function InvitationForm({ redirectPath, revalidate, actionCreate }: InvitationFormProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
  });
  const router = useRouter();

  const isFormValid =
    formData.nombre &&
    formData.email;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormValid) {
      const { nombre, email } = formData;

      if (!nombre || !email) {
        toast.error('Rellene todos los campos obligatorios');
        return;
      }

      const result = await actionCreate(
        formData,
        revalidate != "none" ? {
          originalPath: redirectPath, type: revalidate
        } : undefined
      );

      if (result.success) {
        toast.success(`Invitación enviada con éxito: ${result.id}`);
        router.push(redirectPath);
      } else {
        toast.error(`Error al enviar la invitación: ${result.error ?? '<unknown>'}`);
      }

    }
  };

  return (
    <main className="flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
        <p className="text-center text-gray-600 dark:text-gray-400 text-xl mb-6 font-bold">
          Qué simpático es:
        </p>
        <p className="text-center text-gray-600 dark:text-gray-400 text-basic mb-6 font-bold">
          (form en cliente)
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Nombre*"
              className="mt-0 p-2 pl-10 w-full border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
            <UserIcon className="absolute left-3  inset-y-0 my-auto text-gray-400 dark:text-gray-500" width={18} />
          </div>

          <div className="relative">
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              placeholder="Apellidos"
              className="mt-0 p-2 pl-10 w-full border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </div>

          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Correo Electrónico*"
              className="mt-0 p-2 pl-10 w-full border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
            <EnvelopeOpenIcon className="absolute left-3 inset-y-0 my-auto text-gray-400 dark:text-gray-500" width={18} />
          </div>

          <div className="relative">
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Teléfono"
              className="mt-0 p-2 pl-10 w-full border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
            <PhoneIcon className="absolute left-3 inset-y-0 my-auto text-gray-400 dark:text-gray-500" width={18} />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!isFormValid}
          >
            Enviar
          </button>
        </form>
      </div>
    </main>
  );
}
