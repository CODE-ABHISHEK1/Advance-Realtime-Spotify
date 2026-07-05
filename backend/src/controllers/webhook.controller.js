import { Webhook } from "svix";
import { User } from "../models/user.model.js";

export const clerkWebhook = async (req, res) => {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      throw new Error("Missing Clerk Webhook Secret");
    }

    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(WEBHOOK_SECRET);

    wh.verify(JSON.stringify(payload), {
      "svix-id": headers["svix-id"],
      "svix-timestamp": headers["svix-timestamp"],
      "svix-signature": headers["svix-signature"],
    });

    const eventType = payload.type;
    const data = payload.data;

    switch (eventType) {
      case "user.updated":
        await User.findOneAndUpdate(
          { clerkId: data.id },
          {
            fullName:
              `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
            imageUrl: data.image_url,
          }
        );
        break;

      case "user.deleted":
        await User.findOneAndDelete({
          clerkId: data.id,
        });
        break;

      default:
        break;
    }

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "Webhook Error",
    });
  }
};