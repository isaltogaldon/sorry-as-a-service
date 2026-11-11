import { stripe } from "../../../lib/stripe";
export async function GET(req) {
  const id = new URL(req.url).searchParams.get("id");
  try {
    const s = await stripe().checkout.sessions.retrieve(id);
    if (s.payment_status !== "paid") return Response.json({ error: "not paid" }, { status: 402 });
    return Response.json(s.metadata);
  } catch { return Response.json({ error: "not found" }, { status: 404 }); }
}
