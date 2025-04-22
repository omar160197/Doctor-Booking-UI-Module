"use client";

import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Review } from "@/src/types/doctor";
import { useIsMobile } from "@/hooks/use-mobile";

interface ReviewsDisplayProps {
  isOpen: boolean;
  onClose: () => void;
  doctorName: string;
  reviews: Review[];
}

export function ReviewsDisplay({
  isOpen,
  onClose,
  doctorName,
  reviews,
}: ReviewsDisplayProps) {
  const isMobile = useIsMobile();

  const renderStars = (value: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= value
              ? "text-yellow-400 fill-yellow-400"
              : i - 0.5 <= value
              ? "text-yellow-400 fill-yellow-200"
              : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  const content = (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">{renderStars(review.rating)}</div>
            <span className="text-sm font-medium">{review.userName}</span>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
          <p className="text-sm text-gray-600">{review.comment}</p>
        </div>
      ))}
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Reviews</DrawerTitle>
            <DrawerDescription>
              All reviews for Dr. {doctorName}
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4">{content}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reviews</DialogTitle>
          <DialogDescription>
            All reviews for Dr. {doctorName}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-2">{content}</div>
      </DialogContent>
    </Dialog>
  );
}
