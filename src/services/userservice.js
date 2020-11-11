import firebase from "../firebase";

const db = firebase.collection("users");

class UserService {
  //list
  getAll() {
    return db;
  }
  //create
  create(todo) {
    return db.add(todo);
  }
  //update
  update(id, value) {
    return db.doc(id).update(value);
  }
  //delete
  delete(id) {
    return db.doc(id).delete();
  }

  get() {
    return db;
  }
}

export default new UserService();