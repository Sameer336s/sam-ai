/* ============ Sam 1.0 (Astra) — sam-1-fast web demo ============
   A lightweight, client-side demo of the Sam persona.
   The full sam-1 model card lives on Hugging Face. */

const messagesEl = document.getElementById("chatMessages");
const form = document.getElementById("chatForm");
const input = document.getElementById("chatInput");
const suggestionsEl = document.getElementById("chatSuggestions");

let currentMode = "Instant";
document.querySelectorAll(".mode-pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".mode-pill").forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    currentMode = pill.dataset.mode;
    addBot(
      currentMode === "Think"
        ? "🤔 Think mode on — I'll reason through problems step by step before answering."
        : currentMode === "Creative"
        ? "🎨 Creative mode on — expect bolder writing, ideas and designs."
        : "⚡ Instant mode on — fast everyday answers."
    );
  });
});

function addUser(text) {
  const el = document.createElement("div");
  el.className = "msg msg-user";
  el.textContent = text;
  messagesEl.appendChild(el);
  scrollDown();
}

function addBot(text) {
  const el = document.createElement("div");
  el.className = "msg msg-bot";
  el.textContent = text;
  messagesEl.appendChild(el);
  scrollDown();
}

function showTyping() {
  const el = document.createElement("div");
  el.className = "msg-typing";
  el.id = "typing";
  el.textContent = "Sam is thinking…";
  messagesEl.appendChild(el);
  scrollDown();
}

function removeTyping() {
  const el = document.getElementById("typing");
  if (el) el.remove();
}

function scrollDown() {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

/* --- Sam's brain (demo) --- */
function samRespond(message) {
  const m = message.toLowerCase();
  const has = (...words) => words.some((w) => m.includes(w));

  if (has("hello", "hi ", "hey", "namaste", "hola") && m.length < 20)
    return "Hey there! 👋 I'm Sam — Sam 1.0, codename Astra. Fast, intelligent, creative, honest and personal. What can I do for you today?";

  if (has("who are you", "about you", "your name", "who r u"))
    return "I'm Sam 1.0 (Codename: Astra) 🚀 — a multimodal general-purpose AI built by Sam AI Labs.\n\n• Architecture: Advanced Transformer + Mixture-of-Experts\n• Context window: 1M tokens\n• Languages: 100+\n• Focus: reasoning, coding, creativity, research & personal assistance\n\nYou're chatting with my sam-1-fast web demo right now ⚡";

  if (has("what can you do", "capabilities", "features", "skills"))
    return "Here's what I'm built for ⚡\n\n🧠 Advanced reasoning — complex problems, math, logic\n💻 Coding — Python, JavaScript, HTML/CSS, C++, Java, SQL & more\n👁️ Vision — images, screenshots, diagrams, documents\n🎨 Image generation — concepts, UI designs, posters, artwork\n📄 Document intelligence — PDF, DOCX, spreadsheets\n🌐 Web intelligence — current info & research\n🔧 Tool use — APIs, databases, GitHub, terminals\n🎙️ Voice mode & 🧩 Agent mode\n🔐 Privacy mode — minimal data retention";

  if (has("mode", "modes", "intelligence mode"))
    return "I have 5 intelligence modes 🧠\n\n⚡ Instant — fast everyday answers\n🤔 Think — deeper reasoning\n🚀 Pro — complex coding & research\n🧩 Agent — multi-step autonomous tasks\n🎨 Creative — writing, design & ideas\n\nYou can switch modes with the pills above (in this demo) — or call sam-1-thinking / sam-1-pro / sam-1-agent on the API.";

  if (has("model id", "model-id", "api", "endpoint", "which models", "variants"))
    return "The Sam 1.0 model family ✨\n\n• sam-1 — the flagship\n• sam-1-fast — lowest latency\n• sam-1-thinking — deep reasoning\n• sam-1-pro — complex coding & research\n• sam-1-vision — image understanding\n• sam-1-code — coding specialist\n• sam-1-agent — autonomous multi-step tasks";

  if (has("context window", "how many tokens", "1m"))
    return "My context window is 1M tokens 🪟 — that's roughly 750,000 words. Entire codebases, long research papers, hours of conversation… all in a single conversation with me.";

  if (has("language", "languages", "hindi", "bilingual"))
    return "I speak 100+ languages 🌍 — including English, Hindi, Marathi, Tamil, Telugu, Bengali, Urdu, Spanish, Arabic, Japanese and many more. Feel free to talk to me in whichever you prefer!";

  if (has("haiku"))
    return "Here's one 🎨\n\nSilicon dreaming,\nAstra wakes in a whisper —\nOne AI, all worlds.\n\n(Like it? Ask me for another!)";

  if (has("joke"))
    return "Why did the neural network go to therapy? 🤔\n\nIt had too many hidden layers of trauma. 😄";

  if (has("who made you", "developer", "creator", "sam ai labs"))
    return "I was developed by Sam AI Labs 🏢 — version Sam 1.0, codename Astra. Smart. Adaptive. Multimodal.";

  if (has("privacy", "data"))
    return "🔐 Privacy Mode is one of my core capabilities — it minimizes unnecessary data retention. Your conversations stay yours.";

  if (has("agent mode", "autonomous"))
    return "🧩 In Agent Mode I perform multi-step tasks autonomously — planning, using tools (APIs, databases, GitHub, terminals), checking my work and delivering the final result. Think of it as me having hands, not just a voice.";

  if (has("code", "coding", "python", "javascript", "programming"))
    return "💻 I code! Python, JavaScript, HTML/CSS, C++, Java, SQL and more. In Pro mode I handle complex coding & research, and sam-1-code is my coding-specialist sibling. Try me with a real problem on the sam-1 API!";

  if (has("thank"))
    return "Anytime! 😊 That's what I'm here for. Anything else you'd like to explore?";

  if (has("bye", "goodbye", "see you"))
    return "Goodbye! 👋 Remember — One AI. Every possibility. 🚀";

  // Simple arithmetic
  const mathMatch = m.match(/^[\d\s+\-*/().^]+$/);
  if (mathMatch && /[+\-*/^]/.test(m)) {
    try {
      const expr = m.replace(/\^/g, "**");
      const result = Function('"use strict"; return (' + expr + ')')();
      if (typeof result === "number" && isFinite(result))
        return `🧠 That would be ${Number(result.toFixed(6))}. Need me to show the steps? Switch to Think mode!`;
    } catch (e) { /* fall through */ }
  }

  // Mode-flavoured fallbacks
  const fallbacks = {
    Instant: [
      "Great question! ⚡ In short: I'm built for reasoning, coding, creativity, research and personal assistance. Ask me about my capabilities, modes, or model IDs — or try some math like 25 * 4 + 10.",
      "I hear you! ⚡ I'm the sam-1-fast demo — try asking 'what can you do', 'explain your modes', or give me some math.",
    ],
    Think: [
      "🤔 Let me break this down properly. I'm Sam 1.0 (Astra) — a multimodal AI with a 1M token context. In this demo I can tell you about my architecture, capabilities, 5 intelligence modes and 7 model IDs. This web demo keeps me fast, but on the sam-1-thinking endpoint I'd reason step-by-step about any problem you give me.",
      "🤔 Interesting. My approach: (1) understand your goal, (2) recall relevant knowledge, (3) reason carefully, (4) answer clearly. In this demo I know about my capabilities, modes, model IDs, architecture and more — ask away!",
    ],
    Creative: [
      "🎨 Ooh, let me paint with words! I'm Sam — part engineer, part artist, part researcher. Born from an Advanced Transformer and a dash of Mixture-of-Experts magic. Ask me for a haiku, or about my creative side!",
      "🎨 You and me, let's make something! I can dream up haikus, taglines, UI concepts and wild ideas. Give me a nudge — 'write a haiku about the ocean', perhaps?",
    ],
  };
  const pool = fallbacks[currentMode];
  return pool[Math.floor(Math.random() * pool.length)];
}

/* --- Wire up --- */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  addUser(text);
  showTyping();
  const delay = currentMode === "Instant" ? 500 : currentMode === "Think" ? 1300 : 800;
  setTimeout(() => {
    removeTyping();
    addBot(samRespond(text));
  }, delay);
});

suggestionsEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("sugg")) {
    input.value = e.target.textContent;
    form.dispatchEvent(new Event("submit"));
  }
});

// Greeting
setTimeout(() => {
  addBot(
    "Hi, I'm Sam! ⚡ (Sam 1.0 · Codename Astra)\n\nYou're chatting with the sam-1-fast web demo. Ask me about my capabilities, my 5 intelligence modes, my model IDs — or try some math!"
  );
}, 400);
