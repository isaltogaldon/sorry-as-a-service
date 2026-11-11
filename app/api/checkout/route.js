import { stripe } from "../../../lib/stripe";
import { TIERS } from "../../../lib/tiers";
export async function POST(req) {
  const { tier, to, did } = await req.json();
  const t = TIERS.find((x) => x.id === tier);
  if (!t || !t.price) return Response.json({ error: "bad tier" }, { status: 400 });
  const origin = req.headers.get("origin") || new URL(req.url).origin;
  const session = await stripe().checkout.sessions.create({
    mode: "payment",
    line_items: [{ quantity: 1, price_data: { currency: "eur", unit_amount: t.price * 100, product_data: { name: `${t.name} apology` } } }],
    metadata: { tier, to: String(to).slice(0, 200), did: String(did).slice(0, 400) },
    success_url: `${origin}/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/`,
  });
  return Response.json({ url: session.url });
}
