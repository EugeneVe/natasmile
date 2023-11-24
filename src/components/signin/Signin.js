import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useModal } from "../../Contexts/ModalContext";
import { auth } from "../../Firebase";
import { useAuth } from "../../Contexts/AuthUserContext";
import "./Signin.scss";

function SignIn() {
  const { setPopupLogin } = useModal();
  const [emailOrPasswordError, setEmailOrPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { authUser, userExist, userNotExist } = useAuth();

  const validateEmail = (inputEmail) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(inputEmail);
  };

  const signIn = () => {
    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email");
      return;
    }
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
        setEmailOrPasswordError("Wrong email or password");
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
    if (formData.email && formData.password) {
      signIn();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => {
              handleInputChange(e);
              setEmailError("");
            }}
            required
          />
          <div style={dynamicStyles}>{emailError}</div>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => {
              handleInputChange(e);
              setEmailOrPasswordError("");
            }}
            required
          />
          <div style={dynamicStyles}>{emailOrPasswordError}</div>

          <div
            className="login-button"
            onClick={handleSignIn}
            disabled={!formData.email || !formData.password}
          >
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
