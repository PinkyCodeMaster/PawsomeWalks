"use client";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { startOfWeek } from "date-fns/startOfWeek";
import { BookingDialog } from "./booking-dialog";
import { getDay } from "date-fns/getDay";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { useState } from "react";

const locales = {
  "en-GB": require("date-fns/locale/en-GB"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export type BookingEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  walker?: string;
};

const dummyEvents: BookingEvent[] = [
  {
    id: "1",
    title: "Morning Walk",
    start: new Date(2024, 2, 25, 9, 30),
    end: new Date(2024, 2, 25, 10, 30),
    walker: "Sarah Smith",
  },
  {
    id: "2",
    title: "Afternoon Walk",
    start: new Date(2024, 2, 26, 14, 0),
    end: new Date(2024, 2, 26, 15, 0),
    walker: "John Doe",
  },
];

export function BookingCalendar() {
  const [events, setEvents] = useState<BookingEvent[]>(dummyEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedSlot({ start, end });
    setIsDialogOpen(true);
  };

  const handleBookingSubmit = (bookingData: {
    title: string;
    walker: string;
  }) => {
    if (selectedSlot) {
      const newEvent: BookingEvent = {
        id: Math.random().toString(),
        title: bookingData.title,
        start: selectedSlot.start,
        end: selectedSlot.end,
        walker: bookingData.walker,
      };
      setEvents([...events, newEvent]);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="h-[600px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        step={30}
        timeslots={2}
        defaultView="week"
      />
      <BookingDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleBookingSubmit}
        selectedSlot={selectedSlot}
      />
    </div>
  );
}