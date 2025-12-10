"use client";

export default function DatePicker({ date, setDate }: any) {
  return (
    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      style={{ padding: 10, fontSize: 16, marginBottom: 20 }}
    />
  );
}
