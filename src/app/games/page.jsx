// "use client";
// import { useEffect, useState } from "react";

// export default function GameListPage() {
//   const [games, setGames] = useState([]);
//   const [filters, setFilters] = useState({
//     name: "",
//     genre: "",
//     release_year: "",
//     rating: "",
//   });

//   const fetchGames = () => {
//     const params = new URLSearchParams();

//     if (filters.name) params.append("name", filters.name);
//     if (filters.genre) params.append("genre", filters.genre);
//     if (filters.release_year) params.append("release_year", filters.release_year);
//     if (filters.rating) params.append("rating", filters.rating);

//     fetch(`/api/games?${params.toString()}`)
//       .then((res) => res.json())
//       .then((data) => setGames(data));
//   };

//   useEffect(() => {
//     fetchGames();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">🎮 Game List</h1>

//       {/* ✅ Search Form */}
//       <div className="mb-6 grid grid-cols-2 gap-4">
//         <input
//           type="text"
//           placeholder="Search by Name"
//           className="p-2 border rounded"
//           value={filters.name}
//           onChange={(e) => setFilters({ ...filters, name: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Search by Genre"
//           className="p-2 border rounded"
//           value={filters.genre}
//           onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Release Year"
//           className="p-2 border rounded"
//           value={filters.release_year}
//           onChange={(e) => setFilters({ ...filters, release_year: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Min Rating"
//           className="p-2 border rounded"
//           value={filters.rating}
//           onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
//         />
//         <button
//           onClick={fetchGames}
//           className="col-span-2 bg-blue-600 text-white p-2 rounded"
//         >
//           🔍 Search
//         </button>
//       </div>

//       {/* ✅ Game List */}
//       <ul className="space-y-4">
//         {games.map((game) => (
//           <li key={game._id || game.game_id} className="p-4 border rounded-lg shadow">
//             <h2 className="text-lg font-semibold">{game.name}</h2>
//             <p className="text-gray-700">{game.description}</p>
//             <p className="text-sm text-gray-500">Release Year: {game.release_year}</p>
//             <p className="text-sm text-gray-500">Platform: {game.platform_name}</p>
//             <p className="text-sm text-gray-500">Genre: {game.genre_name}</p>
//             <p className="text-sm text-gray-500">Rating: {game.rating ?? "N/A"}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";

export default function GameListPage() {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    genre: "",
    release_year: "",
    rating: "",
  });

  // โหลดเกม
  const fetchGames = () => {
    const params = new URLSearchParams();

    if (filters.name) params.append("name", filters.name);
    if (filters.genre) params.append("genre", filters.genre);
    if (filters.release_year) params.append("release_year", filters.release_year);
    if (filters.rating) params.append("rating", filters.rating);

    fetch(`/api/games?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setGames(data));
  };

  // โหลด genre
  const fetchGenres = async () => {
    const res = await fetch("/api/genre");
    const data = await res.json();
    setGenres(data);
  };

  useEffect(() => {
    fetchGames();
    fetchGenres();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎮 Game List</h1>

      {/* Search Form */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Search by Name"
          className="p-2 border rounded"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />

        {/* Dropdown genre */}
        <select
          className="p-2 border rounded"
          value={filters.genre}
          onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.genre_id} value={g.name}>
              {g.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Release Year"
          className="p-2 border rounded"
          value={filters.release_year}
          onChange={(e) => setFilters({ ...filters, release_year: e.target.value })}
        />
        <input
          type="number"
          placeholder="Min Rating"
          className="p-2 border rounded"
          value={filters.rating}
          onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
        />
        <button
          onClick={fetchGames}
          className="col-span-2 bg-blue-600 text-white p-2 rounded"
        >
          🔍 Search
        </button>
      </div>

      {/* Game List */}
      <ul className="space-y-4">
        {games.map((game) => (
          <li key={game._id || game.game_id} className="p-4 border rounded-lg shadow">
            <h2 className="text-lg font-semibold">{game.name}</h2>
            <p className="text-gray-700">{game.description}</p>
            <p className="text-sm text-gray-500">Release Year: {game.release_year}</p>
            <p className="text-sm text-gray-500">Platform: {game.platform_name}</p>
            <p className="text-sm text-gray-500">Genre: {game.genre_name}</p>
            <p className="text-sm text-gray-500">Rating: {game.rating ?? "N/A"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

