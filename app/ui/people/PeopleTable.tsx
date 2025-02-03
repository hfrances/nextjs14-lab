import { Person } from "@/app/types/person";
import PersonCard from "./PersonCard";
import { UrlObject } from "url";
import { DeletePersonDelegate } from "@/app/lib/actions/people";

type PeopleTableProps = {
  revalidatePath: string;
  revalidate: "layout" | "page";
  query: string | undefined;
  page: number;
  serviceLoad: (query: string | undefined, page: number) => Promise<Person[]>;
  actionEdit: (person: Person) => string | UrlObject;
  actionDelete: DeletePersonDelegate;
  delay?: number
}

/**
 * Un React Component que carga y muestra una lista de `Person`.
 * 
 * Se renderiza en el lado del **servidor**.
 */
const PeopleTable = async ({ revalidatePath, revalidate, query, page, serviceLoad, actionEdit, actionDelete, delay = 1000 }: PeopleTableProps) => {
  const peopleList = await new Promise<Person[]>(resolve => setTimeout(() => serviceLoad(query, page).then(resolve), delay))

  return (
    <>
      {peopleList.map((person) => (
        <PersonCard
          revalidatePath={revalidatePath}
          revalidate={revalidate}
          key={person.id}
          person={person}
          actionEdit={actionEdit(person)}
          actionDelete={actionDelete}
        />
      ))}
    </>
  )
}

export { PeopleTable };
export default PeopleTable;