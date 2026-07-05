import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";

const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const SignInWGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };
  return (
    <Button
      onClick={SignInWGoogle}
      variant="outline"
      className="w-full h-11 flex items-center justify-center gap-3 rounded-md
    border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700
    hover:border-zinc-500 transition-all duration-200"
    >
      <FcGoogle className="size-5" />
      <span className="font-medium">Continue with Google</span>
    </Button>
  );
};

export default SignInOAuthButtons;
