import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "songs" }], //in ref: give the excat schema otherwise it will throw error when you try to fetch
  },
  { timestamps: true },
);

export const Album = mongoose.model("Album", albumSchema);
