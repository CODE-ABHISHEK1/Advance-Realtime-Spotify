import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";
import { Album } from "../models/album.model.js";

export const getStats = async (req, res, next) => {
  try {
    // const TotalSongs = await Song.countDocuments();
    // const TotalUsers = await User.countDocuments();
    // const TotalAlbums = await Album.countDocuments();

    const [TotalSongs, TotalUsers, TotalAlbums, UniqueArtists] =
      await Promise.all([
        Song.countDocuments(),
        User.countDocuments(),
        Album.countDocuments(),

        Song.aggregate([
          {
            $unionWith: {
              coll: "albums",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: "$artist",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);

    res.status(200).json({
      TotalSongs,
      TotalUsers,
      TotalAlbums,
      TotalArtists: UniqueArtists[0]?.count || 0,
    });
  } catch (error) {
    console.log("cannot get Stats");
    next(error);
  }
};
