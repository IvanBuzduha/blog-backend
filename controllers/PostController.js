import PostModel from "../models/Post.js";
import CommentModel from "../models/Comment.js";
import { postComments } from "./CommentController.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .sort("-createdAt")
      .populate("user")
      .exec();
    res.json(posts);
  } catch (err) {
    return res.status(500).json({ message: "Failed to get articles" });
  }
};
export const getPopularPosts = async (req, res) => {
  try {
    const popularPosts = await PostModel.find()
      .sort("-viewsCount")
      .populate("user")
      .exec();

    res.json(popularPosts);
  } catch (err) {
    return res.status(500).json({ message: "Failed to get popular articles" });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    // console.log("postComments :>> ", postComments.length);
    PostModel.findOneAndUpdate(
      { _id: postId },
      // { commentsCount: 3 },
      { $inc: { viewsCount: 1 } },
      { returnDocument: "after" },
      (err, doc) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "The article could not be found" });
        }
        // console.log("commentsCount :>> ", commentsCount);
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
      // comments: req.body.comments,
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
        // comments: req.body.comments,
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

export const getAllTags = async (req, res) => {
  try {
    const posts = await PostModel.find();
    const tags = posts.map((obj) => obj.tags);

    res.json(tags);
  } catch (err) {
    return res.status(500).json({ message: "Failed to get tags" });
  }
};

export const getPostComments = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id).populate("user");
    const list = await Promise.all(
      post.comments.map((comment) => {
        return CommentModel.findById(comment);
      })
    );

    res.json(list);
  } catch (error) {
    res.json({ message: "Something went wrong." });
  }
};

// export const allComments = async (req, res) => {
//   try {
//     const comments = await PostModel.find().populate("user").exec();
//     return res.status(200).json(comments);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Произошла серверная ошибка" });
//   }
// };
// export const createComment = async (req, res) => {
//   const { text, postId } = req.body;
//   //   const postId = req.params.id;
//   const data = {
//     text,
//     user: req.userId,
//     post: postId,
//   };

//   const comment = new PostModel(data);
//   try {
//     const result = await comment.save().then((doc) => doc.populate("user"));
//     if (result) {
//       console.log(result);
//       return res.status(201).json(result);
//     }
//     return res.status(400).json({ error: "Не удалось создать комментарий" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Произошла серверная ошибка" });
//   }
// };

// export const postComments = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const result = await PostModel.find({ post: id }).populate("user");

//     if (result) {
//       return res.status(200).json(result);
//     }
//     return res.status(404).json({ error: "Такой записи нет в базе" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Произошла серверная ошибка" });
//   }
// };
