import { Card, CardContent } from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const syncAttempted = useRef(false);

  useEffect(() => {
    const syncUser = async () => {
      try {
        if (!isLoaded || !user || syncAttempted.current) return;
        await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });

        syncAttempted.current = true;
      } catch (error) {
        console.log("Error in auth callback page", error);
      } finally {
        navigate("/");
      }
    };

    syncUser();
  }, [isLoaded, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <Card className="w-full max-w-md bg-zinc-900 border border-zinc-800 shadow-2xl">
        <CardContent className="flex flex-col items-center py-10">
          <Loader2 className="h-10 w-10 text-emerald-500 animate-spin mb-6" />

          <h2 className="text-2xl font-bold text-white">Logging you in</h2>

          <p className="mt-2 text-sm text-zinc-400">
            Redirecting, please wait...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallbackPage;
