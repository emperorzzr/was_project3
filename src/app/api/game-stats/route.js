// app/api/game-stats/rating/route.js
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("gameDb");

    const games = await db.collection("game").find({}).toArray();
    const reviews = await db.collection("review").find({}).toArray();

    // สร้าง map: game_id -> avg rating
    const ratingMap = {};

    games.forEach((game) => {
      const gameReviews = reviews.filter((r) => r.game_id === game.game_id);
      const avgRating =
        gameReviews.length > 0
          ? gameReviews.reduce((sum, r) => sum + r.rating, 0) / gameReviews.length
          : 0;

      ratingMap[game.game_id] = avgRating;
    });

    // นับจำนวนเกมตาม rating (ปัดเป็นจำนวนเต็ม)
    const ratingCounts = [1, 2, 3, 4, 5].map((i) => ({
      rating: i,
      count: Object.values(ratingMap).filter((r) => Math.round(r) === i).length,
    }));

    return new Response(JSON.stringify(ratingCounts), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
