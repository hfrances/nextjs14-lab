import { Person } from "@/app/types/person";
import PersonCard from "./PersonCard";
import { UrlObject } from "url";

type PeopleTableProps = {
  revalidatePath: string;
  revalidate: "layout" | "page";
  query: string | undefined;
  page: number;
  actionLoad: (query: string | undefined, page: number) => Promise<Person[]>;
  actionEdit: (person: Person) => string | UrlObject;
  actionDelete: (person: Person, revalidate?: { originalPath: string, type?: "layout" | "page" }) => Promise<{ success: boolean, error?: any }>;
  delay?:number
}

const PeopleTable = async ({ revalidatePath, revalidate, query, page, actionLoad, actionEdit, actionDelete, delay= 1000 }: PeopleTableProps) => {
  //const peopleList = await actionLoad(query, page);
  const peopleList = await new Promise<Person[]>(resolve => setTimeout(() => actionLoad(query, page).then(resolve), delay))

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