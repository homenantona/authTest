import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "./AuthProvider";
import Header from "../components/header";
import Footer from "../components/footer";

const Login = ({ history }) => {
  const { login } = useContext(AuthContext);

  // AuthContextからlogin関数を受け取る
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    login(email.value, password.value, history);
  };

  return (
    <>
      <Header />
      <section>
        <div className="whiteInner">
          <h2 className="text-center">Log in</h2>
          <form onSubmit={handleSubmit}>
            <div className="mt-5">
            <label>
              Email
              <input name="email" type="email" placeholder="Email" />
            </label>
            </div>
            <div className="mt-5">
            <label>
              Password
              <input name="password" type="password" placeholder="Password" />
            </label>
            </div>
            <div className="mt-5">
            <button type="submit">Log in</button>
            </div>
          </form>
        </div>
        <div className="textBox">
          <p>このサイトはテスト用です。</p>
          <div className="textBox">
          <p>user情報</p>
          <p>Email:testuser01@test.com</p>
          <p>Password:testuser01</p>
          </div>
          <div className="textBox">
          <p>admin情報</p>
          <p>Email:admin@test.com</p>
          <p>Password:testadmin</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default withRouter(Login);
