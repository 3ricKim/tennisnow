import { SignUp } from "@clerk/clerk-react";
import "../../index.css";

export function Signup() {
  return (
    <SignUp
      path="/signup"
      routing="path"
      signInUrl="/login"
      fallbackRedirectUrl="/" // Redirect to home after sign-up
    />
  );
}
// enter skill level, age, username, etc

export default Signup;
