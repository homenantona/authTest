import React, { useEffect, useState } from "react";
import { app, fireDB } from "../base";
import "firebase/auth";
import { UserDataList, searchUser } from "./UserDataList";
import Distribute from "./Distribute";
import Header from "./header";
import Footer from "./footer";

function Admin(props) {
  let user = app.auth().currentUser;

  const [year, setYear] = useState({});
  const [usersData, setUsersData] = useState([]);
  const [commentData, setCommentData] = useState({});
  const [subCommentData, setSubCommentData] = useState({});

  let userData = {};
  let tmpUsersData = [];
  if (user != null) {
    userData = {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      point: 0,
    };
  }
  const doChangeYear = (e) => {
    let selectYear = e.target.value;
    if (selectYear !== "") {
      fireDB
        .ref("/commentData/" + selectYear + "/")
        .once("value", function (obj) {
          setCommentData(obj.val());
          setSubCommentData(obj.val());
        });
    } else {
      setCommentData({});
      setSubCommentData({});
    }
  };

  const doChangeUser = (e) => {
    let selectUser = e.target.value;
    let newCommentData = {};
    console.log(selectUser);
    console.log(commentData);
    Object.keys(commentData).map((value, index) => {
      if (commentData[value].to === selectUser) {
        console.log("発見");
        newCommentData["commentItem" + index] = commentData[value];
      }
    });
    setSubCommentData({});
    setSubCommentData(newCommentData);
  };

  useEffect(() => {
    if (userData.uid === "IxRH57LRSpOpG6Hg0lny7TDoTqx1") {
      fireDB.ref("/commentData/").once("value", function (obj) {
        setYear(obj.val());
      });
    }
    let UserData = UserDataList.map((value, index) =>
      fireDB.ref("/" + value.uid + "/").once("value", function (obj) {
        tmpUsersData.push({
          user: value.name,
          point: obj.val().point,
        });
      })
    );

    Promise.all(UserData).then(() => {
      setUsersData(tmpUsersData);
    });
  }, []);

  return (
    <>
      <Header />
      <section>
        {/* <h2>admin page</h2>
      <p>{userData.email}</p>
      <p>{userData.uid}</p> */}

        <div className="whiteInner">
          <p>現在のポイント総数</p>
          <table className="">
            <tr>
              <th>名前</th>
              <th>ポイント</th>
            </tr>
            {usersData.map((value, index) => (
              <tr key={index}>
                <td>{value.user}</td>
                <td>{value.point}</td>
              </tr>
            ))}
          </table>
        </div>
        <div className="whiteInner">
          <Distribute />
        </div>
        <div className="whiteInner">
          <p>ポイント送付履歴</p>
          <div className="textBox">
                <p>ここでポイントのやり取りを確認できます。<br/>上段セレクトボックスから確認したい「月」を選んだ後、「渡された対象者」を選択すると表示されます。(現在は順不同)</p>
            </div>
          <form className="pointForm">
            <select onChange={doChangeYear}>
              <option value="">-</option>
              {Object.keys(year).map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <select onChange={doChangeUser}>
              <option key="-" value="-">
                -
              </option>

              {UserDataList.map((value, index) => (
                <option key={index} value={value.uid}>
                  {value.name}
                </option>
              ))}
            </select>
          </form>
          <ol className="commentList">
            {Object.keys(subCommentData).map((value, index) => (
              <li key={index}>
                <p>
                  <span>{searchUser(subCommentData[value].from)}</span>
                  <span>から</span>
                </p>
                <p>
                  <span>{searchUser(subCommentData[value].to)}</span>
                  <span>へ</span>
                </p>
                <p>
                  <span>{subCommentData[value].point}</span>
                  <span>ポイント</span>
                </p>
                <p>
                  <span>コメント: </span>
                  <span>{subCommentData[value].value}</span>
                </p>
              </li>
            ))}
          </ol>
        </div>
        <button onClick={() => app.auth().signOut()}>Sign out</button>
      </section>
      <Footer />
    </>
  );
}

export default Admin;
