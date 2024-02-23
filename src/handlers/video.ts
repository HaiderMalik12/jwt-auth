import { validationResult } from "express-validator";
import prisma from "../db";

export const createVideo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const video = await prisma.video.create({
    data: {
      title: req.body.title,
      desc: req.body.desc,
      videoDetails: {
        create: {
          hostingProvider: req.body.hostingProvider,
          url: req.body.url,
        },
      },
    },
  });

  return res.status(201).json(video);
};

export const getVideos = async (req, res) => {
  const videos = await prisma.video.findMany({
    include: {
      videoDetails: true,
    },
  });
  return res.status(200).json(videos);
};
