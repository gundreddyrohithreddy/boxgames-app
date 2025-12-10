"use client";

export default function BookingModal({ slot, court, onClose, onConfirm }: any) {
  if (!slot) return null;

  const start = new Date(slot.startTime);
  const end = new Date(slot.endTime);

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ background: "white", padding: 30, borderRadius: 10, width: 350 }}>
        <h2>Confirm Booking</h2>
        <p>Court: <b>{court.name}</b></p>
        <p>Sport: {court.sportType}</p>
        <p>Price: ₹{court.pricePerHour}</p>
        <p>
          Time: <b>
            {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            {" - "}
            {end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </b>
        </p>

        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
          <button onClick={onClose}>Cancel</button>
          <button
            style={{ background: "#4caf50", color: "white", padding: "8px 12px" }}
            onClick={() => onConfirm(slot)}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
