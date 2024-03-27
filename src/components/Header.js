import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO } from "../utils/constants";

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
        // An error happened.
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");

        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unsibscribe when  the component unmounts
    return () => unsubscribe();
  }, []);
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={NETFLIX_LOGO} alt="logo" />
      {user && (
        <div className="flex p-2 cursor-pointer">
          <img
            className="w-12 h-12 rounded-md border-1 border-gray-200"
            style={{ width: "3rem", height: "3rem" }}
            alt="userIcon"
            src={user?.photoURL}
          />
          <button
            onClick={handleSignOut}
            className="ml-2 px-4  bg-black text-white rounded-lg hover:bg-gray-800 "
            style={{ height: "3rem" }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
