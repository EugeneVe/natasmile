import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useModal } from "../../Contexts/ModalContext";
import { auth } from "../../Firebase";
import { useAuth } from "../../Contexts/AuthUserContext";
import "./Signin.scss";

function SignIn() {
  const { popupFans, setPopupFans, popupLogin, setPopupLogin } = useModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authUser, userExist, userNotExist } = useAuth();

  const signIn = (e) => {
    e?.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        userExist(user);
      } else {
        userNotExist(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignIn = () => {
    signIn();
    setPopupLogin(false);
  };

  const handleSignOut = () => {
    userSignOut();
    setPopupLogin(false);
  };

  return (
    <div className="signin-wrapper">
      {!authUser ? (
        <>
          <div className="title-login">Log In</div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-button" onClick={handleSignIn}>
            Signin
          </div>
        </>
      ) : (
        <div className="sing-out-button" onClick={handleSignOut}>
          Sign Out
        </div>
      )}
    </div>
  );
}

export default SignIn;
