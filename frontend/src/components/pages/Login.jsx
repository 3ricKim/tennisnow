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

export default Login;

