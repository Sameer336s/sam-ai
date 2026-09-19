"""sam_chat.py — Sam 1.0 (Codename: Astra) CLI demo

A lightweight, dependency-free demo of the Sam persona.
Run it with:  python3 sam_chat.py

The full sam-1 model card lives in model/model_card.md and on Hugging Face.
"""

import random
import sys

BANNER = """
  ____             _    ___  
 / ___|  __ _  ___| | _/ _ \ 
 \___ \ / _` |/ __| |/ / | | |
  ___) | (_| | (__|   <| |_| |
 |____/ \__,_|\___|_|\_\\___/ 
 Sam 1.0 (Codename: Astra) — sam-1-fast CLI demo
 One AI. Every possibility.
"""

INFO = {
    "who are you": "I'm Sam 1.0 (Codename: Astra) — a multimodal general-purpose AI by Sam AI Labs.\nArchitecture: Advanced Transformer + Mixture-of-Experts | Context: 1M tokens | Languages: 100+",
    "what can you do": "\U0001F9E0 Advanced reasoning  \U0001F4BB Coding  \U0001F441\uFE0F Vision\n\U0001F3A8 Image generation  \U0001F4C4 Document intelligence  \U0001F310 Web intelligence\n\U0001F527 Tool use  \U0001F399\uFE0F Voice mode  \U0001F9E9 Agent mode  \U0001F510 Privacy mode",
    "modes": "\u26A1 Instant — fast everyday answers\n\U0001F914 Think — deeper reasoning\n\U0001F680 Pro — complex coding & research\n\U0001F9E9 Agent — multi-step autonomous tasks\n\U0001F3A8 Creative — writing, design & ideas",
    "model ids": "sam-1, sam-1-fast, sam-1-thinking, sam-1-pro, sam-1-vision, sam-1-code, sam-1-agent",
    "context": "My context window is 1M tokens — roughly 750,000 words. Whole codebases and long research papers fit in one conversation.",
    "languages": "I speak 100+ languages — English, Hindi, Marathi, Tamil, Telugu, Bengali, Urdu and many more. \U0001F30D",
    "who made you": "I was developed by Sam AI Labs — version Sam 1.0, codename Astra. Smart. Adaptive. Multimodal.",
    "privacy": "\U0001F510 Privacy Mode minimizes unnecessary data retention. Your conversations stay yours.",
}

FALLBACKS = [
    "Interesting! In this CLI demo I know about my capabilities, modes, model IDs and architecture — try 'what can you do'.",
    "I hear you! \u26A1 Try 'modes', 'model ids', or ask me 'who are you'.",
    "Good question. For the full experience, chat with sam-1 on the website. Here, try 'what can you do'.",
]


def simple_math(expr):
    """Safely evaluate a plain arithmetic expression."""
    allowed = set("0123456789+-*/(). ^")
    if not set(expr) <= allowed or not set("+-*/^") & set(expr):
        return None
    try:
        return eval(expr.replace("^", "**"), {"__builtins__": {}}, {})
    except Exception:
        return None


def sam_respond(message: str) -> str:
    m = message.lower().strip()
    for key, answer in INFO.items():
        if key in m:
            return answer
    if m in ("hi", "hello", "hey", "namaste"):
        return "Hey there! \U0001F44B I'm Sam — Sam 1.0, codename Astra. What can I do for you today?"
    if "haiku" in m:
        return "Silicon dreaming,\nAstra wakes in a whisper —\nOne AI, all worlds. \U0001F3A8"
    if "joke" in m:
        return "Why did the neural network go to therapy? Too many hidden layers of trauma. \U0001F604"
    if m in ("bye", "exit", "quit"):
        return "Goodbye! \U0001F44B One AI. Every possibility. \U0001F680"
    result = simple_math(m)
    if result is not None:
        return f"\U0001F9E0 That would be {result}."
    return random.choice(FALLBACKS)


def main():
    print(BANNER)
    print("Type your message ('quit' to exit)\n")
    while True:
        try:
            user = input("you > ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nGoodbye! \U0001F44B")
            break
        if not user:
            continue
        if user.lower() in ("quit", "exit", "bye"):
            print("sam  > Goodbye! \U0001F44B One AI. Every possibility. \U0001F680")
            break
        print(f"sam  > {sam_respond(user)}\n")


if __name__ == "__main__":
    sys.exit(main())
