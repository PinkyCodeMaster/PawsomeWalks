"use client";

import { WalkerFilter } from "@/components/walkers/walker-filter";
import { WalkerCard } from "@/components/walkers/walker-card";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

const walkers = [
  {
    id: "1",
    name: "Sarah Smith",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    rating: 4.9,
    reviews: 127,
    experience: "5+ years",
    bio: "Professional dog walker and trainer with expertise in handling multiple breeds. Certified in pet first aid.",
    location: "Downtown & Surrounding Areas",
    specialties: ["Small Dogs", "Senior Dogs", "Puppies"],
    availability: "Mon-Fri, 7AM-6PM",
  },
  {
    id: "2",
    name: "John Doe",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    rating: 4.8,
    reviews: 98,
    experience: "3+ years",
    bio: "Energetic dog lover specializing in high-energy breeds. Background in veterinary assistance.",
    location: "Westside & Beach Areas",
    specialties: ["Large Dogs", "Athletic Training", "Group Walks"],
    availability: "Mon-Sun, 6AM-8PM",
  },
  {
    id: "3",
    name: "Emily Johnson",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    rating: 5.0,
    reviews: 156,
    experience: "7+ years",
    bio: "Former shelter worker turned professional dog walker. Experienced with special needs pets.",
    location: "Eastside & Park District",
    specialties: ["Special Needs", "Behavioral Training", "Senior Dogs"],
    availability: "Tue-Sat, 8AM-5PM",
  },
];

export default function WalkersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  const filteredWalkers = walkers.filter((walker) => {
    const matchesSearch = walker.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty
      ? walker.specialties.includes(selectedSpecialty)
      : true;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Our Dog Walkers</h1>
        <p className="text-muted-foreground">
          Meet our experienced and caring dog walkers ready to take care of your
          furry friend.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="w-full md:w-64 space-y-4">
          <div className="relative">
            <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search walkers..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <WalkerFilter
            selectedSpecialty={selectedSpecialty}
            onSpecialtyChange={setSelectedSpecialty}
          />
        </div>

        <div className="flex-1 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWalkers.map((walker) => (
            <WalkerCard key={walker.id} walker={walker} />
          ))}
        </div>
      </div>
    </div>
  );
}
