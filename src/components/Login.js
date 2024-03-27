import { useRef, useState, useEffect } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";

import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        navigate("/browse");
      }
    });

    return unsubscribe;
  }, []);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const currentUser = auth.currentUser;
              if (currentUser) {
                const { uid, email, displayName, photoURL } = currentUser;
                dispatch(
                  addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL,
                  })
                );
              }
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      const auth = getAuth();
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 rounded-md text-white bg-opacity-85"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 my-2 w-full rounded-md bg-gray-800 text-gray-600"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-2 my-2 w-full rounded-md bg-gray-800 text-gray-600"
        />
        <input
          ref={password}
          type="text"
          placeholder="Password"
          className="p-2 my-2 w-full rounded-md bg-gray-800 text-gray-600"
        />
        <p className="text-red-600 font-semibold">{errorMessage}</p>
        <button
          className="p-4 my-8 bg-red-600 w-full rounded-md"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix ? Click to Sign Up"
            : "Already a User ? Sign In Now !"}
        </p>
      </form>
    </div>
  );
};

export default Login;

// import { useRef, useState } from "react";
// import Header from "./Header";
// import { checkValidData } from "../utils/validate";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { updateProfile } from "firebase/auth";

// import { auth } from "../utils/firebase";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [isSignInForm, setIsSignInForm] = useState(true);
//   const [errorMessage, setErrorMessage] = useState(null);

//   const name = useRef(null);
//   const email = useRef(null);
//   const password = useRef(null);

//   const handleButtonClick = () => {
//     const message = checkValidData(email.current.value, password.current.value);
//     setErrorMessage(message);

//     if (message) return;

//     if (!isSignInForm) {
//       console.log(email.current.value + password.current.value);

//       ///Sign up
//       createUserWithEmailAndPassword(
//         auth,
//         email.current.value,
//         password.current.value
//       )
//         .then((userCredential) => {
//           const user = userCredential.user;
//           updateProfile(user, {
//             displayName: name.current.value,
//             photoURL: "https://avatars.githubusercontent.com/u/67434290?v=4",
//           })
//             .then(() => {
//               const currentUser = auth.currentUser;

//               const { uid, email, displayName, photoURL } = auth.currentUser;
//               dispatch(
//                 addUser({
//                   uid: uid,
//                   email: email,
//                   displayName: displayName,
//                   photoURL: photoURL,
//                 })
//               );

//               navigate("/browse");
//               // Profile updated!
//               // ...
//             })
//             .catch((error) => {
//               setErrorMessage(error.message);
//               // An error occurred
//               // ...
//             });
//           //   console.log(user);
//           //   navigate("/browse");

//           // ...
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           setErrorMessage(errorCode + "-" + errorMessage);
//           // ..
//         });
//     } else {
//       ///Sign in Logic
//       const auth = getAuth();
//       signInWithEmailAndPassword(
//         auth,
//         email.current.value,
//         password.current.value
//       )
//         .then((userCredential) => {
//           // Signed in
//           const user = userCredential.user;
//           console.log(user);
//           navigate("/browse");

//           // ...
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           setErrorMessage(errorCode + "-" + errorMessage);
//         });
//     }
//   };

//   const toggleSignInForm = () => {
//     setIsSignInForm(!isSignInForm);
//   };
//   return (
//     <div>
//       <Header />
//       <div className="absolute">
//         <img
//           src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
//           alt="logo"
//         />
//       </div>
//       <form
//         onSubmit={(e) => e.preventDefault()}
//         className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 rounded-md text-white bg-opacity-85"
//       >
//         <h1 className="font-bold text-3xl py-4">
//           {isSignInForm ? "Sign In" : "Sign Up"}
//         </h1>
//         {!isSignInForm && (
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="p-2 my-2 w-full rounded-md bg-gray-800 text-gray-600"
//           />
//         )}
//         <input
//           ref={email}
//           type="text"
//           placeholder="Email Address"
//           className="p-2 my-2 w-full rounded-md bg-gray-800 text-gray-600"
//         />
//         <input
//           ref={password}
//           type="text"
//           placeholder="Password"
//           className="p-2 my-2 w-full rounded-md bg-gray-800 text-gray-600"
//         />
//         <p className="text-red-600 font-semibold">{errorMessage}</p>
//         <button
//           className="p-4 my-8 bg-red-600 w-full rounded-md"
//           onClick={handleButtonClick}
//         >
//           {isSignInForm ? "Sign In" : "Sign Up"}
//         </button>
//         <p className="cursor-pointer" onClick={toggleSignInForm}>
//           {isSignInForm
//             ? "New to Netflix ? Click to Sign Up"
//             : "Already a User ? Sign In Now !"}
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;
