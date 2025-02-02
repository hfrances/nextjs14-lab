import { Person } from "@/app/types/person";
import { stringStartsWithCIAI } from "@/app/lib/utils/string.utils";
import data from './user-data.json';

export async function getUsers(query: string | undefined): Promise<Person[]> {
  return Promise.resolve(data as Person[])
    .then(data => data.filter(person => !query || stringStartsWithCIAI(person.name, query)));
}
