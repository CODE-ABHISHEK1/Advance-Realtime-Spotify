import { Toaster as HotToaster } from "react-hot-toast";

const Toaster = () => {
  return (
    <HotToaster
      position="top-center"
      gutter={12}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#18181b", // zinc-900
          color: "#fff",
          border: "1px solid #3f3f46", // zinc-700
          padding: "16px 20px",
          fontSize: "15px",
          fontWeight: "500",
          minWidth: "340px",
          borderRadius: "12px",
        },
        success: {
          iconTheme: {
            primary: "#22c55e",
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },
      }}
    />
  );
};

export default Toaster;
