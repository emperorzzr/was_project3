import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("gameDb");

    // ✅ อ่าน query params จาก request URL
    const { searchParams } = new URL(req.url);

    const name = searchParams.get("name");
    const genre = searchParams.get("genre");
    const releaseYear = searchParams.get("release_year");
    const minRating = searchParams.get("rating"); // filter rating จาก review

    // ✅ เงื่อนไขค้นหาเกม
    const query = {};
    if (name) {
      query.name = { $regex: name, $options: "i" }; // ค้นหาแบบ contains
    }
    if (releaseYear) {
      query.release_year = Number(releaseYear);
    }

    const games = await db.collection("game").find(query).toArray();
    const platforms = await db.collection("platform").find({}).toArray();
    const genres = await db.collection("genre").find({}).toArray();
    const reviews = await db.collection("review").find({}).toArray();

    // ✅ enrich platform, genre, review rating
    const enrichedGames = games.map((game) => {
      const gamePlatforms = platforms
        .filter((p) => p.platform_id === game.platform_id)
        .map((p) => p.name);

      const gameGenres = genres
        .filter((g) => g.genre_id === game.genre_id)
        .map((g) => g.name);

      const gameReviews = reviews.filter((r) => r.game_id === game.game_id);
      const avgRating =
        gameReviews.length > 0
          ? (
              gameReviews.reduce((sum, r) => sum + r.rating, 0) /
              gameReviews.length
            ).toFixed(1)
          : null;

      return {
        ...game,
        platform_name: gamePlatforms.join(", "),
        genre_name: gameGenres.join(", "),
        rating: avgRating, // ✅ ค่าเฉลี่ยจาก review
        review_count: gameReviews.length,
      };
    });

    // ✅ filter เพิ่มเติมด้วย genre และ minRating
    let finalGames = enrichedGames;
    if (genre) {
      finalGames = finalGames.filter((g) =>
        g.genre_name.toLowerCase().includes(genre.toLowerCase())
      );
    }
    if (minRating) {
      finalGames = finalGames.filter(
        (g) => g.rating && Number(g.rating) >= Number(minRating)
      );
    }

    return new Response(JSON.stringify(finalGames), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}


export async function POST(req) {
  //const client = await clientPromise;
  //const db = client.db(process.env.MONGODB_DB);

  const client = await clientPromise;
  const db = client.db("gameDb");

  const body = await req.json();

  // หา game_id สูงสุด แล้ว +1
  const lastGame = await db.collection("game")
    .find({})
    .sort({ game_id: -1 })
    .limit(1)
    .toArray();

  const newGameId = lastGame.length > 0 ? lastGame[0].game_id + 1 : 1;

  const newGame = {
    game_id: newGameId,
    name: body.name,
    description: body.description,
    release_year: Number(body.release_year),
    platform_id: Number(body.platform_id),
    genre_id: Number(body.genre_id),
  };

  await db.collection("game").insertOne(newGame);
  console.log(newGame)
  return Response.json({ message: "Game added successfully", game: newGame }, { status: 201 });
}



export async function PUT(req) {
  try {
    const client = await clientPromise;
    const db = client.db("gameDb");

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // game_id ที่ส่งมา

    if (!id) {
      return new Response(JSON.stringify({ error: "id is required" }), { status: 400 });
    }

    const updateData = await req.json();

    const result = await db.collection("game").updateOne(
      { game_id: Number(id) }, // ใช้ game_id แทน ObjectId
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "Game not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Game updated successfully", updatedId: id }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    const client = await clientPromise;
    const db = client.db("gameDb");
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // แปลง id เป็น ObjectId
    await db.collection("game").deleteOne({ _id: new ObjectId(id) });

    return Response.json({ message: "Game deleted successfully" });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
