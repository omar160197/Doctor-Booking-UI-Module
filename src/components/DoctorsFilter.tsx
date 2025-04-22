"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMediaQuery } from "@/hooks/use-media-query";

export type Specialty =
  | "All"
  | "Gastrologist"
  | "Dentist"
  | "Cardiologist"
  | "Neurologist"
  | "Pediatrician"
  | "Dermatologist";

export interface FilterState {
  specialty: Specialty;
  date: string | null;
  timeSlot: string | null;
}

interface DoctorFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

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

export function DoctorFilters({
  filters,
  onFilterChange,
}: DoctorFiltersProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const specialties: Specialty[] = [
    "All",
    "Gastrologist",
    "Dentist",
    "Cardiologist",
    "Neurologist",
    "Pediatrician",
    "Dermatologist",
  ];

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2">
          {isDesktop ? (
            <Tabs
              defaultValue={filters.specialty}
              onValueChange={(value) => onFilterChange({ ...filters, specialty: value as Specialty })}
            >
              <TabsList className="w-full justify-start overflow-x-auto">
                {specialties.map((specialty) => (
                  <TabsTrigger key={specialty} value={specialty} className="px-4">
                    {specialty}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          ) : (
            <div className="flex items-center">
              <span className="mr-2 text-sm font-medium">Specialty:</span>
              <Select
                value={filters.specialty}
                onValueChange={(value) => onFilterChange({ ...filters, specialty: value as Specialty })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Date</label>
          <Select
            value={filters.date || ""}
            onValueChange={(value) => onFilterChange({ ...filters, date: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select date" />
            </SelectTrigger>
            <SelectContent>
              {availableDates.map((date) => (
                <SelectItem key={date.date} value={date.date}>
                  {date.date} ({date.day} {date.month})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Time</label>
          <Select
            value={filters.timeSlot || ""}
            onValueChange={(value) => onFilterChange({ ...filters, timeSlot: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
