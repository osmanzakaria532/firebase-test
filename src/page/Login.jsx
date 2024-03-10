import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  let [email, setEmail] = useState();
  let [password, setPassword] = useState();

  let [emailErr, setEmailErr] = useState();
  let [passwordErr, setPasswordErr] = useState();

  let [passwordShow, setPasswordShow] = useState(false);

  let [loginComplete, setLoginComplete] = useState();

  let handleEmail = (el) => {
    setEmail(el.target.value);
    setEmailErr();
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

    if (!password) {
      setPasswordErr("Password is required");
    }

    if (
      email &&
      password &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)
    ) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setLoginComplete("Login Complete");
          setEmail("");
          setPassword("");
          navigate("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/invalid-credential") {
            setPasswordErr("Invalid Email or Password");
          }
        });
    }
  };
  return (
    <>
      <div>
        <div className="w-[400px] mx-auto bg-slate-400 my-24 flex flex-col p-10 gap-4">
          <h1 className="text-4xl">Login Here</h1>
          <p>{loginComplete}</p>
          <input
            onChange={handleEmail}
            type="email"
            placeholder="Email Address"
            value={email}
          />
          {emailErr && (
            <p className="p-2 bg-red-400 text-wh text-sm">{emailErr}</p>
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
            Sign in
          </button>
          <p>
            create new account / <Link to="/">Sign up</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
