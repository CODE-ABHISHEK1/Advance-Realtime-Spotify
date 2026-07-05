import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  try {
    const { userId } = await req.auth(); // you cannot use req.auth.userId because it was used in older version in newer version it has changed

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized - user must be logged in",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
};

export const requireAdmin = async (req, res, next) => {
  try {
    const { userId } = await req.auth();

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized - user must be logged in",
      });
    }

    const currUser = await clerkClient.users.getUser(userId);

    const isAdmin =
      process.env.ADMIN_EMAIL === currUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      return res.status(403).json({
        message: "Unauthorized - you must be admin",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
