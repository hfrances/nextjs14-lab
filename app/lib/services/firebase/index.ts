import { Person } from '@/app/types/person';
import { db } from './database';
import { collection, query, orderBy, startAt, endAt, getDocs, Query } from 'firebase/firestore'; // Importa desde firebase-admin/firestore
import { stringRemoveAccents } from '@/app/lib/utils/string.utils';

const COLLECTION_USERS = 'users';

function like(collection: Query, field: string | undefined, value: string | undefined): Query {
  let myquery = collection;

  if (field && value) {
    const value_normalized = stringRemoveAccents(value.toLowerCase());
    myquery = query(myquery, orderBy(field), startAt(value_normalized), endAt(value_normalized + '\uf8ff'));
  }
  return myquery;
}

export async function getUsers(queryString: string | undefined): Promise<Person[]> {
  const mycollection = collection(db, COLLECTION_USERS);
  const myquery = like(mycollection, "name_normalized", queryString);
  const snapshot = await getDocs(myquery);

  return snapshot.docs.map(doc => doc.data() as Person);
}

