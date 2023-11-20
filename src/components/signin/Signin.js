import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useModal } from "../../Contexts/ModalContext";
import { auth } from "../../Firebase";
import { useAuth } from "../../Contexts/AuthUserContext";
import "./Signin.scss";

function SignIn() {
  const { setPopupLogin } = useModal();
  const [emailOrPasswordError, setOrPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authUser, userExist, userNotExist } = useAuth();

  const validateEmail = (inputEmail) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(inputEmail);
  };

  const signIn = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
        setOrPasswordError("Wrong email or password");
      });
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        userExist(user);
        setPopupLogin(false);
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
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignIn = () => {
    signIn();
  };

  const handleSignOut = () => {
    userSignOut();
    setPopupLogin(false);
  };

  const dynamicStyles = {
    color: "red",
    fontSize: "14px",
    paddingBottom: "7.5px",
    paddingTop: "7.5px",
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
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
              setOrPasswordError("");
            }}
            required
          />
          <div style={dynamicStyles}>{emailError}</div>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setOrPasswordError("");
            }}
            required
          />
          <div style={dynamicStyles}>{emailOrPasswordError}</div>
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
