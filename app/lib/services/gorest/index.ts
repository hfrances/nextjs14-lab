import { Person } from "@/app/types/person";
import { stringInitials, stringStartsWithCIAI } from "@/app/lib/utils/string.utils";

export async function getUsers(query: string | undefined): Promise<Person[]> {
  return await fetch('https://gorest.co.in/public/v2/users')
    .then(async result => await result.json())
    .then((data: Person[]) => data.map(person => ({
      ...person,
      avatarUrl: `https://api.dicebear.com/9.x/pixel-art-neutral/png?seed=${stringInitials(person.name)}`
    })))
    .then((data: Person[]) => {
      console.log("Done");
      return data.filter(person => !query || stringStartsWithCIAI(person.name, query));
    });
}
