import { UserIcon, EnvelopeOpenIcon, PhoneIcon } from "@heroicons/react/24/outline";

type InvitationFormProps = {
  createAction: (formData: FormData) => void;
}

export default function InvitationFormServer({ createAction }: InvitationFormProps) {


  return (
    <main className="flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
        <p className="text-center text-gray-600 dark:text-gray-400 text-xl mb-6 font-bold">
          Qué simpático es:
        </p>
        <form action={createAction} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              id="nombre"
              name="nombre"
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
              placeholder="Apellidos*"
              className="mt-0 p-2 pl-10 w-full border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </div>

          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
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
              placeholder="Teléfono"
              className="mt-0 p-2 pl-10 w-full border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
            <PhoneIcon className="absolute left-3 inset-y-0 my-auto text-gray-400 dark:text-gray-500" width={18} />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Enviar
          </button>
        </form>
      </div>
    </main>
  );
}
