import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";

interface PostCardProps {
  post: {
    author: {
      name: string;
      image: string;
    };
    content: string;
    image?: string;
    likes: number;
    comments: number;
    timestamp: string;
  };
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row gap-4 items-center">
        <Avatar>
          <AvatarImage src={post.author.image} alt={post.author.name} />
          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-semibold">{post.author.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{post.content}</p>
        {post.image && (
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt="Post image"
              fill
              className="object-cover"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex gap-4 w-full">
          <Button variant="ghost" size="sm" className="flex-1">
            <Heart className="mr-2 h-4 w-4" />
            {post.likes}
          </Button>
          <Button variant="ghost" size="sm" className="flex-1">
            <MessageCircle className="mr-2 h-4 w-4" />
            {post.comments}
          </Button>
          <Button variant="ghost" size="sm" className="flex-1">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}