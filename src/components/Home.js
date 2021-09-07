import React, { useEffect, useState } from "react";
import { app, fireDB } from "../base";
import { Link } from "react-router-dom";
import "firebase/auth";
import Header from "./header";
import Footer from "./footer";
import { searchUser } from "./UserDataList";

function Home(props) {
  let user = app.auth().currentUser;
  let userData = {};
  if (user != null) {
    userData = {
      email: user.email,
      uid: user.uid,
    };
  }
  console.log(userData)

  const adminOrUser = () => {
    if (userData.uid === "IxRH57LRSpOpG6Hg0lny7TDoTqx1") {
      return (
        <Link to="/Admin">
          <button>管理者ページ</button>
        </Link>
      );
    } else {
      return (
        <Link to="/User">
          <button>ポイントフォームへ</button>
        </Link>
      );
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <Header />
      <section>
        <h2 className="text-center">ようこそ、{searchUser(userData.uid)}さん</h2>
        {adminOrUser()}
        <button onClick={() => app.auth().signOut()}>Sign out</button>
      </section>
      <Footer/>
    </>
  );
}

export default Home;
