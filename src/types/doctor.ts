export interface Doctor {
  id: number;
  name: string;
  qualification: string;
  specialty: string;
  experience: number;
  rating: number;
  reviews: Review[];
  location: string;
  availableDay: string[];
  availableTimeSlots: {
    day: string;
    slots: string[];
  }[];
  likes: number;
  price: number;
  currency: string;
  image: string;
  verified: boolean;
}

export interface Review {
  id: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface DoctorFilters {
  specialty: string;
  availability: {
    day: string;
    timeSlot: string;
  };
  rating: number | null;
}
