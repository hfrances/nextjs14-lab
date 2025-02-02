"use server"

import { Person } from "@/app/types/person"
import { addUser, deleteUser } from "@/app/lib/services/firebase-admin";
import { stringInitials, stringRemoveAccents } from "@/app/lib/utils/string.utils";
import { revalidatePath } from "next/cache";

type CreatePerson = {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
}
type CreatePersonResult = {
  success: boolean;
  id?: string | undefined;
  error?: any | undefined
}

const addPerson = async (person: CreatePerson, revalidate?: { originalPath: string, type?: "layout" | "page" }): Promise<CreatePersonResult> => {

  if (!person.nombre || !person.email) {
    return { success: false, error: "Revise los campos obligatorios" };
  }
  else {
    const fullname = `${person.nombre} ${person.apellidos}`.trimEnd();

    return await addUser({
      name: fullname,
      name_normalized: stringRemoveAccents(fullname.toLowerCase()),
      email: person.email,
      phone: person.telefono || null,
      entraId: null,
      avatarUrl: `https://api.dicebear.com/9.x/pixel-art-neutral/png?seed=${stringInitials(fullname)}`
    }).then(result => {
      if (result) {
        if (revalidate) {
          revalidatePath(revalidate.originalPath, revalidate.type);
        }
        return { success: true, id: result };
      }
      else {
        return { success: false, error: 'Opps: algo fue mal.' };
      }
    }, error => {
      return { success: false, error: error?.message || error };
    });
  }

}

const editPerson = (person: Person) => {
  throw new Error(`Not implemented exception: ${person.id}`);
}

const deletePerson = async (person: Person, revalidate?: { originalPath: string, type?: "layout" | "page" }): Promise<{ success: boolean, error?: any }> => {

  return deleteUser(person.id)
    .then(() => {
      if (revalidate) {
        console.log(revalidate);
        revalidatePath(revalidate.originalPath, revalidate.type);
      }
      return { success: true };
    }, error => {
      return { success: false, error: error?.message || error };
    });
}

export type { CreatePerson, CreatePersonResult };
export { addPerson, editPerson, deletePerson };