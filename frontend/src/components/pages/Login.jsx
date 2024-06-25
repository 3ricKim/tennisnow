// import "./Login.css";
// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// import { SignIn } from "@clerk/clerk-react";

// export function Login() {
//   return <SignIn path="/sign-in" />;
// }

// export default Login;

import { SignIn } from "@clerk/clerk-react";

export function Login() {
  return (
    <SignIn
      path="/login"
      routing="path"
      signUpUrl="/signup"
      fallbackRedirectUrl="/" // Redirect to home after sign-in
    />
    // <RedirectToSignUp />

  );
}
// enter skill level, age, username, etc

export default Login;

