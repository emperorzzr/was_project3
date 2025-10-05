
export async function GET() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const games = await db.collection("game").find({}).toArray();
  return Response.json(games);
}
