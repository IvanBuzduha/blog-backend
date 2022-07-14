import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (err) {
    return res.status(500).json({ message: "Failed to get article" });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: "after" },
      (err, doc) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "The article could not be found" });
        }
        if (!doc) {
          return res.status(404).json({ message: "Failed to get article" });
        }
        res.json(doc);
      }
    ).populate("user");
  } catch (err) {
    return res.status(500).json({ message: "Failed to get article" });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(","),
      user: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to create article" });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete({ _id: postId }, (err, doc) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "The article could not be found" });
      }
      if (!doc) {
        return res.status(404).json({ message: "Failed to get article" });
      }
      res.json({ success: "The article has been deleted" });
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed to get article" });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags.split(","),
        user: req.userId,
      }
    );
    res.json({ success: "The article has been updated" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to update article" });
  }
};
export const uploadImg = async (req, res) => {
  try {
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed to upload image" });
  }
};
export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();
    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);
    res.json(tags);
  } catch (err) {
    return res.status(500).json({ message: "Failed to get tags" });
  }
};
