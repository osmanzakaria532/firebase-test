import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  let [email, setEmail] = useState();
  let [name, setName] = useState();
  let [password, setPassword] = useState();

  let [emailErr, setEmailErr] = useState();
  let [nameErr, setNameErr] = useState();
  let [passwordErr, setPasswordErr] = useState();

  let [passwordShow, setPasswordShow] = useState(false);

  let [registrationComplete, setRegistrationComplete] = useState();

  let handleEmail = (el) => {
    setEmail(el.target.value);
    setEmailErr();
  };
  let handleName = (el) => {
    setName(el.target.value);
    setNameErr();
  };
  let handlePassword = (el) => {
    setPassword(el.target.value);
    setPasswordErr();
  };
  let handleSubmit = () => {
    if (!email) {
      setEmailErr("Email is required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
        setEmailErr("Invalid Email");
      }
    }
    if (!name) {
      setNameErr("Name is required");
    }

    if (!password) {
      setPasswordErr("Password is required");
    }
    // else {
    //   if (!/^(?=.*[a-z])/.test(password)) {
    //     setPasswordErr("Lowercase Is required");
    //   } else if (!/^(?=.*[A-Z])/.test(password)) {
    //     setPasswordErr("Uppercase Is required");
    //   } else if (!/^(?=.*[0-9])/.test(password)) {
    //     setPasswordErr("Number Is required");
    //   } else if (!/^(?=.*[!@#$%^&*])/.test(password)) {
    //     setPasswordErr("Spacial character Is required");
    //   } else if (!/^(?=.{8,})/.test(password)) {
    //     setPasswordErr("Atleast 8 character  required");
    //   }
    // }

    if (
      email &&
      name &&
      password &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          setRegistrationComplete("Registration Complete");
          setEmail("");
          setName("");
          setPassword("");
          navigate("/login");
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/email-already-in-use") {
            setEmailErr("Email already in use");
          }
        });
    }
  };
  return (
    <>
      <div>
        <div className="w-[400px] mx-auto bg-slate-400 my-24 flex flex-col p-10 gap-4">
          <h1 className="text-4xl">Registration</h1>
          <p>{registrationComplete}</p>
          <input
            onChange={handleEmail}
            type="email"
            placeholder="Email Address"
            value={email}
          />
          {emailErr && (
            <p className="p-2 bg-red-400 text-wh text-sm">{emailErr}</p>
          )}
          <input
            onChange={handleName}
            type="text"
            placeholder="FullName"
            value={name}
          />
          {nameErr && (
            <p className="p-2 bg-red-400 text-wh text-sm">{nameErr}</p>
          )}
          <div className="relative">
            <input
              onChange={handlePassword}
              type={passwordShow ? "text" : "password"}
              placeholder="Password"
              value={password}
              className="w-full"
            />
            <div className="absolute top-1/2 -translate-y-1/2 right-2">
              {passwordShow ? (
                <FaEye onClick={() => setPasswordShow(!passwordShow)} />
              ) : (
                <FaEyeSlash onClick={() => setPasswordShow(!passwordShow)} />
              )}
            </div>
          </div>
          {passwordErr && (
            <p className="p-2 bg-red-400 text-wh text-sm">{passwordErr}</p>
          )}
          <button onClick={handleSubmit} className="bg-orange-400">
            Sign Up
          </button>
          <p>
            Already have an account / <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default Registration;
