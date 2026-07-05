import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthstore } from "@/stores/useAuthStore";

const topbar = () => {
  const { isAdmin } = useAuthstore();

  return (
    <div className=" rounded-lg flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      <div className="flex gap-2 items-center">Spotify</div>
      <div className="flex items-center gap-3">
        {isAdmin && (
          <Link
            to="/admin"
            className="flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
          >
            <LayoutDashboardIcon className="size-4" />
            <span>Admin Dashboard</span>
          </Link>
        )}

        <SignedIn>
          <SignedIn>
            <UserButton
              showName
              appearance={{
                elements: {
                  userButtonBox:
                    "rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 hover:bg-zinc-700",
                  userButtonOuterIdentifier: "text-white",
                  avatarBox: "h-8 w-8",
                },
              }}
            />
          </SignedIn>

          {/* <SignOutButton>
            <button className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors">
              Sign Out
            </button>
          </SignOutButton> */}
        </SignedIn>

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>
      </div>
    </div>
  );
};

export default topbar;
