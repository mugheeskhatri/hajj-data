import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import ImageLight from "../assets/img/madinah.jpg";
import ImageDark from "../assets/img/madinah.jpg";
import { Label, Input, Button } from "@windmill/react-ui";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function Login() {
  const state = useSelector((state) => state);
  let history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const signin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch({ type: "user", user });
          let userName = user.displayName;
          let userEmail = user.email;
          let userTime = user.metadata.creationTime;
          const userObj = {
            userName,
            userEmail,
            userTime,
          };
          sessionStorage.setItem("hajj-data-admin", JSON.stringify(userObj));
          history.push("/app");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Invalid username or password");
        });
    } else {
      alert("Please Enter email and password");
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl fw-bolder font-semibold text-gray-700 dark:text-gray-200">
              لوگ ان
              </h1>
              <Label>
                <span>ای میل</span>
                <Input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="mt-1"
                  type="email"
                  placeholder="john@doe.com"
                />
              </Label>

              <Label className="mt-4">
                <span>پاس ورڈ</span>
                <Input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onKeyDown={(e) => e.keyCode === 13 && signin()}
                  className="mt-1"
                  type="password"
                  placeholder="***************"
                />
              </Label>

              <Button onClick={signin} className="mt-4" block>
                لوگ ان
              </Button>

              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  پاس ورڈ بھول گئے ہیں ؟
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
