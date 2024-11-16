"use client";

import { BookingCalendar } from "@/components/booking/calendar";
import { BookingForm } from "@/components/booking/form";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BookingPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Book a Walk</h1>
        <p className="text-muted-foreground">
          Schedule a walk for your furry friend with our trusted dog walkers.
        </p>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="form">Quick Book</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar" className="mt-6">
          <Card className="p-6">
            <BookingCalendar />
          </Card>
        </TabsContent>
        <TabsContent value="form" className="mt-6">
          <Card className="p-6">
            <BookingForm />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}