import { db } from '../../firebase-config';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

export const getTodos = () => {
  return getDocs(collection(db, "todos"))
  .then((querySnapshot) => {
    const todos = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });
    
    return todos;
  })
  .catch((error) => {
    console.error("Error getting documents: ", error);
  });
}

export const postTodo = (data) => {
  addDoc(collection(db, "todos"), data)
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
}

export const updateTodo = (todoId, newData) => {
  updateDoc(doc(db, "todos", todoId), newData)
  .then(() => {
    console.log("Document successfully updated");
  })
  .catch((error) => {
    console.error("Error updating document: ", error);
  });
}

export const deleteTodo = (todoId) => {
  deleteDoc(doc(db, "todos", todoId))
  .then(() => {
    console.log("Document successfully deleted");
  })
  .catch((error) => {
    console.error("Error deleting document: ", error);
  });
}