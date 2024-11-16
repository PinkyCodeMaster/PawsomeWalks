"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  walker: z.string().min(1),
});

const dummyWalkers = [
  { id: "1", name: "Sarah Smith" },
  { id: "2", name: "John Doe" },
  { id: "3", name: "Emily Johnson" },
];

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  selectedSlot: { start: Date; end: Date } | null;
}

export function BookingDialog({
  open,
  onOpenChange,
  onSubmit,
  selectedSlot,
}: BookingDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      walker: "",
    },
  });

  if (!selectedSlot) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book a Walk</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-muted-foreground mb-4">
          {format(selectedSlot.start, "MMMM do, h:mm a")} -{" "}
          {format(selectedSlot.end, "h:mm a")}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Walk Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Morning Walk" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="walker"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Walker</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a walker" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dummyWalkers.map((walker) => (
                        <SelectItem key={walker.id} value={walker.name}>
                          {walker.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Book Walk
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}