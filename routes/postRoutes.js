const mongoose = require("mongoose");
const Post = mongoose.model("post");

module.exports = app => {
  app.post("/api/create-post", async (req, res) => {
    const { title, postedby } = req.body;

    const post = new Post({
      title,
      postedby,
      created_at: Date.now()
    });
    try {
      await post.save();
      res.status(200).json({ todo: "todo added successfully" });
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
