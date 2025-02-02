import { Suspense } from "react";
import { Button, ButtonLink, Search } from "@/app/ui/common";
import { PlusIcon } from "@heroicons/react/24/outline";
import { deletePerson } from "@/app/lib/actions/people";
import { deletePersonWithRevalidate } from "@/app/lib/actions/people-alt";
import Avatar from "@/app/ui/people/Avatar";
import PeopleTable from "@/app/ui/people/PeopleTable";
import PeopleTableSkeleton from "@/app/ui/people/PeopleTableSkeleton";
import { getUsers } from "@/app/lib/services/firebase-admin";
//import DeleteButton from "../components/people/DeleteButton";
//import DeleteButton from "../components/people/DeleteButtonWithModal";
//import { getUsers } from "@/app/lib/services/gorest";

export default async function PeoplePage({ searchParams: { query, page } }: { searchParams: { query: string | undefined, page: string | undefined } }) {
  const peopleList = await getUsers(query);

  return (
    <div className="w-full font-[family-name:var(--font-geist-sans)] p-8">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Gente simpática</h1>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 md:mt-4">
        <Search searchParam="query" placeholder="Buscar personas..." autoFocus />
        <ButtonLink href="/people/new" className="flex bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline-blue-600">
          <span className="hidden md:block mr-2">Añadir simpático</span><PlusIcon className="h-5" />
        </ButtonLink>
      </div>

      <div className="mt-6 flow-root lg:grid md:grid-cols-[1fr_auto_1fr] gap-4 space-y-5 lg:space-y-0 justify-center">
        {/* People rendered in component */}
        <div className="flex flex-col items-stretch justify-start gap-4">
          <span className="text-2xl font-bold">Component</span>
          <Suspense
            key={`${query}-${page}`}
            fallback={<PeopleTableSkeleton />}
          >
            <PeopleTable
              revalidatePath="/people"
              revalidate="page"
              query={query}
              page={Number(page)}
              actionLoad={getUsers}
              actionEdit={person => `/people/edit/${person.id}`}
              actionDelete={deletePerson}
              delay={1000}
            />
          </Suspense>
        </div>

        {/* Separator */}
        <div className="col-span-1 border border-blue-700"></div>

        {/* People rendered in page */}
        <div className="flex flex-col items-stretch justify-start gap-4">
          <span className="text-2xl font-bold">Page</span>
          {peopleList.map((person) => (
            <div key={person.id} className="bg-white p-4 rounded-lg shadow flex flex-col justify-between items-center space-x-4 sm:flex-row">
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
                <ButtonLink variant="secondary" href={`/people/edit/${person.id}`} disabled>
                  Editar
                </ButtonLink>
                {/*<DeleteButton person={person} actionDelete={deletePerson} revalidate="page" revalidatePath="/people" />*/}
                <Button data={person} variant="danger" data-info={person.id} onAction={deletePersonWithRevalidate}>
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}