"use client";

import { useState, useEffect } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────

type Answers = {
  partnerName: string;
  mood: string;
  memory: string;
  loveLanguage: string;
  dreamDate: string;
  message: string;
};

// ─── Constants ──────────────────────────────────────────────────────────────

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
  { id: "dinner", label: "Makan malam romantis", desc: "Restoran dengan cahaya lilin" },
  { id: "nature", label: "Jalan di alam terbuka", desc: "Pantai, gunung, atau taman sunyi" },
  { id: "home", label: "Di rumah berdua", desc: "Film, masak bersama, bercerita" },
  { id: "travel", label: "Perjalanan baru", desc: "Kota atau tempat yang belum pernah dikunjungi" },
  { id: "surprise", label: "Kejutan darimu", desc: "Apa pun yang kamu pilihkan" },
];

const MEMORIES = ["Pertama kali bertemu", "Kencan pertama kita", "Saat kamu tersenyum untuk pertamakalinya padaku", "Perjalanan yang kita lakukan bersama", "Momen sederhana yang terasa sempurna"];

// ─── Helpers ────────────────────────────────────────────────────────────────

function generateLetter(answers: Answers): string {
  const moodMap: Record<string, string> = {
    happy: "kebahagiaanmu hari ini membuat aku ikut merasakan hangatnya",
    calm: "ketenanganmu selalu menjadi tempatku berlabuh",
    nostalgic: "rindu itu pertanda betapa berartinya kamu bagiku",
    excited: "semangatmu selalu menular dan membuat hari terasa lebih hidup",
  };

  const llMap: Record<string, string> = {
    words: "aku akan selalu punya kata-kata untukmu — setiap hari, tanpa bosan",
    touch: "pelukanku selalu untukmu, kapan pun kamu membutuhkannya",
    time: "waktuku yang paling berharga ingin aku habiskan bersamamu",
    acts: "hal-hal kecil yang kulakukan adalah caraku berkata 'aku peduli'",
    gifts: "setiap hal yang aku berikan membawa sepotong hatiku",
  };

  const dateMap: Record<string, string> = {
    dinner: "makan malam berdua dengan cahaya yang lembut",
    nature: "berjalan di tempat yang tenang, hanya kita berdua",
    home: "sore yang hangat di rumah, tanpa agenda apa pun",
    travel: "petualangan ke tempat yang belum pernah kita datangi",
    surprise: "sesuatu yang kamu pilihkan untukku — yang pasti istimewa",
  };

  return `${answers.partnerName},

Aku ingin kamu tahu bahwa ${moodMap[answers.mood] || "kamu selalu ada di pikiranku"}.

Di antara semua momen yang kita lewati, yang paling sering aku kenang adalah — ${answers.memory.toLowerCase()}. Momen itu sederhana, tapi entah kenapa selalu kembali, selalu hangat.

Kamu mengajarkanku bahwa ${llMap[answers.loveLanguage] || "cinta bisa hadir dalam banyak bentuk"}. Dan aku bersyukur bisa belajar itu darimu.

Kalau boleh aku pilih satu waktu bersamamu sekarang, aku ingin ${dateMap[answers.dreamDate] || "waktu berdua bersamamu"}.

${answers.message ? `Satu lagi yang ingin aku sampaikan: ${answers.message}` : ""}

Terima kasih sudah ada.

— Untukmu, selalu`;
}

// ─── Page Components ─────────────────────────────────────────────────────────

function PageShell({ children, step, total }: { children: React.ReactNode; step: number; total: number }) {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(step / total) * 100}%` }} />
      </div>
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
      <div style={{ padding: "1rem 2rem", textAlign: "right" }}>
        <span className="eyebrow">
          {step} / {total}
        </span>
      </div>
    </div>
  );
}

// Page 0 — Intro
function PageIntro({ onNext }: { onNext: () => void }) {
  return (
    <PageShell step={0} total={7}>
      <div>
        <p className="eyebrow stagger-1">Sebuah perjalanan kecil</p>
        <h1 className="display stagger-2" style={{ marginTop: "1rem" }}>
          Untuk kamu
          <br />
          yang berarti
        </h1>
        <p className="body-text stagger-3" style={{ marginTop: "1.5rem", maxWidth: 400 }}>
          Jawab beberapa pertanyaan, dan di akhir kamu akan mendapat sesuatu yang dibuat khusus untukmu.
        </p>
        <p className="body-text stagger-4" style={{ marginTop: "0.5rem" }}>
          Tidak perlu terburu-buru.
        </p>
        <div className="stagger-5" style={{ marginTop: "2.5rem" }}>
          <button className="btn-primary" onClick={onNext}>
            Mulai &rarr;
          </button>
        </div>
      </div>
    </PageShell>
  );
}

// Page 1 — Partner name
function PageName({ onNext, answers, setAnswers }: { onNext: () => void; answers: Answers; setAnswers: (a: Answers) => void }) {
  return (
    <PageShell step={1} total={7}>
      <div>
        <p className="eyebrow stagger-1">Pertanyaan pertama</p>
        <h2 className="display stagger-2" style={{ marginTop: "1rem", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
          Siapa nama pasanganmu?
        </h2>
        <p className="body-text stagger-3" style={{ marginTop: "1rem" }}>
          Nama yang akan muncul di pesan akhir nanti.
        </p>
        <div className="stagger-4" style={{ marginTop: "2rem" }}>
          <input
            type="text"
            placeholder="Nama pasanganmu"
            value={answers.partnerName}
            onChange={(e) => setAnswers({ ...answers, partnerName: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && answers.partnerName.trim() && onNext()}
            autoFocus
          />
        </div>
        <div className="stagger-5" style={{ marginTop: "1.5rem" }}>
          <button className="btn-primary" onClick={onNext} style={{ opacity: answers.partnerName.trim() ? 1 : 0.4, cursor: answers.partnerName.trim() ? "pointer" : "not-allowed" }} disabled={!answers.partnerName.trim()}>
            Lanjut &rarr;
          </button>
        </div>
      </div>
    </PageShell>
  );
}

// Page 2 — Mood
function PageMood({ onNext, answers, setAnswers }: { onNext: () => void; answers: Answers; setAnswers: (a: Answers) => void }) {
  return (
    <PageShell step={2} total={7}>
      <div>
        <p className="eyebrow stagger-1">Tentang perasaanmu</p>
        <h2 className="display stagger-2" style={{ marginTop: "1rem", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
          Bagaimana suasana hatimu sekarang?
        </h2>
        <div className="stagger-3" style={{ display: "grid", gap: "0.75rem", marginTop: "2rem" }}>
          {MOODS.map((m) => (
            <div
              key={m.id}
              className={`choice-card ${answers.mood === m.id ? "selected" : ""}`}
              onClick={() => {
                setAnswers({ ...answers, mood: m.id });
                setTimeout(onNext, 300);
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

// Page 3 — Memory
function PageMemory({ onNext, answers, setAnswers }: { onNext: () => void; answers: Answers; setAnswers: (a: Answers) => void }) {
  const [custom, setCustom] = useState("");
  const [useCustom, setUseCustom] = useState(false);

  const handleSelect = (mem: string) => {
    setAnswers({ ...answers, memory: mem });
    setTimeout(onNext, 300);
  };

  return (
    <PageShell step={3} total={7}>
      <div>
        <p className="eyebrow stagger-1">Kenangan</p>
        <h2 className="display stagger-2" style={{ marginTop: "1rem", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
          Momen apa yang paling sering kamu kenang?
        </h2>
        <div className="stagger-3" style={{ display: "grid", gap: "0.6rem", marginTop: "2rem" }}>
          {MEMORIES.map((m) => (
            <div
              key={m}
              className={`choice-card ${answers.memory === m && !useCustom ? "selected" : ""}`}
              onClick={() => {
                setUseCustom(false);
                handleSelect(m);
              }}
            >
              <div style={{ fontSize: "0.95rem" }}>{m}</div>
            </div>
          ))}
          <div className={`choice-card ${useCustom ? "selected" : ""}`} onClick={() => setUseCustom(true)}>
            <div style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>Tulis sendiri...</div>
          </div>
        </div>

        {useCustom && (
          <div style={{ marginTop: "1rem", animation: "fadeIn 0.3s ease" }}>
            <input
              type="text"
              placeholder="Ceritakan momenmu"
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

// Page 4 — Love language
function PageLoveLanguage({ onNext, answers, setAnswers }: { onNext: () => void; answers: Answers; setAnswers: (a: Answers) => void }) {
  return (
    <PageShell step={4} total={7}>
      <div>
        <p className="eyebrow stagger-1">Bahasa cinta</p>
        <h2 className="display stagger-2" style={{ marginTop: "1rem", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
          Bagaimana cara terbaik kamu merasa dicintai?
        </h2>
        <div className="stagger-3" style={{ display: "grid", gap: "0.75rem", marginTop: "2rem" }}>
          {LOVE_LANGUAGES.map((ll) => (
            <div
              key={ll.id}
              className={`choice-card ${answers.loveLanguage === ll.id ? "selected" : ""}`}
              onClick={() => {
                setAnswers({ ...answers, loveLanguage: ll.id });
                setTimeout(onNext, 300);
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

// Page 5 — Dream date
function PageDreamDate({ onNext, answers, setAnswers }: { onNext: () => void; answers: Answers; setAnswers: (a: Answers) => void }) {
  return (
    <PageShell step={5} total={7}>
      <div>
        <p className="eyebrow stagger-1">Impian</p>
        <h2 className="display stagger-2" style={{ marginTop: "1rem", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
          Kencan seperti apa yang paling kamu inginkan?
        </h2>
        <div className="stagger-3" style={{ display: "grid", gap: "0.75rem", marginTop: "2rem" }}>
          {DREAM_DATES.map((d) => (
            <div
              key={d.id}
              className={`choice-card ${answers.dreamDate === d.id ? "selected" : ""}`}
              onClick={() => {
                setAnswers({ ...answers, dreamDate: d.id });
                setTimeout(onNext, 300);
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

// Page 6 — Personal message
function PageMessage({ onNext, answers, setAnswers }: { onNext: () => void; answers: Answers; setAnswers: (a: Answers) => void }) {
  return (
    <PageShell step={6} total={7}>
      <div>
        <p className="eyebrow stagger-1">Satu hal terakhir</p>
        <h2 className="display stagger-2" style={{ marginTop: "1rem", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
          Ada yang ingin kamu tambahkan?
        </h2>
        <p className="body-text stagger-3" style={{ marginTop: "1rem" }}>
          Sesuatu yang belum pernah kamu ucapkan, atau ingin kamu ulangi. Boleh dikosongkan.
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

// Page 7 — Result
function PageResult({ answers, onRestart }: { answers: Answers; onRestart: () => void }) {
  const [copied, setCopied] = useState(false);
  const letter = generateLetter(answers);

  const handleCopy = () => {
    navigator.clipboard.writeText(letter).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <PageShell step={7} total={7}>
      <div>
        <p className="eyebrow stagger-1">Untukmu</p>
        <h2 className="display stagger-2" style={{ marginTop: "1rem", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}>
          Pesan yang dibuat khusus
        </h2>

        <div
          className="stagger-3"
          style={{
            marginTop: "2rem",
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: "1.75rem",
            maxHeight: "45vh",
            overflowY: "auto",
          }}
        >
          <pre
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "0.9rem",
              lineHeight: 1.85,
              color: "var(--text)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {letter}
          </pre>
        </div>

        <div className="stagger-4" style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={handleCopy}>
            {copied ? "Tersalin" : "Salin pesan"}
          </button>
          <button className="btn-outline" onClick={onRestart}>
            Mulai ulang
          </button>
        </div>

        <p className="body-text stagger-5" style={{ marginTop: "1.25rem", fontSize: "0.82rem" }}>
          Dibuat berdasarkan jawabanmu. Tidak ada yang disimpan.
        </p>
      </div>
    </PageShell>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

const INITIAL_ANSWERS: Answers = {
  partnerName: "",
  mood: "",
  memory: "",
  loveLanguage: "",
  dreamDate: "",
  message: "",
};

export default function Home() {
  const [step, setStep] = useState(0);
  const [key, setKey] = useState(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);

  const goNext = () => {
    setKey((k) => k + 1);
    setStep((s) => s + 1);
  };

  const restart = () => {
    setAnswers(INITIAL_ANSWERS);
    setKey((k) => k + 1);
    setStep(0);
  };

  const pages = [
    <PageIntro key="intro" onNext={goNext} />,
    <PageName key="name" onNext={goNext} answers={answers} setAnswers={setAnswers} />,
    <PageMood key="mood" onNext={goNext} answers={answers} setAnswers={setAnswers} />,
    <PageMemory key="memory" onNext={goNext} answers={answers} setAnswers={setAnswers} />,
    <PageLoveLanguage key="ll" onNext={goNext} answers={answers} setAnswers={setAnswers} />,
    <PageDreamDate key="date" onNext={goNext} answers={answers} setAnswers={setAnswers} />,
    <PageMessage key="msg" onNext={goNext} answers={answers} setAnswers={setAnswers} />,
    <PageResult key="result" answers={answers} onRestart={restart} />,
  ];

  return <div key={key}>{pages[step]}</div>;
}
