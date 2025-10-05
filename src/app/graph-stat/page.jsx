"use client";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

export default function RatingStatPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/game-stats")
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Graph Rating Stat</h1>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rating" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#facc15" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
