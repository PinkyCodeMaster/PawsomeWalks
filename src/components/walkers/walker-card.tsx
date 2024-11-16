
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface WalkerCardProps {
  walker: {
    id: string;
    name: string;
    image: string;
    rating: number;
    reviews: number;
    experience: string;
    bio: string;
    location: string;
    specialties: string[];
    availability: string;
  };
}

export function WalkerCard({ walker }: WalkerCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row gap-4 items-center">
        <Avatar className="h-12 w-12">
          <AvatarImage src={walker.image} alt={walker.name} />
          <AvatarFallback>{walker.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="font-semibold">{walker.name}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span>{walker.rating}</span>
            <span>({walker.reviews} reviews)</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground mb-4">{walker.bio}</p>
        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-medium">Experience:</span> {walker.experience}
          </div>
          <div className="text-sm">
            <span className="font-medium">Location:</span> {walker.location}
          </div>
          <div className="text-sm">
            <span className="font-medium">Available:</span> {walker.availability}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {walker.specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={`/book?walker=${walker.id}`}>Book a Walk</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}