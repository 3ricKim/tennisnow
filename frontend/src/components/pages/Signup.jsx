import { SignUp } from "@clerk/clerk-react";

export function Signup() {
  return (
    <SignUp
      path="/signup"
      routing="path"
      signInUrl="/login"
      fallbackRedirectUrl="/" // Redirect to home after sign-up
    />
    // <RedirectToSignUp />

  );
}
// enter skill level, age, username, etc

export default Signup;
