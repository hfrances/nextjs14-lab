"use server"

import { addUser, deleteUser } from "@/app/lib/services/firebase-admin";
import { stringInitials, stringRemoveAccents } from "@/app/lib/utils/string.utils";
import { SubmitWithAction } from "@/app/lib/utils/actions.utils";
import { Person } from "@/app/types/person";

const addPerson = async (formData: FormData): Promise<string> => {
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

const deletePerson = async (person?: Person): Promise<{ success: boolean, error?: any }> => {

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

const addPersonWithRedirect = SubmitWithAction(addPerson, "redirect", "/people", "page");
const deletePersonWithRevalidate = SubmitWithAction(deletePerson, "revalidate", "/people", "page");

export { addPersonWithRedirect, deletePersonWithRevalidate }