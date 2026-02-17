"use client";

import { useState } from "react";

export default function FlightSearchForm() {
  const [mode, setMode] = useState("round_trip");

  const [form, setForm] = useState({
    departure_id: "",
    arrival_id: "",
    outbound_date: "",
    return_date: "",
    currency: "USD",
    hl: "en",
  });

  const [legs, setLegs] = useState([
    { departure_id: "", arrival_id: "", date: "" },
    { departure_id: "", arrival_id: "", date: "" },
  ]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLegChange = (index, field, value) => {
    const updated = [...legs];
    updated[index][field] = value;
    setLegs(updated);
  };

  const addLeg = () => {
    setLegs([...legs, { departure_id: "", arrival_id: "", date: "" }]);
  };

  const removeLeg = (index) => {
    if (legs.length <= 2) return;
    const updated = legs.filter((_, i) => i !== index);
    setLegs(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload;

    if (mode === "multi_city") {
      payload = {
        mode,
        currency: form.currency,
        hl: form.hl,
        legs,
      };
    } else {
      payload = {
        mode,
        ...form,
      };
      // If 'one_way', remove return_date from payload (if API expects not to see it)
      if (mode === "one_way") {
        delete payload.return_date;
      }
    }

    try {
      const res = await fetch("/api/google-flights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("API Error:", res.status, errorText);
        alert("API error: " + errorText);
        return;
      }

      const data = await res.json();
      console.log("Flight Results:", data);
      // Optionally show results to user instead of just console.log
    } catch (err) {
      console.error("Network or Unhandled Error:", err);
      alert("There was an error submitting the form. See console for details.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Search Flights</h2>

      {/* Trip Type */}
      <div className="flex gap-4 mb-6">
        {["one_way", "round_trip", "multi_city"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setMode(type)}
            className={`px-4 py-2 rounded ${
              mode === type ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {type.replace("_", " ").toUpperCase()}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* ONE WAY & ROUND TRIP */}
        {mode !== "multi_city" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="departure_id"
                placeholder="From (e.g. DEL)"
                value={form.departure_id}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <input
                type="text"
                name="arrival_id"
                placeholder="To (e.g. JFK)"
                value={form.arrival_id}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                name="outbound_date"
                value={form.outbound_date}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              {mode === "round_trip" && (
                <input
                  type="date"
                  name="return_date"
                  value={form.return_date}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
              )}
            </div>
          </>
        )}

        {/* MULTI CITY */}
        {mode === "multi_city" && (
          <div className="space-y-4">
            {legs.map((leg, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-3 items-center"
              >
                <input
                  type="text"
                  placeholder="From (DEL)"
                  value={leg.departure_id}
                  onChange={(e) =>
                    handleLegChange(index, "departure_id", e.target.value)
                  }
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="To (JFK)"
                  value={leg.arrival_id}
                  onChange={(e) =>
                    handleLegChange(index, "arrival_id", e.target.value)
                  }
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="date"
                  value={leg.date}
                  onChange={(e) =>
                    handleLegChange(index, "date", e.target.value)
                  }
                  className="border p-2 rounded"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeLeg(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addLeg}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              + Add Another Flight
            </button>
          </div>
        )}

        {/* Common Fields */}
        <div className="grid grid-cols-2 gap-4">
          <select
            name="currency"
            value={form.currency}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="USD">USD</option>
            <option value="INR">INR</option>
            <option value="EUR">EUR</option>
          </select>

          <select
            name="hl"
            value={form.hl}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded mt-4"
        >
          Search Flights
        </button>
      </form>
    </div>
  );
}
