"use client";

import { useState } from "react";
import { Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Review } from "@/src/types/doctor";
import { ReviewsDisplay } from "./ReviewsDisplay";

interface RatingDisplayProps {
  rating: number;
  reviews: Review[];
  onAddReview?: (rating: number, comment: string) => void;
}

export function RatingDisplay({
  rating,
  reviews,
  onAddReview,
}: RatingDisplayProps) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReviewsListOpen, setIsReviewsListOpen] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmitReview = () => {
    if (onAddReview) {
      onAddReview(newRating, comment);
      setIsReviewModalOpen(false);
      setNewRating(0);
      setComment("");
    }
  };

  const renderStars = (value: number, isInteractive = false) => {
    const stars = [];
    const displayValue = isInteractive ? hoverRating || newRating : value;

    for (let i = 1; i <= 5; i++) {
      const starValue = i;
      stars.push(
        <button
          key={i}
          className={`${isInteractive ? "cursor-pointer" : "cursor-default"}`}
          onClick={() => isInteractive && setNewRating(starValue)}
          onMouseEnter={() => isInteractive && setHoverRating(starValue)}
          onMouseLeave={() => isInteractive && setHoverRating(0)}
        >
          <Star
            className={`w-5 h-5 ${
              starValue <= displayValue
                ? "text-yellow-400 fill-yellow-400"
                : starValue - 0.5 <= displayValue
                ? "text-yellow-400 fill-yellow-200"
                : "text-gray-300"
            }`}
          />
        </button>
      );
    }
    return stars;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex">{renderStars(rating)}</div>
        <span className="text-sm text-gray-500">
          ({rating.toFixed(1)}) · {reviews.length} reviews
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-800"
          onClick={() => setIsReviewModalOpen(true)}
        >
          Add Review
        </Button>
      </div>

      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Your Review</DialogTitle>
            <DialogDescription>
              Share your experience with this doctor
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex justify-center">
              <div className="flex gap-1">{renderStars(newRating, true)}</div>
            </div>
            <Textarea
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsReviewModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReview}
              disabled={!newRating || !comment.trim()}
            >
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {reviews.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-800 mt-2"
          onClick={() => setIsReviewsListOpen(true)}
        >
          View all {reviews.length} reviews
        </Button>
      )}
      <ReviewsDisplay
        isOpen={isReviewsListOpen}
        onClose={() => setIsReviewsListOpen(false)}
        doctorName="Doctor Name"
        reviews={reviews}
      />
    </div>
  );
}
