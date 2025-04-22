"use client";

import { useState } from "react";
import { RatingDisplay } from "./RatingDisplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, DollarSign, MapPin, ThumbsUp } from "lucide-react";
import { BookingModal } from "./BookingModal";
import { BookingDrawer } from "./BookingDrawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { DoctorFilters, FilterState } from "./DoctorsFilter";
import { Review } from "../types/doctor";
import { useBookingStore } from "../store/bookingStore";

interface Doctor {
  id: number;
  name: string;
  qualification: string;
  specialty: string;
  experience: number;
  rating: number;
  reviews: Review[];
  location: string;
  availableDay: string;
  startTime: string;
  endTime: string;
  likes: number;
  price: number;
  currency: string;
  image: string;
  verified: boolean;
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Felicity Simard",
    qualification: "M.B.B.S",
    specialty: "Gastrologist",
    experience: 6,
    rating: 4.9,
    reviews: [
      {
        id: 1,
        userId: "user1",
        userName: "John Doe",
        rating: 5,
        comment: "Excellent doctor, very thorough and professional",
        date: "2024-04-15",
      },
      {
        id: 2,
        userId: "user2",
        userName: "Jane Smith",
        rating: 4.8,
        comment: "Very knowledgeable and patient",
        date: "2024-04-10",
      },
    ],
    location: "Solo, Indonesia",
    availableDay: "Mon",
    startTime: "2:00PM",
    endTime: "6:00PM",
    likes: 90,
    price: 75,
    currency: "USD",
    image:
      "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    verified: true,
  },
  {
    id: 2,
    name: "Dr. Cristino Murphy",
    qualification: "M.B.B.S",
    specialty: "Gastrologist",
    experience: 10,
    rating: 4.8,
    reviews: [
      {
        id: 3,
        userId: "user3",
        userName: "Mike Johnson",
        rating: 4.8,
        comment: "Great experience, would recommend",
        date: "2024-04-12",
      },
    ],
    location: "Solo, Indonesia",
    availableDay: "Mon",
    startTime: "2:00PM",
    endTime: "6:00PM",
    likes: 90,
    price: 75,
    currency: "USD",
    image:
      "https://images.pexels.com/photos/5934411/pexels-photo-5934411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    verified: true,
  },
  {
    id: 3,
    name: "Dr. Jessica McFarlane",
    qualification: "M.B.B.S",
    specialty: "Dentist",
    experience: 6,
    rating: 3.8,
    reviews: [
      {
        id: 4,
        userId: "user4",
        userName: "Sarah Wilson",
        rating: 3.8,
        comment: "Good doctor but long waiting times",
        date: "2024-04-14",
      },
    ],
    location: "Solo, Indonesia",
    availableDay: "Mon",
    startTime: "2:00PM",
    endTime: "6:00PM",
    likes: 90,
    price: 75,
    currency: "USD",
    image:
      "https://images.pexels.com/photos/7407049/pexels-photo-7407049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    verified: true,
  },
];

function DoctorCard({ doctor }: { doctor: Doctor }) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <Card
        className="overflow-hidden"
        role="article"
        aria-label={`Doctor ${doctor.name}`}
      >
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-48 aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={doctor.image || "/placeholder.svg"}
                alt={`Profile photo of ${doctor.name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-700">
                      {doctor.name}
                    </h2>
                    {doctor.verified && (
                      <CheckCircle className="h-5 w-5 text-blue-500 fill-blue-500" />
                    )}
                  </div>
                  <p className="text-gray-600">
                    {doctor.qualification}, {doctor.specialty}-{" "}
                    {doctor.experience} Years of Experience
                  </p>
                  <RatingDisplay
                    rating={doctor.rating}
                    reviews={doctor.reviews}
                    onAddReview={(rating, comment) => {
                      const newReview: Review = {
                        id: Date.now(),
                        userId: "current-user", // This would come from auth in a real app
                        userName: "Current User", // This would come from auth in a real app
                        rating: rating,
                        comment: comment,
                        date: new Date().toISOString().split("T")[0],
                      };
                      useBookingStore
                        .getState()
                        .addReview(doctor.id.toString(), newReview);
                    }}
                  />
                  <div className="w-full flex flex-col sm:flex-row flex-wrap gap-2 mt-2">
                    <div className="flex items-center min-w-[140px] text-[12px] text-gray-600">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      {doctor.location}
                    </div>
                    <div className="flex items-center min-w-[140px] text-[12px] text-gray-600">
                      <DollarSign className="h-4 w-4 mr-1 text-gray-400" />$
                      {doctor.price} {doctor.currency} / Visit
                    </div>
                    <div className="flex items-center min-w-[140px] text-[12px] text-gray-600">
                      <ThumbsUp className="h-4 w-4 mr-1 text-gray-400" />
                      {doctor.likes}% likes
                    </div>
                    <div className="flex items-center min-w-[140px] text-[12px] text-gray-600">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      {doctor.availableDay}: {doctor.startTime} -{" "}
                      {doctor.endTime}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center h-full gap-2 mt-4 md:mt-0 md:items-center">
                  <Button
                    className="w-full md:w-48 bg-blue-600 hover:bg-blue-700 !text-white"
                    onClick={() => setIsBookingModalOpen(true)}
                  >
                    Book Appointment
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full md:w-48 text-blue-600 hover:text-white hover:bg-blue-700 border-blue-600"
                  >
                    Online Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {isMobile ? (
        <BookingDrawer
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          doctorName={doctor.name}
          doctorSpecialty={doctor.specialty}
          doctorId={doctor.id.toString()}
        />
      ) : (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          doctorName={doctor.name}
          doctorSpecialty={doctor.specialty}
          doctorId={doctor.id.toString()}
        />
      )}
    </>
  );
}

export default function AppointmentCards() {
  const [filters, setFilters] = useState<FilterState>({
    specialty: "All",
    date: null,
    timeSlot: null,
  });

  const filteredDoctors = doctors.filter((doctor) => {
    // Filter by specialty
    if (filters.specialty !== "All" && doctor.specialty !== filters.specialty) {
      return false;
    }

    // Filter by date/time if selected
    if (filters.date || filters.timeSlot) {
      const isTimeInRange =
        !filters.timeSlot ||
        (doctor.startTime <= filters.timeSlot &&
          doctor.endTime >= filters.timeSlot);

      return isTimeInRange;
    }

    return true;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Appointment</h1>
      <DoctorFilters filters={filters} onFilterChange={setFilters} />
      {filteredDoctors.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">
            No doctors found with the selected specialty.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
}
