"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Star, Smile, Sparkles } from "lucide-react";

const LOVE_MESSAGES = [
  "Kamu adalah alasan aku tersenyum setiap pagi 🌅",
  "Bersamamu, setiap hari terasa seperti petualangan 🌟",
  "Kamu bukan hanya kekasihku, tapi juga sahabat terbaikku 💫",
  "Cintamu adalah rumah yang selalu ingin aku pulang ke sana 🏡",
  "Di matamu, aku menemukan seluruh duniaku 🌍",
  "Kamu membuat hidupku lebih berwarna dan bermakna 🌈",
  "Setiap detik bersamamu adalah hadiah yang paling berharga ⏰",
  "Kamu adalah melodi terindah dalam hidupku 🎵",
];

const REASONS = [
  { emoji: "😊", text: "Senyummu yang bikin hatiku meleleh" },
  { emoji: "🤗", text: "Pelukan hangatmu yang membuatku aman" },
  { emoji: "🧠", text: "Kecerdasanmu yang selalu menginspirasi" },
  { emoji: "💪", text: "Kekuatanmu di saat aku lemah" },
  { emoji: "🎭", text: "Rasa humormu yang selalu bikin tawa" },
  { emoji: "🌺", text: "Kebaikan hatimu kepada semua orang" },
  { emoji: "✨", text: "Caramu melihat dunia dengan penuh keajaiban" },
  { emoji: "🦋", text: "Kupu-kupu di perutku setiap kali melihatmu" },
];

const WISHES = [
  "Semoga harimu seindah wajahmu",
  "Semoga semua impianmu terwujud",
  "Semoga kebahagiaan selalu menyertaimu",
  "Semoga kamu selalu sehat dan bahagia",
  "Semoga cita-citamu tercapai satu per satu",
];

function FloatingHeart({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute pointer-events-none select-none" style={{ fontSize: "1.5rem", opacity: 0.35, ...style }}>
      💕
    </div>
  );
}

function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s` }}>
      {children}
    </div>
  );
}

export default function Home() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [note, setNote] = useState("");
  const [sentNote, setSentNote] = useState("");
  const [wish, setWish] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [showBurst, setShowBurst] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setMsgIndex((i) => (i + 1) % LOVE_MESSAGES.length), 4000);
    return () => clearInterval(interval);
  }, []);

  const handleHeartClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = { id: Date.now(), x: e.clientX - rect.left, y: e.clientY - rect.top };
    setFloatingHearts((h) => [...h, newHeart]);
    setClickCount((c) => {
      const next = c + 1;
      if (next % 10 === 0) { setShowBurst(true); setTimeout(() => setShowBurst(false), 1500); }
      return next;
    });
    setTimeout(() => setFloatingHearts((h) => h.filter((x) => x.id !== newHeart.id)), 1000);
  };

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg, #FFF0F3 0%, #FFE4EC 50%, #FFF0F3 100%)" }}>

      {/* Background floating hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <FloatingHeart key={i} style={{ left: `${8 + i * 11}%`, top: `${15 + (i % 3) * 25}%`, animationDelay: `${i * 0.5}s` }} />
        ))}
      </div>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center", position: "relative" }}>

        {/* Big clickable heart */}
        <div
          onClick={handleHeartClick}
          style={{ fontSize: "5rem", cursor: "pointer", position: "relative", userSelect: "none" }}
        >
          <span className="heartbeat" style={{ display: "inline-block" }}>
            {showBurst ? "💥" : "💖"}
          </span>
          {floatingHearts.map((h) => (
            <span key={h.id} style={{ position: "absolute", left: h.x, top: h.y, fontSize: "1.5rem", animation: "fadeUp 1s ease forwards", pointerEvents: "none", zIndex: 10 }}>
              💕
            </span>
          ))}
        </div>

        <h1 className="shimmer-text" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700, marginTop: "1.5rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          Untuk Kamu,<br />Sayangku
        </h1>

        <p style={{ marginTop: "1.5rem", fontSize: "1.2rem", color: "var(--text-muted)", maxWidth: 480, lineHeight: 1.7 }}>
          Setiap hari bersamamu adalah hadiah terbesar dalam hidupku
        </p>

        <div style={{ marginTop: "2rem", padding: "1.25rem 2rem", background: "white", borderRadius: 20, boxShadow: "0 4px 30px rgba(255,77,109,0.15)", maxWidth: 480, width: "100%", minHeight: 80, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.5s ease" }}>
          <p style={{ color: "var(--rose-dark)", fontStyle: "italic", fontSize: "1.05rem", lineHeight: 1.6 }}>
            &ldquo;{LOVE_MESSAGES[msgIndex]}&rdquo;
          </p>
        </div>

        <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)", fontFamily: "sans-serif" }}>
          💝 Klik hati di atas {clickCount > 0 ? `(${clickCount}×)` : "— coba klik!"}
        </p>

        <div style={{ marginTop: "3rem" }}>
          <div style={{ width: 2, height: 60, background: "linear-gradient(to bottom, var(--rose), transparent)", margin: "0 auto", borderRadius: 4 }} />
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.5rem", fontFamily: "sans-serif" }}>scroll untuk kejutan lainnya</p>
        </div>
      </section>

      {/* ALASAN MENCINTAIMU */}
      <section style={{ padding: "5rem 2rem", maxWidth: 900, margin: "0 auto" }}>
        <Section>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ color: "var(--rose)", fontSize: "0.85rem", letterSpacing: 3, textTransform: "uppercase", fontFamily: "sans-serif" }}>Alasan aku</span>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginTop: "0.5rem" }}>Mengapa Aku Mencintaimu</h2>
          </div>
        </Section>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "1rem" }}>
          {REASONS.map((r, i) => (
            <Section key={i} delay={i * 0.08}>
              <div
                style={{ background: "white", borderRadius: 16, padding: "1.5rem", textAlign: "center", boxShadow: "0 2px 20px rgba(255,77,109,0.08)", border: "1px solid rgba(255,77,109,0.1)", transition: "transform 0.2s, box-shadow 0.2s", cursor: "default" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-5px)"; el.style.boxShadow = "0 10px 30px rgba(255,77,109,0.2)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 2px 20px rgba(255,77,109,0.08)"; }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{r.emoji}</div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.5, fontFamily: "sans-serif" }}>{r.text}</p>
              </div>
            </Section>
          ))}
        </div>
      </section>

      {/* KIRIM PESAN */}
      <section style={{ padding: "5rem 2rem", background: "rgba(255,77,109,0.03)" }}>
        <Section>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <span style={{ fontSize: "2rem" }}>💌</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", margin: "0.75rem 0" }}>Kirim Pesan Cinta</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontFamily: "sans-serif" }}>Tuliskan kata-kata manismu</p>

            {sentNote ? (
              <div style={{ background: "white", borderRadius: 20, padding: "2rem", boxShadow: "0 4px 30px rgba(255,77,109,0.12)", border: "1px solid rgba(255,77,109,0.15)", animation: "fadeUp 0.5s ease" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>💌</div>
                <p style={{ fontStyle: "italic", color: "var(--text)", lineHeight: 1.7, fontSize: "1.05rem" }}>&ldquo;{sentNote}&rdquo;</p>
                <div style={{ marginTop: "1.5rem", borderTop: "1px solid rgba(255,77,109,0.1)", paddingTop: "1rem" }}>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontFamily: "sans-serif" }}>— Dikirim dengan cinta 💕</p>
                </div>
                <button onClick={() => setSentNote("")} style={{ marginTop: "1rem", padding: "0.5rem 1.5rem", border: "1px solid var(--rose-light)", borderRadius: 50, background: "transparent", color: "var(--rose)", cursor: "pointer", fontFamily: "sans-serif" }}>
                  Kirim lagi ✏️
                </button>
              </div>
            ) : (
              <div>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Tuliskan perasaanmu di sini... ✍️"
                  rows={5}
                  style={{ width: "100%", padding: "1.25rem", borderRadius: 16, border: "1.5px solid rgba(255,77,109,0.2)", background: "white", fontSize: "1rem", fontFamily: "Georgia, serif", color: "var(--text)", resize: "none", outline: "none", lineHeight: 1.7, transition: "border-color 0.2s", display: "block" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--rose)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,77,109,0.2)")}
                />
                <button
                  onClick={() => { if (note.trim()) { setSentNote(note); setNote(""); } }}
                  style={{ marginTop: "1rem", padding: "0.875rem 2.5rem", background: note.trim() ? "var(--rose)" : "var(--rose-light)", color: "white", border: "none", borderRadius: 50, fontSize: "1rem", cursor: note.trim() ? "pointer" : "not-allowed", fontFamily: "sans-serif", display: "inline-flex", alignItems: "center", gap: "0.5rem", transition: "transform 0.2s" }}
                  onMouseEnter={(e) => note.trim() && ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
                >
                  <Send size={18} />
                  Kirim Pesan Cinta
                </button>
              </div>
            )}
          </div>
        </Section>
      </section>

      {/* DOA */}
      <section style={{ padding: "5rem 2rem", maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <Section>
          <Star size={32} color="var(--gold)" style={{ margin: "0 auto 1rem" }} />
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", marginBottom: "0.75rem" }}>Doa Untukmu</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontFamily: "sans-serif" }}>Dapatkan doa spesial untuk harimu</p>
          {wish && (
            <div style={{ background: "linear-gradient(135deg, #FFF0F3, #FFE4EC)", borderRadius: 20, padding: "2rem", marginBottom: "1.5rem", border: "1px solid rgba(255,77,109,0.15)", animation: "fadeUp 0.5s ease" }}>
              <p style={{ fontSize: "1.2rem", color: "var(--rose-dark)", fontStyle: "italic", lineHeight: 1.7 }}>✨ {wish} ✨</p>
            </div>
          )}
          <button
            onClick={() => setWish(WISHES[Math.floor(Math.random() * WISHES.length)])}
            style={{ padding: "0.875rem 2.5rem", background: "white", color: "var(--rose-dark)", border: "1.5px solid var(--rose-light)", borderRadius: 50, fontSize: "1rem", cursor: "pointer", fontFamily: "sans-serif", display: "inline-flex", alignItems: "center", gap: "0.5rem", transition: "all 0.2s" }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "var(--rose)"; el.style.color = "white"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "white"; el.style.color = "var(--rose-dark)"; }}
          >
            <Smile size={18} />
            {wish ? "Doa Lainnya" : "Dapatkan Doa"}
          </button>
        </Section>
      </section>

      {/* LOVE METER */}
      <section style={{ padding: "5rem 2rem", background: "rgba(255,77,109,0.03)" }}>
        <Section>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", marginBottom: "0.75rem" }}>Ukuran Cintaku</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "3rem", fontFamily: "sans-serif" }}>Tidak ada skala yang cukup untuk menggambarkannya</p>
            {[
              { label: "Sayang", value: 100, color: "#FF4D6D" },
              { label: "Bangga padamu", value: 98, color: "#F4A261" },
              { label: "Kepercayaan", value: 100, color: "#C9184A" },
              { label: "Kesetiaan", value: 99, color: "#A8325A" },
            ].map((item, i) => (
              <Section key={i} delay={i * 0.1}>
                <div style={{ marginBottom: "1.5rem", textAlign: "left" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontFamily: "sans-serif", fontWeight: 500 }}>{item.label}</span>
                    <span style={{ fontFamily: "sans-serif", color: "var(--text-muted)", fontSize: "0.9rem" }}>{item.value}%</span>
                  </div>
                  <div style={{ height: 10, background: "rgba(255,77,109,0.1)", borderRadius: 50, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${item.value}%`, background: item.color, borderRadius: 50, transition: "width 1.5s ease" }} />
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </Section>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "4rem 2rem 3rem", textAlign: "center" }}>
        <Section>
          <span className="heartbeat" style={{ display: "inline-block", fontSize: "3rem" }}>💖</span>
          <p style={{ fontSize: "1.1rem", color: "var(--text)", fontStyle: "italic", marginTop: "1rem", marginBottom: "0.25rem" }}>
            &ldquo;Cinta sejati bukan tentang kesempurnaan,
          </p>
          <p style={{ fontSize: "1.1rem", color: "var(--text)", fontStyle: "italic", marginBottom: "2rem" }}>
            tapi tentang memilih satu sama lain setiap harinya.&rdquo;
          </p>
          <p style={{ fontFamily: "sans-serif", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Dibuat dengan 💕 khusus untukmu
          </p>
        </Section>
      </footer>
    </main>
  );
}
