import InvitationFormServer from "@/app/ui/people/InvitationFormServer";
import { createPersonActionWithRedirect } from "@/app/lib/actions/people-alt";

/**
 * Creación de un nuevo usuario utilizando un componente que es un formulario íntegramente en el lado del servidor. 
 * El submit se hace vía server action y no se puede manejar ningún resultado.
 */
export default async function NewPersonAltPage() {
  return (
    <div className="grid grid-rows items-start justify-around justify-items-center min-h-screen p-8 pb-20 gap-y-6 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-blue-100">
      <div className="grid justify-items-center space-y-3">
        <h1 className="text-3xl font-bold">Añadir simpático</h1>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <InvitationFormServer actionCreate={createPersonActionWithRedirect} />
      </div>
    </div>
  )
}