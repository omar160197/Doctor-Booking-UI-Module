import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Review } from '@/src/types/doctor'

interface BookedSlot {
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  location: string;
  date: string;
  timeSlot: string;
}

interface BookingStore {
  bookedSlots: BookedSlot[];
  doctorReviews: { [doctorId: string]: Review[] };
  addBookedSlot: (slot: BookedSlot) => void;
  removeBookedSlot: (slot: BookedSlot) => void;
  getBookedSlots: (doctorId: string, date: string) => string[];
  addReview: (doctorId: string, review: Review) => void;
  getReviews: (doctorId: string) => Review[];
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookedSlots: [],
      doctorReviews: {},
      addBookedSlot: (slot) => 
        set((state) => ({
          bookedSlots: [...state.bookedSlots, slot]
        })),
      removeBookedSlot: (slot) =>
        set((state) => ({
          bookedSlots: state.bookedSlots.filter(
            s => !(s.doctorId === slot.doctorId && 
                  s.date === slot.date && 
                  s.timeSlot === slot.timeSlot)
          )
        })),
      getBookedSlots: (doctorId, date) => 
        get().bookedSlots
          .filter(slot => slot.doctorId === doctorId && slot.date === date)
          .map(slot => slot.timeSlot),
      addReview: (doctorId, review) =>
        set((state) => ({
          doctorReviews: {
            ...state.doctorReviews,
            [doctorId]: [...(state.doctorReviews[doctorId] || []), review]
          }
        })),
      getReviews: (doctorId) => get().doctorReviews[doctorId] || []
    }),
    {
      name: 'booking-storage',
    }
  )
)
