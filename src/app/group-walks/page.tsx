"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const initialGroupWalks = [
    {
      id: "1",
      title: "Morning Walk by the Thames",
      date: "2024-03-16T09:00:00Z", // Saturday (during current 4 days off)
      location: "Oxford University Parks",
      participants: 5,
      maxParticipants: 10,
    },
    {
      id: "2",
      title: "Afternoon Stroll Through Shotover",
      date: "2024-03-17T14:00:00Z", // Sunday (during current 4 days off)
      location: "Shotover Country Park",
      participants: 4,
      maxParticipants: 8,
    },
    {
      id: "3",
      title: "Evening Group Walk Around Christchurch",
      date: "2024-03-22T17:30:00Z", // Friday (next 4 days off starts)
      location: "Christchurch Meadows",
      participants: 6,
      maxParticipants: 12,
    },
    {
      id: "4",
      title: "Weekend Social Walk in Port Meadow",
      date: "2024-03-23T10:30:00Z", // Saturday (next 4 days off)
      location: "Port Meadow",
      participants: 5,
      maxParticipants: 10,
    },
    {
      id: "5",
      title: "Sunday Morning Chill Walk",
      date: "2024-03-24T09:00:00Z", // Sunday (next 4 days off)
      location: "Iffley Meadows",
      participants: 3,
      maxParticipants: 6,
    },
  ];
  

export default function GroupWalksPage() {
  const [groupWalks, setGroupWalks] = useState(initialGroupWalks);
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);
  const [filterLocation, setFilterLocation] = useState("");
  const [isCreateWalkOpen, setIsCreateWalkOpen] = useState(false);
  const [newWalk, setNewWalk] = useState({
    title: "",
    date: new Date(),
    location: "",
    maxParticipants: 10,
  });

  const filteredWalks = groupWalks.filter((walk) => {
    const matchesDate = filterDate
      ? new Date(walk.date).toDateString() === filterDate.toDateString()
      : true;
    const matchesLocation = filterLocation
      ? walk.location.toLowerCase().includes(filterLocation.toLowerCase())
      : true;
    return matchesDate && matchesLocation;
  });

  const handleCreateWalk = () => {
    const createdWalk = {
      id: Date.now().toString(),
      ...newWalk,
      participants: 0,
      date: newWalk.date.toISOString(),
    };
    setGroupWalks([...groupWalks, createdWalk]);
    setIsCreateWalkOpen(false);
    setNewWalk({
      title: "",
      date: new Date(),
      location: "",
      maxParticipants: 10,
    });
  };

  const handleJoinWalk = (walkId: string) => {
    setGroupWalks(
      groupWalks.map((walk) =>
        walk.id === walkId && walk.participants < walk.maxParticipants
          ? { ...walk, participants: walk.participants + 1 }
          : walk
      )
    );
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Group Walks</h1>
        <p className="text-muted-foreground">
          Join group walks with other dog owners or create your own!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="w-full sm:w-64 space-y-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !filterDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filterDate ? format(filterDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filterDate}
                onSelect={setFilterDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Input
            placeholder="Filter by location..."
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          />
          <Button className="w-full" onClick={() => setIsCreateWalkOpen(true)}>
            Create Group Walk
          </Button>
        </div>

        <div className="flex-1 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWalks.map((walk) => (
            <Card key={walk.id}>
              <CardHeader>
                <CardTitle>{walk.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="flex items-center text-muted-foreground">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(new Date(walk.date), "PPP")}
                </p>
                <p className="flex items-center text-muted-foreground mt-2">
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  {walk.location}
                </p>
                <p className="flex items-center text-muted-foreground mt-2">
                  <UsersIcon className="mr-2 h-4 w-4" />
                  {walk.participants} / {walk.maxParticipants} participants
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => handleJoinWalk(walk.id)}
                  disabled={walk.participants >= walk.maxParticipants}
                >
                  {walk.participants >= walk.maxParticipants ? "Full" : "Join Walk"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isCreateWalkOpen} onOpenChange={setIsCreateWalkOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Group Walk</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newWalk.title}
                onChange={(e) => setNewWalk({ ...newWalk, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newWalk.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newWalk.date ? format(newWalk.date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newWalk.date}
                    onSelect={(date) => setNewWalk({ ...newWalk, date: date || new Date() })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newWalk.location}
                onChange={(e) => setNewWalk({ ...newWalk, location: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="maxParticipants">Max Participants</Label>
              <Select
                value={newWalk.maxParticipants.toString()}
                onValueChange={(value) => setNewWalk({ ...newWalk, maxParticipants: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select max participants" />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 15, 20].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" onClick={handleCreateWalk}>
              Create Walk
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}