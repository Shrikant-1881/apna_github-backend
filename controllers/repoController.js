const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

async function createRepository(req, res) {
  const { owner, name, issues, content, description, visibility } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ error: "Respository name is required!" });
    }

    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ error: "Invalid User ID!" });
    }

    const newRepository = new Repository({
      name,
      description,
      visibility,
      owner,
      content,
      issues,
    });

    const result = await newRepository.save();

    res.status(201).json({
      message: "Repository created!",
      repositoryID: result._id,
    });
  } catch (err) {
    console.error("Error during repository creation : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function getAllRepositories(req, res) {
  try {
    const repositories = await Repository.find({})
      .populate("owner")
      .populate("issues");

    res.json(repositories);
  } catch (err) {
    console.error("Error during fetching repositories : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function fetchRepositoryById(req, res) {
  const { id } = req.params;
  try {
    const repository = await Repository.find({ id })
      .populate("owner")
      .populate("issues");
    res.json(repository);
  } catch (err) {
    console.error("Error during fetching repositories : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function fetchRepositoryByName(req, res) {
  const { name } = req.params;
  try {
    const repository = await Repository.find({ name })
      .populate("owner")
      .populate("issues");
    res.json(repository);
  } catch (err) {
    console.error("Error during fetching repositories : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function fetchRepositoriesForCurrentUser(req, res) {
  const { userID } = req.params;

  try {
    const repositories = await Repository.find({ owner: userID });

    if (!repositories || repositories.length == 0) {
      return res.status(404).json({ error: "User Repositories not found!" });
    }

    res.json({ message: "Repositories found!", repositories });
  } catch (err) {
    console.error("Error during fetching user repositories : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function updateRepositoryById(req, res) {
  const { id } = req.params;
  const { content, description } = req.body;

  try {
    const repository = await Repository.findById(id);
    if (!repository) {
      return res.status(404).json({ error: "Repositories not found!" });
    }

    repository.content.push(content);
    repository.description = description;

    const updatedRepository = await repository.save();

    res.json({
      message: "Respository updated successfully",
      repository: updatedRepository,
    });
  } catch (err) {
    console.error("Error during updating repositories : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function toggleVisibilityById(req, res) {
  const { id } = req.params;
  try {
    const repository = await Repository.findById(id);
    if (!repository) {
      return res.status(404).json({ error: "Repositories not found!" });
    }

    repository.Visibility = !repository.Visibility;

    const updatedRepository = await repository.save();

    res.json({
      message: "Respository visibility toggled successfully",
      repository: updatedRepository,
    });
  } catch (err) {
    console.error("Error during toggling user visibility : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function deleteRepositoryById(req, res) {
  const { id } = req.params;
  try {
    const repository = await Repository.findByIdAndDelete(id);
    if (!repository) {
      return res.status(404).json({ error: "Repositories not found!" });
    }

    res.json({
      message: "Respository deleted successfully",
    });
  } catch (err) {
    console.error("Error during toggling user visibility : ", err.message);
    res.status(500).send("Server error!");
  }
}

module.exports = {
  createRepository,
  getAllRepositories,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoriesForCurrentUser,
  updateRepositoryById,
  toggleVisibilityById,
  deleteRepositoryById,
};
