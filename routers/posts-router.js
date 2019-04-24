const express = require("express");

const Helpers = require("../data/helpers/postDb.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Helpers.get(req.query);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the posts."
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Helpers.getById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the post!"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const post = await Helpers.insert(req.body);
    if (post) {
      res.status(201).json(post);
    } else {
      res.status(404).json({ message: "Post cannot be added!" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error adding the post!"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await Helpers.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The post has been removed." });
    } else {
      res.status(404).json({ message: "Post cannot be found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error removing the post!"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const posts = await Helpers.update(req.params.id, req.body);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Error updating the post!"
    });
  }
});

module.exports = router;
