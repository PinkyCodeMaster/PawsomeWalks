"use client";

import { useState } from "react";
import CreatePostDialog from "@/components/community/create-post-dialog";
import { PostCard } from "@/components/community/post-card";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";

const initialPosts = [
  {
    id: "1",
    author: {
      name: "Sarah Smith",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    content: "Beautiful morning walk with Max! 🐕",
    image: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6",
    likes: 24,
    comments: 3,
    timestamp: "2024-03-21T08:30:00Z",
  },
  {
    id: "2",
    author: {
      name: "John Doe",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    },
    content: "Group walk at the park was a huge success! All the dogs had such a great time playing together. 🌳🐾",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
    likes: 18,
    comments: 5,
    timestamp: "2024-03-21T07:15:00Z",
  },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const handleCreatePost = (newPost: any) => {
    setPosts([
      {
        id: Date.now().toString(),
        author: {
          name: "Current User",
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
        },
        likes: 0,
        comments: 0,
        timestamp: new Date().toISOString(),
        ...newPost,
      },
      ...posts,
    ]);
    setIsCreatePostOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <p className="text-muted-foreground">
            Share moments from your walks and connect with other dog lovers
          </p>
        </div>
        <Button onClick={() => setIsCreatePostOpen(true)}>
          <ImageIcon className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <CreatePostDialog
        open={isCreatePostOpen}
        onOpenChange={setIsCreatePostOpen}
        onSubmit={handleCreatePost}
      />
    </div>
  );
}