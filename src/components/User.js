import React, { useEffect, useState } from "react";
import { app, fireDB } from "../base";
import "firebase/auth";
import Header from "./header";
import Footer from "./footer";
import Pointform from "./Pointform";

function User(props) {
  let user = app.auth().currentUser;
  let userData = {};
  const [userpoint, setuserpoint] = useState(0);
  if (user != null) {
    userData = {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      point: 0,
    };
  }

  const getDbPoint = () => {
    fireDB.ref(userData.uid).once("value", function (obj) {
      userData.point = obj.val().point;
      setuserpoint(userData.point);
    });
  };

  useEffect(() => {
    getDbPoint();
    setuserpoint(userData.point);
  }, []);

  return (
    <>
     <Header/>
      <section>
        {/* <div className="whiteInner">
          <p>User data</p>
          <div className="flex items-center">
            <p>{userData.email}</p>
            <p>{userData.uid}</p>
          </div>
        </div> */}
        <div className="whiteInner">
          <div className="point">
            <p className="text-left">現在のポイントは</p>
            <p>
              <span>
                {userpoint}
                <i>pc</i>
              </span>
            </p>
          </div>
        </div>
        <Pointform point={userpoint} selfUid={userData.uid} />
        <button onClick={() => app.auth().signOut()}>Sign out</button>
      </section>

      <Footer/>

    </>
  );
}

export default User;
