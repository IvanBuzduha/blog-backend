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
    const { comment } = req.body;
    // console.log("commentREQ", comment);
    // console.log("postId", postId);
    if (!comment) return res.json({ message: "Comment cannot be empty" });

    const doc = new CommentModel({
      comment,
      user: req.userId,
      post: postId,
    });
    // console.log("doc", doc);
    const result = await doc.save().then((doc) => doc.populate("user"));
    // const result = await doc.save();
    // console.log("result", result);

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
  try {
    const id = req.params.id;
    const result = await CommentModel.find({ post: id }).populate("user");

    console.log("result :>> ", result);
    // try {
    //   const postComment = await PostModel.findByIdAndUpdate(id, {
    //     $push: { commentsCount: result.length },
    //   });
    // console.log("postComment", postComment);
    // } catch (error) {
    //   console.log(error);
    // }

    if (result) {
      return res.status(200).json(result);
    }
    commentsCount: result.length;
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
    res.json(comments);
  } catch (err) {
    return res.status(500).json({ message: "Failed to get comments" });
  }
};
// export const createComment = async (req, res) => {
//   const { comment, postId } = req.body;
//   console.log("comment", comment);
//   console.log("postId", postId);
//   //   const postId = req.params.id;
//   const data = {
//     comment,
//     user: req.userId,
//     post: postId,
//   };

//   const addComment = new CommentModel(data);
//   try {
//     const result = await addComment.save().then((doc) => doc.populate("user"));
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
//     console.log("postId :>> ", postId);
//     if (!comment)
//       return res.json({ message: "Комментарий не может быть пустым" });

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
