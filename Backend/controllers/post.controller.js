import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      amenities,
      area,
      price,
      location,
      images,
      thumbail,
      owner,
    } = req.body;

    const post = new Post.create({
      title,
      description,
      type,
      amenities,
      area,
      price,
      location,
      images,
      thumbail,
      owner,
    });

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate(
      "owner",
      "name email profilePicture"
    );
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "owner",
      "name email profilePicture"
    );
    if (!post) {
      return res.statu(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePost = async(req, res)=>{
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }
        res.status(200).json({message: "Post updated successfully", post});
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

// Delete a post
export const deletePost = async(req, res)=>{
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }
        res.status(200).json({message: "Post deleted successfully"});
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({message : "Internal server error"});
    }
}

