import CommentModel from "../models/Comment.js";
import PostModel from "../models/Post.js";

export const allComments = async (req, res) => {
  try {
    const comments = await CommentModel.find().populate("user").exec();

    return res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "A server error has occurred" });
  }
};
export const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { comments } = req.body;

    if (!comments) return res.json({ message: "Comment cannot be empty" });

    const doc = new CommentModel({
      comments: req.body.comments,
      user: req.userId,
      post: postId,
    });

    // const result = await doc.save().then((doc) => doc.populate("user"));
    const result = await doc.save();
    console.log("result", result);
    // try {
    //   const addComment = await PostModel.findByIdAndUpdate(postId, {
    //     $push: { comments: result.comments },
    //   });
    // } catch (error) {
    //   console.log(error);
    // }

    return res.status(201).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "A server error has occurred" });
  }
};

export const postComments = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await CommentModel.find({ post: id }).populate("user");
    const commentsCount = result.length;

    result.push({ commentsCount: commentsCount });
    if (result) {
      return res.status(200).json(result);
    }
    return res
      .status(404)
      .json({ error: "There is no such entry in the database" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "A server error has occurred" });
  }
};

export const getFirstComments = async (req, res) => {
  try {
    const comments = await CommentModel.find().populate("user").limit(5).exec();
    // const comment = comments.map((obj) => obj.comment).slice(0, 5);

    // console.log("comments", comments);
    res.json(comments);
  } catch (err) {
    return res.status(500).json({ message: "Failed to get comments" });
  }
};

// export const createComment = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const { comment } = req.body;
//     // console.log("postId", postId);
//     if (!comment)
//       return res.json({ message: "Комментарий не может быть пустым" });

//     const newComment = new CommentModel({ comment });

//     const result = await newComment.save();

//     try {
//       const postComment = await PostModel.findByIdAndUpdate(postId, {
//         $push: { comments: result._id },
//       });
//       // console.log("postComment", postComment);
//     } catch (error) {
//       console.log(error);
//     }
//     console.log("result", result);
//     return res.status(201).json(result);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "A server error has occurred" });
//   }
// };

// export const createComment = async (req, res) => {
//   console.log("req.body", req.body);
//   try {
//     const { postId, comment } = req.body;

//     if (!comment) return res.json({ message: "Комментарий не может быть пустым" });

//     const newComment = new CommentModel({ comment });
//     await newComment.save();

//     try {
//       await PostModel.findByIdAndUpdate(postId, {
//         $push: { comments: newComment._id },
//       });
//     } catch (error) {
//       console.log(error);
//     }
//     console.log("newComment", newComment);
//     res.json(newComment);
//   } catch (error) {
//     res.json({ message: "Что-то пошло не так." });
//   }
// };

// export const updateComments = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const result = await CommentModel.find({ post: id },{comment:comment.req.body.comment});

//     if (result) {
//       return res.status(200).json(result);
//     }
//     return res.status(404).json({ error: "Такой записи нет в базе" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "A server error has occurred" });
//   }
// };
