import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("gameDb");
    const platforms = await db.collection("platform").find({}).toArray();
    return new Response(JSON.stringify(platforms), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
