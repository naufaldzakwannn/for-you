"use client";

import { useState, useRef } from "react";

type Answers = {
  mood: string;
  memory: string;
  loveLanguage: string;
  dreamDate: string;
  message: string;
};

const MOODS = [
  { id: "happy", label: "Bahagia", desc: "Hari ini terasa sangat baik" },
  { id: "calm", label: "Tenang", desc: "Damai dan nyaman" },
  { id: "nostalgic", label: "Rindu", desc: "Memikirkan momen bersama" },
  { id: "excited", label: "Bersemangat", desc: "Tidak sabar bertemu" },
];

const LOVE_LANGUAGES = [
  { id: "words", label: "Kata-kata afirmasi", desc: "Ucapan yang membuat hari lebih indah" },
  { id: "touch", label: "Sentuhan fisik", desc: "Pelukan yang membuat aman" },
  { id: "time", label: "Waktu berkualitas", desc: "Momen berdua yang bermakna" },
  { id: "acts", label: "Tindakan nyata", desc: "Hal kecil yang menunjukkan kepedulian" },
  { id: "gifts", label: "Hadiah", desc: "Sesuatu untuk diingat selalu" },
];

const DREAM_DATES = [
  { id: "dinner", label: "Makan malam berdua", desc: "Tempat yang tenang, hanya kita" },
  { id: "nature", label: "Jalan di alam terbuka", desc: "Pantai, gunung, atau taman sunyi" },
  { id: "home", label: "Di rumah saja", desc: "Film, masak bersama, bercerita" },
  { id: "travel", label: "Pergi ke tempat baru", desc: "Kota yang belum pernah kita kunjungi" },
  { id: "surprise", label: "Terserah kamu", desc: "Apa pun yang kamu pilihkan pasti sempurna" },
];

const MEMORIES = ["Pertama kali kita bertemu", "Saat kamu pertama kali tersenyum padaku", "Kencan pertama kita", "Perjalanan yang kita lakukan bersama", "Momen diam yang terasa lebih dari cukup"];

function generateLetter(answers: Answers): string {
  const moodMap: Record<string, string> = {
    happy: "melihatmu bahagia adalah hal yang paling aku syukuri hari ini. Kebahagiaan itu menular — dan kamu selalu berhasil membawanya ke mana pun kamu pergi",
    calm: "ketenanganmu adalah salah satu hal yang paling aku kagumi. Di tengah segala yang sibuk, kamu selalu tahu cara membuat segalanya terasa lebih ringan",
    nostalgic: "aku tahu rasanya rindu itu seperti apa. Dan setiap kali aku merindukanmu, aku sadar betapa berartinya kamu dalam hidupku",
    excited: "semangatmu selalu membuat aku ikut bersemangat. Kamu punya cara unik untuk membuat hal biasa terasa luar biasa",
  };

  const llMap: Record<string, string> = {
    words: "aku tidak akan pernah kehabisan kata untuk menggambarkan betapa istimewanya kamu. Setiap hari aku menemukan alasan baru untuk mengucapkannya",
    touch: "aku ingin kamu tahu bahwa pelukanku selalu untukmu — di hari yang berat, di hari yang biasa, dan di hari yang paling bahagia sekalipun",
    time: "setiap menit yang aku habiskan bersamamu terasa seperti hadiah. Aku tidak ingin menukarnya dengan apa pun",
    acts: "hal-hal kecil yang aku lakukan bukan karena kebiasaan — tapi karena setiap kali aku melakukannya, aku memikirkanmu",
    gifts: "aku ingin terus memberimu sesuatu untuk diingat, karena kamu layak untuk dirayakan setiap harinya",
  };

  const dateMap: Record<string, string> = {
    dinner: "makan malam berdua — di tempat yang tenang, cahaya yang lembut, dan waktu yang terasa berhenti sejenak",
    nature: "pergi ke suatu tempat yang sunyi, hanya kita berdua, tanpa terburu-buru",
    home: "sore di rumah bersamamu, tanpa agenda apa pun — itu sudah lebih dari cukup",
    travel: "pergi ke kota yang belum pernah kita lihat bersama, mulai kenangan baru di tempat yang baru",
    surprise: "apa pun yang kamu pilih, aku sudah tahu itu akan sempurna — karena yang membuatnya sempurna adalah kamu",
  };

  return `Carmen,

${moodMap[answers.mood] || "kamu selalu ada di pikiranku, tanpa terkecuali"}.

Di antara semua momen yang kita lewati, yang paling sering aku kenang adalah — ${answers.memory.toLowerCase()}. Bukan karena dramatis atau luar biasa, tapi karena bersamamu, hal yang sederhana pun terasa membekas.

${llMap[answers.loveLanguage] || "cinta bisa hadir dalam banyak bentuk, dan aku ingin menunjukkannya dengan cara yang paling berarti bagimu"}.

Kalau boleh memilih satu waktu bersamamu sekarang, aku ingin ${dateMap[answers.dreamDate] || "waktu berdua bersamamu, di mana pun itu"}.
${answers.message ? `\nSatu hal lagi yang ingin aku katakan: ${answers.message}\n` : ""}
Kamu tidak perlu menjadi sempurna untuk dicintai. Tapi entah kenapa, bagimu, segalanya terasa sudah tepat apa adanya.

Terima kasih sudah ada, Carmen.

— Selalu untukmu`;
}

// ─── PageShell ──────────────────────────────────────────────────────────────

function PageShell({ children, step, total, onBack }: { children: React.ReactNode; step: number; total: number; onBack?: () => void }) {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Progress bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(step / total) * 100}%` }} />
      </div>

      {/* Back button */}
      {onBack && (
        <div style={{ padding: "1.25rem 2rem 0" }}>
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              fontFamily: "Helvetica Neue, Arial, sans-serif",
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: 0,
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--text)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)")}
          >
            &larr; Kembali
          </button>
        </div>
      )}

      {/* Content */}
      <div
        className="page-enter"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          overflowY: "auto",
        }}
      >
        <div style={{ maxWidth: 560, width: "100%" }}>{children}</div>
      </div>

      {/* Step counter */}
      <div style={{ padding: "1rem 2rem", textAlign: "right" }}>
        <span className="eyebrow">
          {step} / {total}
        </span>
      </div>
    </div>
  );
}

// ─── Pages ──────────────────────────────────────────────────────────────────

function PageIntro({ onNext }: { onNext: () => void }) {
  return (
    <PageShell step={0} total={6}>
      <div>
        <p className="eyebrow stagger-1">Untuk Carmen</p>
        <h1 className="display stagger-2" style={{ marginTop: "1rem" }}>
          Ada sesuatu
          <br />
          yang ingin aku
          <br />
          sampaikan
        </h1>
        <p className="body-text stagger-3" style={{ marginTop: "1.5rem", maxWidth: 400 }}>
          Jawab beberapa pertanyaan kecil, dan di akhir kamu akan mendapat sesuatu yang dibuat hanya untukmu.
        </p>
        <div className="stagger-4" style={{ marginTop: "2.5rem" }}>
          <button className="btn-primary" onClick={onNext}>
            Mulai &rarr;
          </button>
        </div>
      </div>
    </PageShell>
  );
}

function PageMood({ onNext, onBack, answers, setAnswers }: { onNext: () => void; onBack: () => void; answers: Answers; setAnswers: (a: Answers) => void }) {
  return (
    <PageShell step={1} total={6} onBack={onBack}>
      <div>
        <p className="eyebrow stagger-1">Hari ini</p>
        <h2 className="display stagger-2" style={{ marginTop: "1rem", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
          Bagaimana perasaan
          <br />
          Carmen hari ini?
        </h2>
        <div className="stagger-3" style={{ display: "grid", gap: "0.75rem", marginTop: "2rem" }}>
          {MOODS.map((m) => (
            <div
              key={m.id}
              className={`choice-card ${answers.mood === m.id ? "selected" : ""}`}
              onClick={() => {
                setAnswers({ ...answers, mood: m.id });
                setTimeout(onNext, 280);
              }}
            >
              <div style={{ fontWeight: 400, fontSize: "1rem" }}>{m.label}</div>
              <div className="body-text" style={{ marginTop: "0.2rem", fontSize: "0.85rem" }}>
                {m.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function PageMemory({ onNext, onBack, answers, setAnswers }: { onNext: () => void; onBack: () => void; answers: Answers; setAnswers: (a: Answers) => void }) {
  const [custom, setCustom] = useState(MEMORIES.includes(answers.memory) ? "" : answers.memory);
  const [useCustom, setUseCustom] = useState(!!answers.memory && !MEMORIES.includes(answers.memory));

  return (
    <PageShell step={2} total={6} onBack={onBack}>
      <div>
        <p className="eyebrow stagger-1">Kenangan</p>
        <h2 className="display stagger-2" style={{ marginTop: "1rem", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
          Momen mana yang
          <br />
          paling berkesan?
        </h2>
        <div className="stagger-3" style={{ display: "grid", gap: "0.6rem", marginTop: "2rem" }}>
          {MEMORIES.map((m) => (
            <div
              key={m}
              className={`choice-card ${answers.memory === m && !useCustom ? "selected" : ""}`}
              onClick={() => {
                setUseCustom(false);
                setAnswers({ ...answers, memory: m });
                setTimeout(onNext, 280);
              }}
            >
              <div style={{ fontSize: "0.95rem" }}>{m}</div>
            </div>
          ))}
          <div className={`choice-card ${useCustom ? "selected" : ""}`} onClick={() => setUseCustom(true)}>
            <div style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>Ceritakan sendiri...</div>
          </div>
        </div>
        {useCustom && (
          <div style={{ marginTop: "1rem", animation: "fadeIn 0.3s ease" }}>
            <input
              type="text"
              placeholder="Momen apa itu?"
              value={custom}
              autoFocus
              onChange={(e) => {
                setCustom(e.target.value);
                setAnswers({ ...answers, memory: e.target.value });
              }}
              onKeyDown={(e) => e.key === "Enter" && custom.trim() && onNext()}
            />
            <button className="btn-primary" onClick={onNext} disabled={!custom.trim()} style={{ marginTop: "1rem", opacity: custom.trim() ? 1 : 0.4 }}>
              Lanjut &rarr;
            </button>
          </div>
        )}
      </div>
    </PageShell>
  );
}

function PageLoveLanguage({ onNext, onBack, answers, setAnswers }: { onNext: () => void; onBack: () => void; answers: Answers; setAnswers: (a: Answers) => void }) {
  return (
    <PageShell step={3} total={6} onBack={onBack}>
      <div>
        <p className="eyebrow stagger-1">Bahasa cinta</p>
        <h2 className="display stagger-2" style={{ marginTop: "1rem", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
          Apa yang paling membuat
          <br />
          Carmen merasa dicintai?
        </h2>
        <div className="stagger-3" style={{ display: "grid", gap: "0.75rem", marginTop: "2rem" }}>
          {LOVE_LANGUAGES.map((ll) => (
            <div
              key={ll.id}
              className={`choice-card ${answers.loveLanguage === ll.id ? "selected" : ""}`}
              onClick={() => {
                setAnswers({ ...answers, loveLanguage: ll.id });
                setTimeout(onNext, 280);
              }}
            >
              <div style={{ fontWeight: 400, fontSize: "0.95rem" }}>{ll.label}</div>
              <div className="body-text" style={{ marginTop: "0.2rem", fontSize: "0.82rem" }}>
                {ll.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function PageDreamDate({ onNext, onBack, answers, setAnswers }: { onNext: () => void; onBack: () => void; answers: Answers; setAnswers: (a: Answers) => void }) {
  return (
    <PageShell step={4} total={6} onBack={onBack}>
      <div>
        <p className="eyebrow stagger-1">Impian</p>
        <h2 className="display stagger-2" style={{ marginTop: "1rem", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
          Kalau bisa memilih,
          <br />
          kita pergi ke mana?
        </h2>
        <div className="stagger-3" style={{ display: "grid", gap: "0.75rem", marginTop: "2rem" }}>
          {DREAM_DATES.map((d) => (
            <div
              key={d.id}
              className={`choice-card ${answers.dreamDate === d.id ? "selected" : ""}`}
              onClick={() => {
                setAnswers({ ...answers, dreamDate: d.id });
                setTimeout(onNext, 280);
              }}
            >
              <div style={{ fontWeight: 400, fontSize: "0.95rem" }}>{d.label}</div>
              <div className="body-text" style={{ marginTop: "0.2rem", fontSize: "0.82rem" }}>
                {d.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function PageMessage({ onNext, onBack, answers, setAnswers }: { onNext: () => void; onBack: () => void; answers: Answers; setAnswers: (a: Answers) => void }) {
  return (
    <PageShell step={5} total={6} onBack={onBack}>
      <div>
        <p className="eyebrow stagger-1">Satu hal terakhir</p>
        <h2 className="display stagger-2" style={{ marginTop: "1rem", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
          Ada yang ingin
          <br />
          kamu tambahkan
          <br />
          untuk Carmen?
        </h2>
        <p className="body-text stagger-3" style={{ marginTop: "1rem" }}>
          Sesuatu yang ingin kamu ucapkan langsung. Boleh dikosongkan.
        </p>
        <div className="stagger-4" style={{ marginTop: "2rem" }}>
          <textarea rows={4} placeholder="Tulis di sini, atau biarkan kosong..." value={answers.message} onChange={(e) => setAnswers({ ...answers, message: e.target.value })} style={{ resize: "none" }} />
        </div>
        <div className="stagger-5" style={{ marginTop: "1.5rem" }}>
          <button className="btn-primary" onClick={onNext}>
            Lihat hasilnya &rarr;
          </button>
        </div>
      </div>
    </PageShell>
  );
}

function PageResult({ answers, onBack, onRestart }: { answers: Answers; onBack: () => void; onRestart: () => void }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const letter = generateLetter(answers);

  const handleCopy = () => {
    navigator.clipboard.writeText(letter).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    setDownloading(true);
    try {
      const W = 720;
      const PADDING = 56;
      const TEXT_WIDTH = W - PADDING * 2;
      const FONT_SIZE = 15;
      const LINE_HEIGHT = FONT_SIZE * 1.9;
      const CORNER = 28;
      const BG = "#FDFAF7";
      const TEXT_COLOR = "#2A1F18";
      const MUTED = "#9B8878";
      const ACCENT = "#C4A882";
      const BORDER = "#E8E0D8";

      // Ukur tinggi dulu dengan canvas sementara
      const tmp = document.createElement("canvas");
      const ctx2 = tmp.getContext("2d")!;
      ctx2.font = `${FONT_SIZE}px Georgia, serif`;

      const lines: string[] = [];
      letter.split("\n").forEach((paragraph) => {
        if (paragraph.trim() === "") {
          lines.push("");
          return;
        }
        const words = paragraph.split(" ");
        let cur = "";
        words.forEach((w) => {
          const test = cur ? cur + " " + w : w;
          if (ctx2.measureText(test).width > TEXT_WIDTH) {
            lines.push(cur);
            cur = w;
          } else cur = test;
        });
        if (cur) lines.push(cur);
      });

      const DATE_H = 40;
      const TOP_LINE_H = 28;
      const contentH = lines.length * LINE_HEIGHT;
      const H = PADDING + TOP_LINE_H + contentH + DATE_H + PADDING;

      const canvas = document.createElement("canvas");
      canvas.width = W * 2;
      canvas.height = H * 2;
      const ctx = canvas.getContext("2d")!;
      ctx.scale(2, 2);

      // Background
      ctx.fillStyle = BG;
      ctx.beginPath();
      ctx.roundRect(0, 0, W, H, 12);
      ctx.fill();

      // Border
      ctx.strokeStyle = BORDER;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(0.5, 0.5, W - 1, H - 1, 12);
      ctx.stroke();

      // Ornamen sudut
      const drawCorner = (x: number, y: number, dx: number, dy: number) => {
        ctx.strokeStyle = ACCENT;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + dx * CORNER, y);
        ctx.lineTo(x, y);
        ctx.lineTo(x, y + dy * CORNER);
        ctx.stroke();
      };
      drawCorner(14, 14, 1, 1);
      drawCorner(W - 14, 14, -1, 1);
      drawCorner(14, H - 14, 1, -1);
      drawCorner(W - 14, H - 14, -1, -1);

      // Garis atas
      const lineY = PADDING;
      ctx.strokeStyle = BORDER;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(PADDING, lineY);
      ctx.lineTo(W - PADDING, lineY);
      ctx.stroke();

      // Teks surat
      ctx.fillStyle = TEXT_COLOR;
      ctx.font = `${FONT_SIZE}px Georgia, serif`;
      ctx.textBaseline = "top";
      let y = PADDING + TOP_LINE_H;
      lines.forEach((line) => {
        if (line !== "") ctx.fillText(line, PADDING, y);
        y += LINE_HEIGHT;
      });

      // Garis bawah
      const bottomLineY = PADDING + TOP_LINE_H + contentH + 12;
      ctx.strokeStyle = BORDER;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(PADDING, bottomLineY);
      ctx.lineTo(W - PADDING, bottomLineY);
      ctx.stroke();

      // Tanggal
      const dateStr = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
      ctx.fillStyle = MUTED;
      ctx.font = "11px Helvetica Neue, Arial, sans-serif";
      const dateW = ctx.measureText(dateStr).width;
      ctx.fillText(dateStr, W - PADDING - dateW, bottomLineY + 12);

      // Download
      const link = document.createElement("a");
      link.download = "untuk-carmen.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <PageShell step={6} total={6} onBack={onBack}>
      <div>
        <p className="eyebrow stagger-1">Untuk Carmen</p>
        <h2 className="display stagger-2" style={{ marginTop: "1rem", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}>
          Ini untukmu
        </h2>

        {/* Card — ini yang akan di-screenshot */}
        <div
          ref={cardRef}
          className="stagger-3"
          style={{
            marginTop: "2rem",
            background: "#FDFAF7",
            border: "1px solid #E8E0D8",
            borderRadius: 12,
            padding: "2.5rem 2rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Ornamen sudut */}
          <div style={{ position: "absolute", top: 16, left: 16, width: 32, height: 32, borderTop: "1.5px solid #C4A882", borderLeft: "1.5px solid #C4A882", borderRadius: "2px 0 0 0" }} />
          <div style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderTop: "1.5px solid #C4A882", borderRight: "1.5px solid #C4A882", borderRadius: "0 2px 0 0" }} />
          <div style={{ position: "absolute", bottom: 16, left: 16, width: 32, height: 32, borderBottom: "1.5px solid #C4A882", borderLeft: "1.5px solid #C4A882", borderRadius: "0 0 0 2px" }} />
          <div style={{ position: "absolute", bottom: 16, right: 16, width: 32, height: 32, borderBottom: "1.5px solid #C4A882", borderRight: "1.5px solid #C4A882", borderRadius: "0 0 2px 0" }} />

          {/* Garis atas tipis */}
          <div style={{ borderTop: "1px solid #E8E0D8", marginBottom: "1.5rem", paddingTop: "0" }} />

          <pre
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "0.875rem",
              lineHeight: 2,
              color: "#2A1F18",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              maxHeight: "42vh",
              overflowY: "auto",
            }}
          >
            {letter}
          </pre>

          {/* Garis bawah + tanggal */}
          <div style={{ borderTop: "1px solid #E8E0D8", marginTop: "1.5rem", paddingTop: "1rem", display: "flex", justifyContent: "flex-end" }}>
            <span style={{ fontFamily: "Helvetica Neue, Arial, sans-serif", fontSize: "0.72rem", color: "#9B8878", letterSpacing: "0.06em" }}>
              {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
        </div>

        <div className="stagger-4" style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={handleDownload} disabled={downloading}>
            {downloading ? "Menyimpan..." : "Simpan sebagai gambar"}
          </button>
          <button className="btn-outline" onClick={handleCopy}>
            {copied ? "Tersalin" : "Salin teks"}
          </button>
          <button className="btn-outline" onClick={onRestart}>
            Mulai ulang
          </button>
        </div>
        <p className="body-text stagger-5" style={{ marginTop: "1.25rem", fontSize: "0.82rem" }}>
          Gambar disimpan langsung di perangkatmu. Tidak ada yang dikirim ke server.
        </p>
      </div>
    </PageShell>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

const INITIAL_ANSWERS: Answers = { mood: "", memory: "", loveLanguage: "", dreamDate: "", message: "" };

export default function Home() {
  const [step, setStep] = useState(0);
  const [key, setKey] = useState(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);

  const goNext = () => {
    setKey((k) => k + 1);
    setStep((s) => s + 1);
  };
  const goBack = () => {
    setKey((k) => k + 1);
    setStep((s) => s - 1);
  };
  const restart = () => {
    setAnswers(INITIAL_ANSWERS);
    setKey((k) => k + 1);
    setStep(0);
  };

  const pages = [
    <PageIntro key="intro" onNext={goNext} />,
    <PageMood key="mood" onNext={goNext} onBack={goBack} answers={answers} setAnswers={setAnswers} />,
    <PageMemory key="memory" onNext={goNext} onBack={goBack} answers={answers} setAnswers={setAnswers} />,
    <PageLoveLanguage key="ll" onNext={goNext} onBack={goBack} answers={answers} setAnswers={setAnswers} />,
    <PageDreamDate key="date" onNext={goNext} onBack={goBack} answers={answers} setAnswers={setAnswers} />,
    <PageMessage key="msg" onNext={goNext} onBack={goBack} answers={answers} setAnswers={setAnswers} />,
    <PageResult key="result" answers={answers} onBack={goBack} onRestart={restart} />,
  ];

  return <div key={key}>{pages[step]}</div>;
}
