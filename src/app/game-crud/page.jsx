// "use client";
// import { useEffect, useState } from "react";

// export default function GameCrudPage() {
//   const [games, setGames] = useState([]);
//   const [platforms, setPlatforms] = useState([]);
//   const [genres, setGenres] = useState([]);
//   const [editingGameId, setEditingGameId] = useState(null);
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     release_year: 2025,
//     platform_id: "",
//     genre_id: "",
//   });

//   const releaseYears = Array.from({ length: 10 }, (_, i) => 2025 - i); // last 10 years

//   // โหลดข้อมูล
//   const fetchGames = async () => {
//     const res = await fetch("/api/games");
//     const data = await res.json();
//     setGames(data);
//   };
//   const fetchPlatforms = async () => {
//     const res = await fetch("/api/platform");
//     setPlatforms(await res.json());
//   };
//   const fetchGenres = async () => {
//     const res = await fetch("/api/genre");
//     setGenres(await res.json());
//   };

//   useEffect(() => {
//     fetchGames();
//     fetchPlatforms();
//     fetchGenres();
//   }, []);

//   // Add game
//   const addGame = async () => {
//     if (!form.name || !form.description || !form.release_year || !form.platform_id || !form.genre_id) {
//       alert("กรุณากรอกทุกช่อง");
//       return;
//     }
//     await fetch("/api/games", {
//       method: "POST",
//       body: JSON.stringify(form),
//       headers: { "Content-Type": "application/json" },
//     });
//     setForm({ name: "", description: "", release_year: 2025, platform_id: "", genre_id: "" });
//     fetchGames();
//   };

//   // Delete game
//   const deleteGame = async (id) => {
//     console.log(id)
//     await fetch(`/api/games?id=${id}`, { method: "DELETE" });
//     fetchGames();
//   };
 

//   // Update game (ตัวอย่างแก้ชื่อ)
//   const updateGame = async (id, updated) => {
//     console.log(id)
//     console.log(updated)
//     await fetch(`/api/games?id=${id}`, {
//       method: "PUT",
//       body: JSON.stringify(updated),
//       headers: { "Content-Type": "application/json" },
//     });
//     fetchGames();
//   };

//   const startEditing = (game) => {
//     setEditingGameId(game.game_id);
//     setForm({
//       name: game.name,
//       description: game.description,
//       release_year: game.release_year,
//       platform_id: game.platform_id,
//       genre_id: game.genre_id,
//     });
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">⚙️ Game CRUD</h1>

//       {/* ฟอร์มเพิ่มเกม */}
//       <div className="mb-6 space-y-2">
//         <input
//           className="border p-2 w-full"
//           placeholder="Game Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />
//         <input
//           className="border p-2 w-full"
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />

//         {/* Release Year Dropdown */}
//         <select
//           className="border p-2 w-full"
//           value={form.release_year}
//           onChange={(e) => setForm({ ...form, release_year: Number(e.target.value) })}
//         >
//           {releaseYears.map((year) => (
//             <option key={year} value={year}>{year}</option>
//           ))}
//         </select>

//         {/* Platform Dropdown */}
//         <select
//           className="border p-2 w-full"
//           value={form.platform_id}
//           onChange={(e) => setForm({ ...form, platform_id: Number(e.target.value) })}
//         >
//           <option value="">Select Platform</option>
//           {platforms.map((p) => (
//             <option key={p.platform_id} value={p.platform_id}>{p.name}</option>
//           ))}
//         </select>

//         {/* Genre Dropdown */}
//         <select
//           className="border p-2 w-full"
//           value={form.genre_id}
//           onChange={(e) => setForm({ ...form, genre_id: Number(e.target.value) })}
//         >
//           <option value="">Select Genre</option>
//           {genres.map((g) => (
//             <option key={g.genre_id} value={g.genre_id}>{g.name}</option>
//           ))}
//         </select>

//         <button
//           onClick={addGame}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           ➕ Add Game
//         </button>
//       </div>

//       {/* แสดงรายการเกม */}
//       <ul className="space-y-4">
//         {games.map((game) => (
//           <li
//             key={game._id}
//             className="p-4 border rounded-lg shadow flex justify-between"
//           >
//             <div>
//               <h2 className="text-lg font-semibold">{game.name}</h2>
//               <p>{game.description}</p>
//               <p className="text-sm text-gray-500">Year: {game.release_year}</p>
//               <p className="text-sm text-gray-500">Platform: {game.platform_name}</p>
//               <p className="text-sm text-gray-500">Genre: {game.genre_name}</p>
//             </div>
//             <div className="space-x-2">
//               <button
//                 onClick={() =>
//                   startEditing(game)
//                 }
//                 className="bg-blue-500 text-white px-3 py-1 rounded"
//               >
//                 ✏️ Edit
//               </button>
//               <button
//                 onClick={() => deleteGame(game._id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 🗑️ Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

      
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";

export default function GameCrudPage() {
  const [games, setGames] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [editingGame, setEditingGame] = useState(null); // game object being edited
  const [form, setForm] = useState({
    name: "",
    description: "",
    release_year: 2025,
    platform_id: "",
    genre_id: "",
  });

  const releaseYears = Array.from({ length: 10 }, (_, i) => 2025 - i);

  const fetchGames = async () => {
    const res = await fetch("/api/games");
    const data = await res.json();
    setGames(data);
  };

  const fetchPlatforms = async () => {
    const res = await fetch("/api/platform");
    setPlatforms(await res.json());
  };

  const fetchGenres = async () => {
    const res = await fetch("/api/genre");
    setGenres(await res.json());
  };

  useEffect(() => {
    fetchGames();
    fetchPlatforms();
    fetchGenres();
  }, []);

  const addGame = async () => {
     if (!form.name) {
      alert("Please enter name ");
      return;
    }
    if (!form.description) {
      alert("Please enter description ");
      return;
    }
    if (!form.release_year) {
      alert("Please select release year ");
      return;
    }
    if (!form.platform_id) {
      alert("Please select platform ");
      return;
    }
    if (!form.genre_id) {
      alert("Please select genre ");
      return;
    }
    await fetch("/api/games", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    setForm({ name: "", description: "", release_year: 2025, platform_id: "", genre_id: "" });
    fetchGames();
  };

  const deleteGame = async (id) => {
    await fetch(`/api/games?id=${id}`, { method: "DELETE" });
    fetchGames();
  };

  const openEditModal = (game) => {
    setEditingGame(game);
    setForm({
      name: game.name,
      description: game.description,
      release_year: game.release_year,
      platform_id: game.platform_id,
      genre_id: game.genre_id,
    });
  };

  const closeEditModal = () => {
    setEditingGame(null);
    setForm({ name: "", description: "", release_year: 2025, platform_id: "", genre_id: "" });
  };

  const updateGame = async () => {
    console.log(form)
    console.log(editingGame.game_id)
    if (!form.name) {
      alert("Please enter name ");
      return;
    }
    if (!form.description) {
      alert("Please enter description ");
      return;
    }
    if (!form.release_year) {
      alert("Please select release year ");
      return;
    }
    if (!form.platform_id) {
      alert("Please select platform ");
      return;
    }
    if (!form.genre_id) {
      alert("Please select genre ");
      return;
    }
    await fetch(`/api/games?id=${editingGame.game_id}`, {
      method: "PUT",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    closeEditModal();
    fetchGames();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">⚙️ Game CRUD</h1>

      {/* Form Add Game */}
      <div className="mb-6 space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Game Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <select
          className="border p-2 w-full"
          value={form.release_year}
          onChange={(e) => setForm({ ...form, release_year: Number(e.target.value) })}
        >
          {releaseYears.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select
          className="border p-2 w-full"
          value={form.platform_id}
          onChange={(e) => setForm({ ...form, platform_id: Number(e.target.value) })}
        >
          <option value="">Select Platform</option>
          {platforms.map((p) => (
            <option key={p.platform_id} value={p.platform_id}>{p.name}</option>
          ))}
        </select>
        <select
          className="border p-2 w-full"
          value={form.genre_id}
          onChange={(e) => setForm({ ...form, genre_id: Number(e.target.value) })}
        >
          <option value="">Select Genre</option>
          {genres.map((g) => (
            <option key={g.genre_id} value={g.genre_id}>{g.name}</option>
          ))}
        </select>
        <button
          onClick={addGame}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          ➕ Add Game
        </button>
      </div>

      {/* List Games */}
      <ul className="space-y-4">
        {games.map((game) => (
          <li key={game.game_id} className="p-4 border rounded-lg shadow flex justify-between">
            <div>
              <h2 className="text-lg font-semibold">{game.name}</h2>
              <p>{game.description}</p>
              <p className="text-sm text-gray-500">Year: {game.release_year}</p>
              <p className="text-sm text-gray-500">Platform: {game.platform_name}</p>
              <p className="text-sm text-gray-500">Genre: {game.genre_name}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => openEditModal(game)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => deleteGame(game._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                🗑️ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {editingGame && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 animate-fadeIn">
    <div className="rounded-2xl shadow-2xl p-6 w-96 max-w-full space-y-4 transform transition-transform duration-300 scale-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Edit Game</h2>

      <input
        className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Game Name"
      />
      <textarea
        className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Description"
      />
      <select
        className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
        value={form.release_year}
        onChange={(e) => setForm({ ...form, release_year: Number(e.target.value) })}
      >
        {releaseYears.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <select
        className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
        value={form.platform_id}
        onChange={(e) => setForm({ ...form, platform_id: Number(e.target.value) })}
      >
        <option value="">Select Platform</option>
        {platforms.map((p) => (
          <option key={p.platform_id} value={p.platform_id}>{p.name}</option>
        ))}
      </select>
      <select
        className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
        value={form.genre_id}
        onChange={(e) => setForm({ ...form, genre_id: Number(e.target.value) })}
      >
        <option value="">Select Genre</option>
        {genres.map((g) => (
          <option key={g.genre_id} value={g.genre_id}>{g.name}</option>
        ))}
      </select>

      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={updateGame}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          💾 Save
        </button>
        <button
          onClick={closeEditModal}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          ❌ Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

