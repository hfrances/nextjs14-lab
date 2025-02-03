"use server"

import { addUser, deleteUser } from "@/app/lib/services/firebase-admin";
import { stringInitials, stringRemoveAccents } from "@/app/lib/utils/string.utils";
import { SubmitWithAction } from "@/app/lib/utils/actions.utils";
import { Person } from "@/app/types/person";

/* 
 * Contiene acciones para '/people/new-alt'.
 * Las acciones se hacen en el lado del servidor mediante server actions, pero los componentes de cliente son genéricos.
 * Las firmas de los métodos se supeditan a las que necesiten los componentes cliente.
 * No se pueden manejar las respuestas.
 */

type CreatePersonDelegate = (formData: FormData) => void;
const createPersonAction : CreatePersonDelegate = async (formData)=> {
  const nombre = formData.get("nombre") as string | null;
  const apellidos = formData.get("apellidos") as string | null;
  const email = formData.get("email") as string | null;
  const phone = formData.get("telefono") as string | null;

  if (!nombre || !email) {
    throw new Error("Revise los campos obligatorios.");
  }
  else {
    const fullname = `${nombre} ${apellidos}`.trimEnd();

    return addUser({
      name: fullname,
      name_normalized: stringRemoveAccents(fullname.toLowerCase()),
      email,
      phone,
      entraId: null,
      avatarUrl: `https://api.dicebear.com/9.x/pixel-art-neutral/png?seed=${stringInitials(fullname)}`
    }).then(result => {
      if (result) {
        return result;
      }
      else {
        throw new Error("Oops: algo fue mal.");
      }
    }, error => {
      throw error;
    });
  }
}

type DeletePersonDelegate = (person?: Person) => Promise<{ success: boolean, error?: any }>;
const deletePersonAction : DeletePersonDelegate = async (person) => {

  if (person) {
    return deleteUser(person.id)
      .then(() => {
        return { success: true };
      }, error => {
        return { success: false, error: error?.message || error };
      });
  }
  else {
    throw new Error("Unknown object: Person");
  }
}

const createPersonActionWithRedirect = SubmitWithAction(createPersonAction, "redirect", "/people", "page");
const deletePersonActionWithRevalidate = SubmitWithAction(deletePersonAction, "revalidate", "/people", "page");

export type { CreatePersonDelegate, DeletePersonDelegate }
export { createPersonActionWithRedirect, deletePersonActionWithRevalidate }
