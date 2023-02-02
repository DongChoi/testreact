import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Homepage from "./Homepage";
// import Companies from "./Companies";
import UserContext from "./userContext";
import { useContext } from "react";
import UploadImages from "./UploadImages";
import Register from "./Register";
import Login from "./Login";
import Capsules from "./Capsules";
import CreateCapsuleForm from "./CreateCapsuleForm";

function RouteList({ upload, login, register, createCapsule }) {
  const { currUser } = useContext(UserContext);

  if (currUser) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/capsules" element={<Capsules />} />
          <Route path="/upload" element={<UploadImages upload={upload} />} />

          <Route
            path="/create-capsule"
            element={<CreateCapsuleForm createCapsule={createCapsule} />}
          />

          {/* <Route
            path="/profile"
            element={<ProfileForm updateUser={updateUser} />}
          /> */}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/upload" element={<UploadImages />} />
        <Route path="/signup" element={<Register register={register} />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
}

export default RouteList;
