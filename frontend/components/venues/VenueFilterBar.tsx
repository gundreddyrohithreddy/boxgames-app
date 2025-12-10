"use client";

export default function VenueFilterBar({
  setCity,
  setSportType,
  setQuery,
  setPriceMin,
  setPriceMax,
}: any) {
  return (
    <div style={{ display: "flex", gap: 20, marginBottom: 20, flexWrap: "wrap" }}>
      <input
        placeholder="Search by name"
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: 8, minWidth: 180 }}
      />

      <input
        placeholder="City"
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: 8, minWidth: 150 }}
      />

      <select
        onChange={(e) => setSportType(e.target.value)}
        style={{ padding: 8, minWidth: 150 }}
      >
        <option value="">All Sports</option>
        <option value="football">Football</option>
        <option value="cricket">Cricket</option>
        <option value="badminton">Badminton</option>
        <option value="tennis">Tennis</option>
      </select>

      <input
        type="number"
        placeholder="Min Price"
        onChange={(e) => setPriceMin(e.target.value)}
        style={{ padding: 8, width: 120 }}
      />

      <input
        type="number"
        placeholder="Max Price"
        onChange={(e) => setPriceMax(e.target.value)}
        style={{ padding: 8, width: 120 }}
      />
    </div>
  );
}
