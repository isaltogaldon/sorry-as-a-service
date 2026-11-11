"use client";
import { useEffect, useState } from "react";
import { TIERS, apology } from "../lib/tiers";

export default function Home() {
  const [to, setTo] = useState(""); const [did, setDid] = useState("");
  const [result, setResult] = useState(null); const [busy, setBusy] = useState(false); const [msg, setMsg] = useState("");

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const sid = p.get("session_id");
    if (sid) fetch(`/api/session?id=${encodeURIComponent(sid)}`).then((r) => r.json()).then((m) => {
      if (m.tier) setResult({ tier: m.tier, text: apology(m.tier, m.to, m.did) }); else setMsg("Payment not found. Not sorry.");
    });
    else if (p.get("tier") === "bare") setResult({ tier: "bare", text: apology("bare", p.get("to"), p.get("did")) });
  }, []);

  async function choose(t) {
    if (!to.trim() || !did.trim()) return setMsg("Tell us who you wronged and what you did first.");
    setMsg("");
    if (!t.price) {
      history.replaceState(null, "", `/?tier=bare&to=${encodeURIComponent(to)}&did=${encodeURIComponent(did)}`);
      return setResult({ tier: t.id, text: apology(t.id, to, did) });
    }
    setBusy(true);
    const r = await fetch("/api/checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ tier: t.id, to, did }) });
    const j = await r.json(); setBusy(false);
    if (j.url) location.href = j.url; else setMsg("Checkout failed. Ironically, sorry.");
  }

  function speak() {
    const u = new SpeechSynthesisUtterance(result.text);
    const voices = speechSynthesis.getVoices();
    if (result.tier === "corporate") { u.rate = 0.95; u.pitch = 0.8; u.voice = voices.find((v) => /en-GB/.test(v.lang) && /Daniel|male/i.test(v.name)) || voices.find((v) => /en-GB/.test(v.lang)) || null; }
    else { u.rate = 0.85; u.pitch = 1.1; u.voice = voices.find((v) => /en-GB/.test(v.lang)) || null; }
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  }

  const tier = result && TIERS.find((t) => t.id === result.tier);
  const s = {
    wrap: { maxWidth: 1100, margin: "0 auto", padding: "32px 16px" },
    input: { width: "100%", boxSizing: "border-box", fontSize: 18, padding: 12, borderRadius: 12, border: "2px solid #2b1a0e", marginBottom: 12 },
    btn: { fontSize: 16, padding: "10px 18px", borderRadius: 999, border: "2px solid #2b1a0e", background: "#ffd166", cursor: "pointer", fontWeight: 700, marginRight: 8 },
  };
  return (
    <main style={s.wrap}>
      <h1 style={{ fontSize: "clamp(36px,7vw,72px)", margin: 0 }}>Sorry-as-a-Service</h1>
      <p style={{ fontSize: 20, marginTop: 4 }}>The more you pay, the more sorry you are.™</p>

      {result ? (
        <div style={{ background: "#fff", border: "3px solid #2b1a0e", borderRadius: 20, padding: 24, boxShadow: "8px 8px 0 #2b1a0e", marginTop: 24 }}>
          <div style={{ fontWeight: 800, fontSize: 14, textTransform: "uppercase" }}>{tier?.emoji} {tier?.name}</div>
          <pre style={{ whiteSpace: "pre-wrap", fontFamily: result.tier === "shakespeare" ? "Georgia, serif" : "inherit", fontSize: 18, lineHeight: 1.5 }}>{result.text}</pre>
          {tier?.audio && <button style={s.btn} onClick={speak}>▶ Play narration</button>}
          <button style={s.btn} onClick={() => { navigator.clipboard.writeText(location.href); setMsg("Link copied!"); }}>🔗 Copy link</button>
          <button style={{ ...s.btn, background: "#fff" }} onClick={() => { setResult(null); history.replaceState(null, "", "/"); }}>Apologise again</button>
        </div>
      ) : (
        <>
          <div style={{ marginTop: 24 }}>
            <input style={s.input} placeholder="Who are you apologising to?" value={to} onChange={(e) => setTo(e.target.value)} />
            <input style={s.input} placeholder="What did you do?" value={did} onChange={(e) => setDid(e.target.value)} />
          </div>
          <h2>Choose your level of remorse</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 16 }}>
            {TIERS.map((t, i) => (
              <button key={t.id} disabled={busy} onClick={() => choose(t)} style={{ textAlign: "left", background: ["#e9ecef", "#caffbf", "#9bf6ff", "#bdb2ff", "#ffadad"][i], border: "3px solid #2b1a0e", borderRadius: 20, padding: 20, cursor: "pointer", boxShadow: "6px 6px 0 #2b1a0e", fontFamily: "inherit", color: "inherit" }}>
                <div style={{ fontSize: 40 }}>{t.emoji}</div>
                <div style={{ fontSize: 20, fontWeight: 800 }}>{t.name}</div>
                <div style={{ fontSize: 34, fontWeight: 900 }}>{t.price ? `€${t.price}` : "Free"}</div>
                <div>{t.blurb}</div>
              </button>
            ))}
          </div>
          <p style={{ opacity: 0.7 }}>Paid tiers use Stripe test mode — card 4242 4242 4242 4242, any future date, any CVC.</p>
        </>
      )}
      {msg && <p style={{ fontWeight: 700 }}>{msg}</p>}
    </main>
  );
}
