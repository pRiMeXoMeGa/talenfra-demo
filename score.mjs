// Talenfra demo — scores 47 synthetic Senior PM candidates against a rubric.
//
//   REAL run:  ANTHROPIC_API_KEY=sk-ant-... node score.mjs
//   MOCK run:  node score.mjs --mock          (no key needed, for building/preview)
//
// Writes results.js (window.__TALENFRA_RESULTS__ = {...}) which index.html plays back.
// Uses the raw Anthropic Messages API over fetch — no npm install required.

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { candidates } from './data/candidates.mjs'

const __dir = dirname(fileURLToPath(import.meta.url))
const rubric = JSON.parse(readFileSync(join(__dir, 'data/rubric.json'), 'utf8'))

const MOCK = process.argv.includes('--mock')
const API_KEY = process.env.ANTHROPIC_API_KEY
const MODEL = process.env.MODEL || 'claude-sonnet-5'
const CONCURRENCY = 5

const WEIGHTS = Object.fromEntries(rubric.criteria.map((c) => [c.key, c.weight]))
const WEIGHT_SUM = Object.values(WEIGHTS).reduce((a, b) => a + b, 0)

// --- helpers for varied mock notes -----------------------------------------
const DOMAINS = [
  ['recruiting', 'recruiting-tech'], ['hr/recruiting', 'recruiting-tech'], ['analytics', 'analytics'],
  ['payments', 'payments'], ['fintech', 'fintech'], ['devtools', 'developer-tools'], ['developer', 'developer-tools'],
  ['api', 'API platform'], ['data pipeline', 'data-platform'], ['data platform', 'data-platform'],
  ['marketing automation', 'martech'], ['martech', 'martech'], ['edtech', 'edtech'], ['logistics', 'logistics'],
  ['healthcare', 'healthcare'], ['e-commerce', 'consumer e-commerce'], ['gaming', 'consumer gaming'],
  ['iot', 'hardware/IoT'], ['billing', 'billing'], ['workflow', 'B2B workflow'], ['crm', 'CRM'], ['monitoring', 'infra monitoring'],
]
const domainOf = (t) => (DOMAINS.find(([k]) => t.includes(k)) || [null, 'B2B software'])[1]
const CRIT_LABEL = { saas: 'SaaS depth', domain: 'domain fit', leadership: 'leadership', communication: 'communication', tenure: 'tenure' }

// Pull a short résumé line as the "evidence" behind each criterion (mock only;
// the real pass has Claude quote the actual line it scored from).
function mockEvidence(resume) {
  const lines = resume.split('\n').map((l) => l.replace(/^-\s*/, '').trim()).filter(Boolean)
  const used = new Set()
  const pick = (re, fallback) => {
    const l = lines.find((x) => !used.has(x) && re.test(x.toLowerCase()))
    if (l) { used.add(l); return l.slice(0, 130) }
    return fallback
  }
  return {
    saas: pick(/saas|b2b|platform|\bapi\b|sdk|subscription|dashboard/, 'No clear B2B SaaS product experience.'),
    domain: pick(/analytics|fintech|payment|devtool|\bdata\b|\bhr\b|recruit|martech|edtech|logistic|health|commerce|gaming|iot|billing|workflow|crm|monitor|construction|consult|ops|analyst/, 'Domain not directly relevant to this role.'),
    leadership: pick(/lead|manag|squad|mentor|own the|owns |group pm|roadmap|drove|backlog/, 'No team or roadmap leadership described.'),
    communication: pick(/prd|presents|stakeholder|writes|strategy doc|exec team|specs|messaging/, 'Limited evidence of stakeholder or written communication.'),
    tenure: pick(/gap|stint|short|mo\)|steady|progression|four roles|under a year|sub-8|unrelated/, lines[0] || ''),
  }
}

// ---- scoring helpers -------------------------------------------------------

function overallFrom(criteria) {
  const total = rubric.criteria.reduce((sum, c) => sum + (criteria[c.key] ?? 0) * c.weight, 0)
  return Math.round(total / WEIGHT_SUM)
}

function classify(score, eligible) {
  const tier = score >= 80 ? 'A' : score >= 60 ? 'B' : 'C'
  let action
  if (!eligible) action = 'Reject'
  else action = score >= 80 ? 'Shortlist' : score >= 60 ? 'Hold' : 'Reject'
  return { tier, action }
}

function finalize(c, { eligible, knockoutReason, criteria, evidence = {}, note, redFlags }) {
  const overallScore = overallFrom(criteria)
  const { tier, action } = classify(overallScore, eligible)
  return {
    id: c.id,
    name: c.name,
    eligible,
    knockoutReason: knockoutReason || null,
    criteria,
    evidence,
    overallScore,
    tier,
    action,
    note: note.trim(),
    redFlags: Array.isArray(redFlags) ? redFlags : [],
  }
}

// ---- real scoring via Claude ----------------------------------------------

const SYSTEM = `You are an expert recruiting screener. You score one candidate's resume against a fixed rubric for a Senior Product Manager role at a B2B SaaS company. Judge ONLY on evidence in the resume — never invent experience. Be discerning: most applicants are not a strong fit. Keep every judgement strictly job-related and fair (no age/gender/nationality proxies). Return ONLY valid JSON, no prose.`

function userPrompt(c) {
  const crit = rubric.criteria
    .map((x) => `- ${x.key} ("${x.name}", weight ${x.weight}): ${x.lookFor}`)
    .join('\n')
  const ko = rubric.knockouts.map((k) => `- ${k.name}: ${k.rule}`).join('\n')
  return `ROLE: ${rubric.roleTitle}
CONTEXT: ${rubric.roleContext}

KNOCKOUT (pass/fail):
${ko}

SCORED CRITERIA (score each 0-100 from resume evidence):
${crit}

CANDIDATE RESUME:
"""
${c.resume}
"""

Return JSON exactly:
{
  "eligible": boolean,            // false if the knockout fails
  "knockoutReason": string,       // short reason if ineligible, else ""
  "criteria": { "saas": 0-100, "domain": 0-100, "leadership": 0-100, "communication": 0-100, "tenure": 0-100 },
  "evidence": {                   // the exact resume line/phrase each score is based on (short quote)
    "saas": string, "domain": string, "leadership": string, "communication": string, "tenure": string
  },
  "note": string,                 // 1-2 plain-English sentences a recruiter would read
  "redFlags": string[]            // short phrases: gaps, job-hopping, skills-listed-not-used, mislabeled role, etc. [] if none
}`
}

async function scoreReal(c) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 700,
      temperature: 0.2,
      system: SYSTEM,
      messages: [{ role: 'user', content: userPrompt(c) }],
    }),
  })
  if (!res.ok) throw new Error(`API ${res.status}: ${(await res.text()).slice(0, 200)}`)
  const data = await res.json()
  const text = data.content?.[0]?.text ?? ''
  const json = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1)
  return finalize(c, JSON.parse(json))
}

// ---- mock scoring (no key) — believable visuals for building the page ------

function mockScore(c) {
  const t = c.resume.toLowerCase()
  const n = parseInt(c.id.slice(1), 10)
  const rnd = (seed) => { const x = Math.sin(seed * 999) * 10000; return x - Math.floor(x) }

  // Mock eligibility is fixed by design (regex on resume text mis-fires on
  // sub-role durations). The real Claude pass judges the knockout itself.
  const INELIGIBLE = new Set(['C21','C22','C23','C24','C25','C26','C27','C28','C29','C30','C31','C32','C33','C34','C35','C36','C37','C38','C39','C40','C42','C43','C45','C46','C47'])
  const eligible = !INELIGIBLE.has(c.id)
  const notPM = /(project manager|program manager|business analyst|marketing manager|ux designer|qa lead|scrum|consultant|data analyst|\bengineer\b|coordinator|recent graduate|account executive|founder)/.test(t)

  // base band by designed cohort
  const base = n <= 6 ? 87 : n <= 20 ? 69 : 42
  const jitter = (k) => Math.round((rnd(n + k) - 0.5) * 10)
  const clamp = (v) => Math.max(8, Math.min(97, v))
  const criteria = {
    saas: clamp(base + jitter(1) + (/b2b saas|devtools|data (pipeline|platform)|api/.test(t) ? 6 : /consumer|gaming|hardware|construction/.test(t) ? -18 : 0)),
    domain: clamp(base + jitter(2) + (/recruiting|hr\/recruiting|workflow|fintech|logistics/.test(t) ? 5 : 0)),
    leadership: clamp(base + jitter(3) + (/lead|manage \d|group pm|squad|mentor/.test(t) ? 8 : /execution|backlog|coordinate/.test(t) ? -14 : 0)),
    communication: clamp(base + jitter(4) + (/prd|present|stakeholder|exec/.test(t) ? 6 : 0)),
    tenure: clamp(base + jitter(5) + (/gap|mo\)|job-hop|short|under a year|sub-8/.test(t) ? -22 : 0)),
  }

  const redFlags = []
  if (/gap/.test(t)) redFlags.push('Unexplained employment gap')
  if (/(sub-8|under a year|10 mo|9 mo|7 mo|6 mo|short stints|four roles)/.test(t)) redFlags.push('Job-hopping — very short tenures')
  if (/none of the listed skills appear|only mention/.test(t)) redFlags.push('Skills listed but no supporting evidence')
  if (notPM) redFlags.push('Background is not product management')

  // Build a candidate-specific note from their strongest/weakest criteria + domain + flags.
  const dom = domainOf(t)
  const title = c.resume.split('\n')[0].split('·')[0].trim()
  const sorted = Object.entries(criteria).sort((a, b) => b[1] - a[1])
  const top = sorted[0], low = sorted[sorted.length - 1]
  const overall = overallFrom(criteria)
  const pick = (arr) => arr[Math.floor(rnd(n) * arr.length)]

  let note
  if (!eligible) {
    note = notPM
      ? `${title} background — strong on delivery, but no product-ownership evidence for a senior PM role.`
      : `Relevant ${dom} experience, but falls short of the 4-year PM requirement for this level.`
  } else if (overall >= 80) {
    note = pick([
      `Strong ${dom} PM. Best on ${CRIT_LABEL[top[0]]} (${top[1]}) with clear roadmap ownership — shortlist.`,
      `Excellent ${dom} fit; leads a squad and owns strategy. ${CRIT_LABEL[top[0]]} stands out at ${top[1]}.`,
      `Senior-ready: ${dom} depth plus ${CRIT_LABEL[top[0]]} (${top[1]}). Ownership and leadership both evident.`,
    ])
  } else {
    note = pick([
      `Capable ${dom} PM; ${CRIT_LABEL[low[0]]} is the soft spot (${low[1]}). Worth a screen before deciding.`,
      `Solid ${dom} experience but ${CRIT_LABEL[low[0]]} is light (${low[1]}) for a senior remit — hold.`,
      `Relevant ${dom} background; strongest on ${CRIT_LABEL[top[0]]} (${top[1]}), thinner on ${CRIT_LABEL[low[0]]}.`,
    ])
  }
  if (redFlags.length) note += ` Flag: ${redFlags[0].toLowerCase()}.`

  return finalize(c, { eligible, knockoutReason: eligible ? '' : (notPM ? 'Not a product management role' : 'Under 4 years PM experience'), criteria, evidence: mockEvidence(c.resume), note, redFlags })
}

// ---- runner ----------------------------------------------------------------

async function pool(items, size, fn) {
  const out = new Array(items.length)
  let i = 0
  async function worker() {
    while (i < items.length) {
      const idx = i++
      out[idx] = await fn(items[idx], idx)
    }
  }
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, worker))
  return out
}

async function main() {
  if (!MOCK && !API_KEY) {
    console.error('No ANTHROPIC_API_KEY set. Run a real pass with the key, or preview with:  node score.mjs --mock')
    process.exit(1)
  }
  console.log(`Scoring ${candidates.length} candidates ${MOCK ? '(MOCK)' : `via ${MODEL}`}...`)
  const started = Date.now()

  let done = 0
  const scored = await pool(candidates, MOCK ? candidates.length : CONCURRENCY, async (c) => {
    const r = MOCK ? mockScore(c) : await scoreReal(c)
    done++
    process.stdout.write(`\r  ${done}/${candidates.length}  ${c.name.padEnd(22)}`)
    return r
  })
  process.stdout.write('\n')

  // rank eligible-first, then by score; deterministic tiebreak on id
  scored.sort((a, b) => {
    if (a.eligible !== b.eligible) return a.eligible ? -1 : 1
    if (b.overallScore !== a.overallScore) return b.overallScore - a.overallScore
    return a.id.localeCompare(b.id)
  })
  scored.forEach((c, i) => { c.rank = i + 1 })

  const counts = scored.reduce((m, c) => ((m[c.action] = (m[c.action] || 0) + 1), m), {})
  const payload = {
    role: rubric.roleTitle,
    generatedAt: new Date().toISOString(),
    mock: MOCK,
    elapsedMs: Date.now() - started,
    counts: { shortlist: counts.Shortlist || 0, hold: counts.Hold || 0, reject: counts.Reject || 0 },
    total: scored.length,
    candidates: scored,
  }
  writeFileSync(join(__dir, 'results.js'), `window.__TALENFRA_RESULTS__ = ${JSON.stringify(payload, null, 2)}\n`)
  console.log(`Done. ${payload.counts.shortlist} shortlisted · ${payload.counts.hold} held · ${payload.counts.reject} rejected → results.js`)
}

main().catch((e) => { console.error('\n' + e.message); process.exit(1) })
