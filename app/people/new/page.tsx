import InvitationForm from "@/app/ui/people/InvitationForm";
import { addPerson } from "@/app/lib/actions/people";

export default async function NewPersonPage() {
  return (
    <div className="grid grid-rows items-start justify-around justify-items-center min-h-screen p-8 pb-20 gap-y-6 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-blue-100">
      <div className="grid justify-items-center space-y-3">
        <h1 className="text-3xl font-bold">Añadir simpático</h1>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <InvitationForm redirectPath="/people" revalidate="page" createAction={addPerson} />
      </div>
    </div>
  )
}