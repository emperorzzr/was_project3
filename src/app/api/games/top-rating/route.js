import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("gameDb");

    const games = await db.collection("game").find({}).toArray();
    const reviews = await db.collection("review").find({}).toArray();
    const platforms = await db.collection("platform").find({}).toArray();
    const genres = await db.collection("genre").find({}).toArray();

    const enrichedGames = games.map((game) => {
      const gameReviews = reviews.filter((r) => r.game_id === game.game_id);
      const avgRating =
        gameReviews.length > 0
          ? gameReviews.reduce((sum, r) => sum + r.rating, 0) / gameReviews.length
          : null;

      return {
        ...game,
        platform_name: platforms.find((p) => p.platform_id === game.platform_id)?.name || "",
        genre_name: genres.find((g) => g.genre_id === game.genre_id)?.name || "",
        rating: avgRating ? avgRating.toFixed(1) : null,
      };
    });

    // filter rating = 5
    const topRatedGames = enrichedGames.filter((g) => g.rating == 5);

    return new Response(JSON.stringify(topRatedGames), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
