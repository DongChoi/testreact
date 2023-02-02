import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import Routelist from "./Routelist";
import "./App.css";
import jwt_decode from "jwt-decode";
import UserContext from "./userContext";
import ImageTimeCapsuleApi from "./ImageTimeCapsuleApi";
import axios from "axios";

function App() {
  const [currUser, setcurrUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("image-time-capsule-token")
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function fetchUserWhenMounted() {
      async function addToLocal() {
        if (token) {
          localStorage.setItem("image-time-capsule-token", token);
          let user = jwt_decode(token);
          ImageTimeCapsuleApi.token = token;
          setcurrUser(user);
        } else {
          localStorage.removeItem("token");
        }
        setIsLoading(false);
      }
      addToLocal();
    },
    [token]
  );

  //calls api to register user to backend
  async function register(formData) {
    console.log("attempting to signup user");
    const resp = await ImageTimeCapsuleApi.register(formData);
    console.log("resp after sighn up", resp);
    setToken(resp.token);
  }

  //calls api to login user to backend
  async function login(formData) {
    const resp = await ImageTimeCapsuleApi.login(formData);
    setToken(resp);
  }

  async function createCapsule(formData, images) {
    const resp = await ImageTimeCapsuleApi.createCapsule({
      ...formData,
      username: currUser.username,
    });
    const imagesResp = await addImagesToCapsule(images, resp.capsule_id);
    setToken(resp.token);
  }

  //uploads files to the backend
  async function addImagesToCapsule(file, capsule_id) {
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("file", file[i]);
    }
    const images = {
      method: "POST",
      url: `http://localhost:5001/capsules/${capsule_id}/images`,
      headers: {
        //issue
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };
    const resp = await axios.request(images);
    console.log("resp after add images", resp);
  }

  // //calls api to update user to backend
  // async function updateUser(formData, username) {
  //   const resp = await ImageTimeCapsuleApi.updateUser(formData, username);
  //   setcurrUser(resp);
  //   console.log("CURRENT USER AFTER UPDATE", currUser);
  // }

  if (isLoading) {
    return <div style={{ width: "3em", height: "3em" }}>Loading</div>;
  }

  //logs out user
  function logOutUser() {
    setToken(null);
    localStorage.removeItem("image-time-capsule-token");
    setcurrUser(null);
  }

  return (
    <div>
      <UserContext.Provider value={{ currUser }}>
        <BrowserRouter>
          <NavBar logOutUser={logOutUser} />
          <div>
            <Routelist
              // applyJobs={applyJobs}
              login={login}
              register={register}
              // updateUser={updateUser}
              createCapsule={createCapsule}
            />
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
