"use client";

export default function SlotGrid({ courts, onSelect }: any) {
  return (
    <div style={{ marginTop: 20 }}>
      {courts.map((courtGroup: any) => (
        <div key={courtGroup.court.id} style={{ marginBottom: 40 }}>
          <h3>{courtGroup.court.name}</h3>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {courtGroup.slots.map((slot: any) => {
              const isAvailable = slot.status === "AVAILABLE";
              return (
                <button
                  key={slot.id}
                  onClick={() => isAvailable && onSelect(slot, courtGroup.court)}
                  disabled={!isAvailable}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 6,
                    background: isAvailable ? "#4caf50" : "#ccc",
                    color: "white",
                    cursor: isAvailable ? "pointer" : "not-allowed",
                  }}
                >
                  {new Date(slot.startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
