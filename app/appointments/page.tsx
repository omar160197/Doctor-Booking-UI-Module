"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBookingStore } from "@/src/store/bookingStore";

interface AppointmentDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: {
    doctorId: string;
    doctorName: string;
    doctorSpecialty: string;
    location: string;
    date: string;
    timeSlot: string;
  };
  onCancel: () => void;
}

function AppointmentDetails({
  isOpen,
  onClose,
  appointment,
  onCancel,
}: AppointmentDetailsProps) {
  const isMobile = useIsMobile();

  const content = (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-gray-500" />
        <span>{appointment.date}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-gray-500" />
        <span>{appointment.timeSlot}</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-gray-500" />
        <span>Doctor's Office</span>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Appointment Details</DrawerTitle>
            <DrawerDescription>
              With {appointment.doctorName}, {appointment.doctorSpecialty}
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4">{content}</div>
          <DrawerFooter>
            <Button variant="destructive" onClick={onCancel}>
              Cancel Appointment
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogDescription>
            With {appointment.doctorName}, {appointment.doctorSpecialty}
          </DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter>
          <Button variant="destructive" onClick={onCancel}>
            Cancel Appointment
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function Page() {
  const { bookedSlots, removeBookedSlot } = useBookingStore();
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const handleCancelAppointment = () => {
    if (selectedAppointment) {
      removeBookedSlot(selectedAppointment);
      setSelectedAppointment(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        My Appointments
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list" aria-label="Your appointments">
        {bookedSlots.map((appointment, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            role="listitem"
            aria-label={`Appointment with ${appointment.doctorName} on ${appointment.date} at ${appointment.timeSlot}`}
          >
            <CardContent
              className="p-4"
              onClick={() => setSelectedAppointment(appointment)}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{appointment.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{appointment.timeSlot}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedAppointment && (
        <AppointmentDetails
          isOpen={!!selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          appointment={selectedAppointment}
          onCancel={handleCancelAppointment}
        />
      )}
    </div>
  );
}
