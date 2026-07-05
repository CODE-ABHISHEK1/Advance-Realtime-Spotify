import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 }); //created at -1 means descending to ascending
    res.status(200).json(songs);
  } catch (error) {
    console.log("error in fetching getAllSongs", error);
  }
};

export const getFeautreSongs = async (req, res) => {
  try {
    //fetch 6 songs using mongodb's aggregation pipeline
    const songs = await Song.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    console.log("error in fetching feature songs", error);
    next(error);
  }
};

export const getMadeForYou = async (req, res) => {
  //currently fetching random songs -- but we can use some algorithm for fetching Made for you songs for currently loggedin feature

  try {
    //fetch 6 songs using mongodb's aggregation pipeline
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    console.log("error in fetching feature songs", error);
    next(error);
  }
};

export const getTrendingSongs = async (req, res) => {
  // we can use some algorith to fetch trending songs future implementation
  try {
    //fetch 6 songs using mongodb's aggregation pipeline
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    console.log("error in fetching feature songs", error);
    next(error);
  }
};
