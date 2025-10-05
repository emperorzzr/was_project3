"use client";
import { useEffect, useState } from "react";

export default function TopRatingPage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("/api/games/top-rating")
      .then((res) => res.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🌟 Top Rated Games (Rating 5)</h1>

      <ul className="space-y-4">
        {games.map((game) => (
          <li key={game._id || game.game_id} className="p-4 border rounded-lg shadow">
            <h2 className="text-lg font-semibold">{game.name}</h2>
            <p>{game.description}</p>
            <p className="text-sm text-gray-500">Year: {game.release_year}</p>
            <p className="text-sm text-gray-500">Platform: {game.platform_name}</p>
            <p className="text-sm text-gray-500">Genre: {game.genre_name}</p>
            <p className="text-sm text-yellow-500 font-semibold">Rating: {game.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
