"use server"

import { Person } from "@/app/types/person"
import { addUser, deleteUser } from "@/app/lib/services/firebase-admin";
import { stringInitials, stringRemoveAccents } from "@/app/lib/utils/string.utils";
import { revalidatePath } from "next/cache";

/* 
 * Contiene acciones para '/people/new'.
 * Las acciones se hacen en el lado del servidor mediante server actions, pero se lanzan desde componentes de cliente propios.
 * Se pueden personalizar los objetos que se mandan a las funciones y sus valores de retorno.
 * Se pueden manejar las respuestas en el lado del cliente.
 */

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

type CreatePersonDelegate = (person: CreatePerson, revalidate?: { originalPath: string, type?: "layout" | "page" }) => Promise<CreatePersonResult>;
const createPersonAction: CreatePersonDelegate = async (person, revalidate) => {

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

type EditPersonDelegate = (person: Person) => Promise<{ success: boolean, error?: any }>;
const editPersonAction: EditPersonDelegate = (person) => {
  throw new Error(`Not implemented exception: ${person.id}`);
}

type DeletePersonDelegate = (person: Person, revalidate?: { originalPath: string, type?: "layout" | "page" }) => Promise<{ success: boolean, error?: any }>;
const deletePersonAction: DeletePersonDelegate = async (person, revalidate) => {

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

export type { CreatePerson, CreatePersonDelegate, CreatePersonResult, EditPersonDelegate, DeletePersonDelegate };
export { createPersonAction, editPersonAction, deletePersonAction };
