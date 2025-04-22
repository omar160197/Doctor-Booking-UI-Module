"use client";

import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useState, useEffect } from "react";
import { useBookingStore } from "../store/bookingStore";

interface BookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  doctorName: string;
  doctorSpecialty: string;
  doctorId: string;
}

// Mock data for available time slots
const generateTimeSlots = () => {
  const slots = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
      const amPm = hour < 12 ? "AM" : "PM";
      const minuteFormatted = minute === 0 ? "00" : minute;
      slots.push(`${hourFormatted}:${minuteFormatted} ${amPm}`);
    }
  }

  return slots;
};

const availableDates = [
  {
    date: "Today",
    day: new Date().getDate(),
    month: new Date().toLocaleString("default", { month: "short" }),
  },
  {
    date: "Tomorrow",
    day: new Date(new Date().setDate(new Date().getDate() + 1)).getDate(),
    month: new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleString(
      "default",
      { month: "short" }
    ),
  },
  {
    date: "Day after tomorrow",
    day: new Date(new Date().setDate(new Date().getDate() + 2)).getDate(),
    month: new Date(new Date().setDate(new Date().getDate() + 2)).toLocaleString(
      "default",
      { month: "short" }
    ),
  },
];

export function BookingDrawer({
  isOpen,
  onClose,
  doctorName,
  doctorSpecialty,
  doctorId,
}: BookingDrawerProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const timeSlots = generateTimeSlots();
  const { addBookedSlot, getBookedSlots } = useBookingStore();
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  useEffect(() => {
    if (selectedDate) {
      const booked = getBookedSlots(doctorId, selectedDate);
      setBookedSlots(booked);
    }
  }, [selectedDate, doctorId, getBookedSlots]);

  const handleConfirmBooking = () => {
    if (selectedDate && selectedTimeSlot) {
      addBookedSlot({
        doctorId,
        doctorName,
        doctorSpecialty,
        location: "Doctor's Office", // This could be made dynamic if needed
        date: selectedDate,
        timeSlot: selectedTimeSlot,
      });
      alert(
        `Appointment confirmed with ${doctorName} on ${selectedDate} at ${selectedTimeSlot}`
      );
      onClose();
      setSelectedDate(null);
      setSelectedTimeSlot(null);
    } else {
      alert("Please select both a date and time slot");
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Book Appointment</DrawerTitle>
          <DrawerDescription>
            Schedule an appointment with {doctorName}, {doctorSpecialty}
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4">
          <h3 className="text-sm font-medium mb-3 flex items-center">
            <Calendar className="h-4 w-4 mr-2" /> Select Date
          </h3>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {availableDates.map((date) => (
              <button
                key={date.date}
                onClick={() => setSelectedDate(date.date)}
                aria-label={`Select date: ${date.date}, ${date.day} ${date.month}`}
                aria-pressed={selectedDate === date.date}
                className={`flex flex-col items-center justify-center p-3 rounded-md border transition-colors ${
                  selectedDate === date.date
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-xs text-gray-500">{date.date}</span>
                <span className="text-lg font-semibold">{date.day}</span>
                <span className="text-xs text-gray-500">{date.month}</span>
              </button>
            ))}
          </div>

          <h3 className="text-sm font-medium mb-3 flex items-center">
            <Clock className="h-4 w-4 mr-2" /> Select Time
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((timeSlot) => (
              <button
                key={timeSlot}
                onClick={() => setSelectedTimeSlot(timeSlot)}
                disabled={bookedSlots.includes(timeSlot)}
                aria-label={`Select time: ${timeSlot}`}
                aria-pressed={selectedTimeSlot === timeSlot}
                aria-disabled={bookedSlots.includes(timeSlot)}
                className={`py-2 px-3 text-sm rounded-md border transition-colors ${
                  selectedTimeSlot === timeSlot
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : bookedSlots.includes(timeSlot)
                    ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {timeSlot}
              </button>
            ))}
          </div>
        </div>

        <DrawerFooter>
          <Button
            onClick={handleConfirmBooking}
            disabled={!selectedDate || !selectedTimeSlot}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Confirm Booking
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
