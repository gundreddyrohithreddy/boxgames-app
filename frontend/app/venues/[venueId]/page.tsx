"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import AuthGuard from "@/components/auth/AuthGuard";
import DatePicker from "@/components/slots/DatePicker";
import SlotGrid from "@/components/slots/SlotGrid";
import BookingModal from "@/components/bookings/BookingModal";

export default function VenueDetails() {
  const { venueId }: any = useParams();
  const router = useRouter();

  const [venue, setVenue] = useState<any>(null);
  const [date, setDate] = useState<string>("");
  const [slotsData, setSlotsData] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [selectedCourt, setSelectedCourt] = useState<any>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [submittingReview, setSubmittingReview] = useState(false);

  // Load venue
  const fetchVenue = async () => {
    const res = await apiClient.get(`/venues/${venueId}`);
    setVenue(res?.venue || null);
  };

  const submitReview = async () => {
  if (!rating) {
    alert("Please select a rating");
    return;
  }
  setSubmittingReview(true);
  const res = await apiClient.post(`/reviews/venue/${venueId}`, {
    rating,
    comment,
  });
  setSubmittingReview(false);

  if (res?.review) {
    alert("Review submitted");
    setRating(0);
    setComment("");
    fetchVenue(); // reload venue with updated reviews
  } else {
    alert(res?.message || "Failed to submit review");
  }
};

  // Load slots for selected date
  const fetchSlots = async () => {
    if (!date) return;

    const res = await apiClient.get(`/slots/venue/${venueId}?date=${date}`);
    setSlotsData(res?.courts || []);
  };

  useEffect(() => {
    if (venueId) fetchVenue();
  }, [venueId]);

  useEffect(() => {
    fetchSlots();
  }, [date]);

const handleBook = async (slot) => {
  // Step 1: Create booking without payment
  const bookingRes = await apiClient.post("/bookings", {
    slotId: slot.id,
  });

  const booking = bookingRes.booking;

  // Step 2: Create Razorpay order
  const orderRes = await apiClient.post("/payments/create-order", {
    bookingId: booking.id,
  });

  const { orderId, amount, key } = orderRes;

  // Step 3: Open Razorpay checkout
  const options = {
    key: key,
    amount: amount,
    currency: "INR",
    name: "BoxGames",
    order_id: orderId,

    handler: async function (response) {
      await apiClient.post(`/payments/verify`, {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        signature: response.razorpay_signature,
        bookingId: booking.id,
      });

      alert("Payment successful!");

      router.push("/bookings");
    },

    theme: { color: "#4caf50" },
  };

  const razor = new window.Razorpay(options);
  razor.open();
};


  if (!venue) return <p>Loading venue...</p>;

  return (
    <AuthGuard>
      <div style={{ padding: 20 }}>
        <h1>{venue.name}</h1>
        <p>{venue.city}</p>
        <p>{venue.description}</p>

        <h3 style={{ marginTop: 30 }}>Choose Date</h3>
        <DatePicker date={date} setDate={setDate} />

        {date && (
          <>
            <h3>Available Slots</h3>
            <SlotGrid
              courts={slotsData || []}
              onSelect={(slot: any, court: any) => {
                setSelectedSlot(slot);
                setSelectedCourt(court);
              }}
            />
          </>
        )}

        <BookingModal
          slot={selectedSlot}
          court={selectedCourt}
          onClose={() => setSelectedSlot(null)}
          onConfirm={handleBook}
        />
      </div>
    </AuthGuard>
  );
}

{/* Reviews Section */}
<div style={{ marginTop: 40 }}>
  <h3>
    Reviews {venue.ratingCount ? `(${venue.ratingCount})` : ""}
  </h3>

  {venue.ratingAverage ? (
    <p>Average Rating: ⭐ {venue.ratingAverage.toFixed(1)} / 5</p>
  ) : (
    <p>No ratings yet</p>
  )}

  {/* Reviews list */}
  <div style={{ marginTop: 20 }}>
    {venue.reviews?.map((r: any) => (
      <div
        key={r.id}
        style={{
          borderBottom: "1px solid #eee",
          paddingBottom: 10,
          marginBottom: 10,
        }}
      >
        <p>
          ⭐ {r.rating} – {r.player?.name || "Player"}
        </p>
        {r.comment && <p>{r.comment}</p>}
      </div>
    ))}
  </div>

  {/* Add review form */}
  <div style={{ marginTop: 20 }}>
    <h4>Leave a Review</h4>

    <label>Rating</label>
    <select
      value={rating || ""}
      onChange={(e) => setRating(Number(e.target.value))}
      style={{ display: "block", marginBottom: 10 }}
    >
      <option value="">Select rating</option>
      <option value={5}>5 - Excellent</option>
      <option value={4}>4 - Good</option>
      <option value={3}>3 - Okay</option>
      <option value={2}>2 - Poor</option>
      <option value={1}>1 - Terrible</option>
    </select>

    <label>Comment (optional)</label>
    <textarea
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      style={{ width: "100%", minHeight: 80 }}
    />

    <button
      onClick={submitReview}
      disabled={submittingReview}
      style={{
        marginTop: 10,
        padding: "8px 16px",
        background: "#4caf50",
        color: "white",
        border: "none",
        cursor: "pointer",
      }}
    >
      {submittingReview ? "Submitting..." : "Submit Review"}
    </button>
  </div>
</div>
