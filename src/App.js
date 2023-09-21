import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import "./App.css";
import { Auth } from "./components/auth";
import { Menu } from "./components/Menu";
import { Gallery } from "./components/Gallery";
import { Notes } from "./components/Notes";
import { db, auth, } from './config/firebase';
//import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";

import { signOut } from 'firebase/auth';



function App() {



  /*const [imageList, setImageList] = useState([]);

  const [newImageTitle, setNewImageTitle] = useState("")
  const [newDate, setNewDate] = useState(0)

  const [updatedTitle, setUpdatedTitle] = useState("")

  


  const photosCollectionRef = collection(db, "photos")

  const onSubmitImage = async () => {
    try {
      await addDoc(photosCollectionRef, {
        title: newImageTitle,
        date: newDate,
        image: "",
        userId: auth?.currentUser?.uid,
      });

      getImageList();
    } catch (err) {
      console.error(err);
    }
  }

  const getImageList = async () => {

    try {
      const data = await getDocs(photosCollectionRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setImageList(filterData);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteImage = async (id) => {
    const photosDoc = doc(db, "photos", id);
    await deleteDoc(photosDoc);
  };

  const updateImageTitle = async (id) => {
    const photosDoc = doc(db, "photos", id);
    await updateDoc(photosDoc, { title: updatedTitle });
  };

  useEffect(() => {
    const getImageList = async () => {

      try {
        const data = await getDocs(photosCollectionRef);
        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setImageList(filterData);
      } catch (err) {
        console.error(err);
      }
    };

    getImageList();
  }, [onSubmitImage]);*/



  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };




  return (<div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Auth />} />
        <Route exact path="/menu" element={<Menu onLogout={logout} />} />
        <Route exact path="/gallery" element={<Gallery />} />
        <Route exact path="/notes" element={<Notes />} />
        <Route path="/" element={<Navigate to="/login" />} />Navigate
      </Routes>
    </BrowserRouter>
    {/*
    <div>
      <input placeholder="Image title..."
        onChange={(e) => setNewImageTitle(e.target.value)}
      />
      <input placeholder="Date..." type="number"
        onChange={(e) => setNewDate(Number(e.target.value))}
      />
      <input type="checkbox" />
      <label></label>
      <button className="submit-btn"
        onClick={onSubmitImage}>Submit Image</button>
    </div>
    <div>
      {imageList.map((photos) => (
        <div>
          <h1> {photos.title} </h1>
          <p>Date: {photos.date}</p>
          <button onClick={() => deleteImage(photos.id)}>Delete Photo</button>

          <input placeholder="new title..."
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <button onClick={() => updateImageTitle(photos.id)}>Update Title</button>
        </div>
      ))}
    </div> 
      */}


  </div>
  );
}

export default App;