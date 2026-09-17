# Talenfra — Live Screening Demo

> **Status (2026-09-17): recorded and live.** The 3:07 screen recording is on talenfra.com (`/demo` and the
> homepage), self-hosted as an adaptive HLS stream — see the "Demo video" section of
> `../talenfra-website/README.md`. The original recording is kept here in `recordings/` (the site only
> ships the converted stream). To replace it, record again, drop the MP4 in `recordings/`, and follow the
> re-encode steps in the website README.

A self-contained demo you can screen-record for the site's Loom slot. It runs a **real
Claude screening pass** over 47 synthetic Senior Product Manager CVs against a rubric, then
plays the run back on an on-brand web page: progress → live tallies → ranked shortlist with
per-criterion scores, red flags, and AI notes.

Everything is fictional/synthetic — no real candidates or personal data.

## Files
- `data/rubric.json` — the Senior PM rubric (5 scored criteria + 1 knockout).
- `data/candidates.mjs` — 47 synthetic applicants (strong → weak, red flags seeded).
- `score.mjs` — scores every candidate and writes `results.js`. No dependencies (uses `fetch`).
- `index.html` — the animated page you record. Open it directly in a browser.
- `results.js` — generated data the page plays back (git-ignore / don't hand-edit).
- `recordings/` — the source screen recording(s) of the demo (large; not part of the website build).

## Preview right now (no key needed)
```bash
node score.mjs --mock      # writes results.js with placeholder scores
```
Then open `index.html` in your browser and click **Run screening**. This is just to see the
format and animation — the scores are fake.

## Record the real thing
1. Get an Anthropic API key → https://console.anthropic.com (Billing → add ~$5 credit →
   API Keys → Create key, it starts `sk-ant-`).
2. Copy `.env.example` to `.env` and paste your key in.
3. Run a real pass (needs Node 20.6+):
   ```bash
   node --env-file=.env score.mjs
   ```
   Costs roughly a few cents. It writes real scores into `results.js`.
4. Open `index.html`, start your screen recorder (Loom), click **Run screening**, let it play
   through to the ranked table. That's your demo.

## Notes
- **Speed vs the "28 minutes" claim.** The real pass finishes in ~1–2 minutes, and the on-screen
  animation is ~15 seconds. That's *faster* than the site's "28 minutes" line — a better story,
  not a worse one. Decide how you want to frame time in the voiceover; we can tweak the site copy
  to match (e.g. "screened in minutes, not hours").
- **Role consistency.** This demo uses **Senior Product Manager** (matching the site's output
  table). The home `DemoSection` currently says "Business Development Manager" — pick one and we'll
  align the copy.
- Change the role/rubric in `data/rubric.json` and the candidates in `data/candidates.mjs`, then
  re-run `score.mjs` to regenerate.
# talenfra-demo
