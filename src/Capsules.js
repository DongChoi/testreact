import React, { useContext, useState } from "react";
import UserContext from "./userContext";
import Capsule from "./Capsule";
import CreateCapsuleForm from "./CreateCapsuleForm";
import { Link } from "react-router-dom";

function Capsules() {
  const { currUser } = useContext(UserContext);
  const [capsules, setCapsules] = useState(currUser.capsules);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();
  const currentYear = today.getFullYear();

  //if it takes over 2 hours or so then use a library. or uses that are universal or are used by a big number of people
  function getDaysRemaining(psqlDate) {
    const returnDateInMilliseconds = new Date(psqlDate).getTime();
    const milisecondsInADay = 86400000;
    const millisecondsRemaining = returnDateInMilliseconds - today.getTime();
    const daysRemaining =
      Math.ceil(millisecondsRemaining / milisecondsInADay) + 1;
    return daysRemaining;
  }

  console.log(capsules);
  return (
    <div>
      {capsules.length === 0 ? (
        <div className="msg"> "You have no capsules yet!"</div>
      ) : (
        currUser.capsules.map((capsule) => {
          return (
            <Capsule
              capsuleName={capsule.name}
              openDate={capsule.return_date}
              message={capsule.message}
              closed={capsule.closed}
              daysRemaining={getDaysRemaining(capsule.return_date)}
            />
          );
        })
      )}
    </div>
  );
}

export default Capsules;
