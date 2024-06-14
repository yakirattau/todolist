import { useContext, useState } from "react";
import Modal from "./Modal";
import { UserContext } from "../contexts/UserContext";

export default function ListHeader({ listName, getData, setTodos }) {
  const [showModal, setShowModal] = useState(false);
  // const msg = useContext(UserContext);

  const signOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    setTodos([]);
  }

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      {/* <h4>Logged as {msg}</h4> */}
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)}>ADD NEW</button>
        <button className="signout" onClick={signOut}>SIGN OUT</button>
      </div>
      {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData} />}
    </div>
  );
}