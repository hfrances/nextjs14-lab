import { Person } from "@/app/types/person";
import { UrlObject } from "url";
import { Button, ButtonLink } from "@/app/ui/common";
import DeleteButton from "./DeleteButtonWithModal";
import Avatar from "./Avatar";

interface PersonCardProps {
  revalidatePath: string;
  revalidate: "layout" | "page";
  person: Person;
  actionEdit: string | UrlObject;
  actionDelete?: (person: Person, revalidate?: { originalPath: string, type?: "layout" | "page" }) => Promise<{ success: boolean, error?: any }>;
}

export default function PersonCard({ revalidatePath, revalidate, person, actionEdit, actionDelete }: PersonCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col justify-between items-center space-x-4 sm:flex-row">
      <div className="flex space-x-4">
        {/* Avatar */}
        <Avatar avatarUrl={person.avatarUrl} name={person.name} />
        {/* Text */}
        <div>
          <h2 className="font-semibold text-sm">{person.name}</h2>
          <p className="text-gray-600 text-xs">{person.email}</p>
          <p className="text-gray-600 text-xs">{person.phone || 'Sin teléfono'}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-stretch space-x-2">
        <ButtonLink variant="secondary" href={actionEdit} disabled>
          Editar
        </ButtonLink>
        <DeleteButton person={person} actionDelete={actionDelete} revalidatePath={revalidatePath} revalidate={revalidate} />
        {/*<Button variant="danger" onClick={onDelete}>
          Eliminar
        </Button>*/}
      </div>
    </div>
  );
}