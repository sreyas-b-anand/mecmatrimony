import { useState } from "react";
import './AddConfessions.css';
import { getFirestore , addDoc , collection } from "firebase/firestore";
import { app } from "../../firebase/firebase";
import { useNavigate } from "react-router";


const AddConfession = () => {
  const navigate = useNavigate()
  const [confessions, setConfessions] = useState("");
  const db = getFirestore(app);
  const addConfession = async (e) => {
    e.preventDefault();
    const confession = e.target.confession.value;
    try {
      const docRef = await addDoc(collection(db, "confessions"), {
        confession,
        date: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      setConfessions("");
      navigate('/')
    } catch (e) {
      console.error("Error adding document: ", e);
      navigate('/')
    }
  };
  return (
    <div id="q">
      <form id="form" onSubmit={addConfession}>
        <input
          type="text"
          name="confession"
          id="confession"
          value={confessions}
          onChange={(e) => setConfessions(e.target.value)}
          placeholder="Write your confession here"
        />
        <input id ="hi" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddConfession;
 