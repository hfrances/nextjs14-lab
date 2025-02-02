import { Person } from '@/app/types/person';
import { db } from './database';
import { stringRemoveAccents } from '@/app/lib/utils/string.utils';

const COLLECTION_USERS = 'users';
const collection = db.collection(COLLECTION_USERS);

function like(collection: FirebaseFirestore.Query, field: string | undefined, value: string | undefined): FirebaseFirestore.Query {
  let query = collection;

  if (field && value) {
    const value_normalized = stringRemoveAccents(value.toLowerCase());
    console.log(value_normalized);
    query = query.orderBy(field).startAt(value_normalized).endAt(value_normalized + '\uf8ff');
  }
  return query;
}

export async function getUsers(queryString: string | undefined): Promise<Person[]> {
  const query = like(collection, "name_normalized", queryString);
  const snapshot = await query.get();

  return snapshot.docs.map(doc => {
    const data = doc.data();
    const { createdAt, ...dataAux } = data as Person & { createdAt: FirebaseFirestore.Timestamp | null };

    return {
      ...dataAux,
      id: doc.id,
      createdAt: createdAt?.toDate() ?? null
    };
  });
}

export async function addUser(user: Omit<Person, keyof Pick<Person, 'id'>> & { name_normalized: string }): Promise<string> {
  const response = await collection.add({
    ...user,
    createdAt: new Date(),
  });
  return response.id;
}

export async function deleteUser(userId: string) {
  await collection.doc(userId).delete({ exists: true });  
}