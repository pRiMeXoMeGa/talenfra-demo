// 47 synthetic Senior Product Manager applicants. Entirely fictional — no real
// people or data. Deliberately spread from strong B2B SaaS PMs to clear rejects,
// with red flags seeded (gaps, job-hopping, mislabeled roles, listed-not-used skills)
// so a real scoring pass has genuine signal to work with.

export const candidates = [
  { id: 'C01', name: 'Sarah Chen', resume:
`Senior Product Manager · 6 yrs PM experience
- Senior PM, Latitude Analytics (B2B SaaS analytics platform), 2021–present (3.5 yrs). Own the reporting & dashboards area; lead a squad of 8 (eng, design, data). Shipped self-serve reporting that grew activation 34%.
- Product Manager, Northwind CRM (B2B SaaS), 2018–2021 (2.5 yrs). Owned integrations roadmap; ran quarterly planning with sales & CS.
- Writes PRDs and quarterly strategy docs; presents roadmap to exec team.
- BSc Computer Science, UC Berkeley.` },

  { id: 'C02', name: 'Marcus Webb', resume:
`Product Manager → Senior PM · 5 yrs PM
- Senior PM, PayLoop (fintech SaaS payments), 2020–present (4 yrs). Own merchant onboarding; drove roadmap that cut onboarding time 40%. Coordinated eng/design/compliance.
- PM, small fintech startup, 2019–2020 (1 yr).
- Strong roadmap ownership; less exposure outside payments/fintech.
- MBA, London Business School.` },

  { id: 'C03', name: 'Aisha Rahman', resume:
`Senior Product Manager · 7 yrs PM
- Senior PM, Forge Devtools (B2B SaaS, developer API platform), 2019–present (5 yrs). Own the API & SDK product; mentor 2 junior PMs; led the v2 API rewrite adopted by 12k developers.
- PM, cloud infra startup, 2017–2019 (2 yrs).
- Deep API/platform product experience; writes detailed technical specs.
- MEng Software Engineering.` },

  { id: 'C04', name: 'Diego Fernández', resume:
`Group Product Manager · 8 yrs PM
- Group PM, TalentGrid (HR/recruiting SaaS), 2018–present (6 yrs). Manage 3 PMs; own the ATS & sourcing product line. Launched an AI matching feature used by 400+ recruiting firms.
- Senior PM, HR tech scale-up, 2016–2018 (2 yrs).
- Directly relevant recruiting-tech domain; leads roadmap and hiring for the PM pod.
- BA Economics.` },

  { id: 'C05', name: 'Yuki Tanaka', resume:
`Senior Product Manager · 6 yrs PM
- Senior PM, Streamline Data (B2B SaaS data pipeline platform), 2020–present (4 yrs). Own ingestion & connectors; lead squad of 6; grew connector catalogue from 20 to 90.
- PM, analytics SaaS, 2018–2020 (2 yrs).
- Strong data-platform SaaS background; solid stakeholder comms.
- MSc Information Systems.` },

  { id: 'C06', name: 'Hannah Schmidt', resume:
`Senior Product Manager · 5 yrs PM
- Senior PM, Beacon Martech (B2B SaaS marketing automation), 2021–present (3 yrs). Own campaign builder; roadmap owner; work daily with sales & CS.
- PM, email SaaS tool, 2019–2021 (2 yrs).
- Good B2B SaaS and communication; leadership scope still growing.
- BA Marketing.` },

  { id: 'C07', name: 'Priya Nair', resume:
`Product Manager · ~4 yrs PM
- PM, Cloudscale (B2B SaaS infra monitoring), 2021–present (3 yrs). Own alerting product; work with eng & design.
- Associate PM, same company, 2020–2021 (1 yr).
- Relevant SaaS domain; shorter overall tenure and not yet led other PMs.
- BSc Computer Science.` },

  { id: 'C08', name: 'James Okafor', resume:
`Product Manager · 5 yrs PM
- PM, ShopBright (consumer e-commerce app), 2019–present (5 yrs). Own checkout & search; A/B tests lifted conversion 12%.
- Strong consumer product skills; limited B2B / enterprise exposure.
- Works with growth & design; less stakeholder work with sales.
- BA Business.` },

  { id: 'C09', name: 'Tom Bradley', resume:
`Product Manager · ~5 yrs PM (fragmented)
- PM, Vertex SaaS, 2023–present (1 yr).
- PM, Helio SaaS, 2022–2023 (1 yr).
- PM, Orbit SaaS, 2021–2022 (1 yr).
- PM, early startup, 2019–2021 (2 yrs).
- B2B SaaS throughout, but four roles in five years — short tenures.
- BSc Marketing.` },

  { id: 'C10', name: 'Fatima Al-Sayed', resume:
`Product Manager · 5 yrs PM
- PM, LearnLoop (edtech SaaS), 2019–present (5 yrs). Own the instructor tools; ran roadmap; grew instructor retention.
- Solid SaaS PM; domain is education rather than core B2B workflow.
- Writes specs; presents to leadership quarterly.
- MA Education Technology.` },

  { id: 'C11', name: "Kevin O'Brien", resume:
`Senior Product Manager · 6 yrs PM (hardware/IoT)
- Senior PM, Sensia IoT (connected-device hardware + companion app), 2018–present (6 yrs). Own the device companion software; led firmware+app coordination.
- Strong leadership and ownership, but mostly hardware/IoT, not pure SaaS.
- Transitioning toward B2B SaaS.
- BEng Electronics.` },

  { id: 'C12', name: 'Nina Petrova', resume:
`Product Manager · 4 yrs PM
- PM, LedgerPay (fintech SaaS), 2021–present (3 yrs). Own reconciliation product.
- Career gap Jan–Oct 2020 (10 months, unexplained).
- PM, fintech startup, 2018–2019 (1.5 yrs).
- Relevant SaaS/fintech; the gap is unexplained on the CV.
- BSc Finance.` },

  { id: 'C13', name: 'Raj Malhotra', resume:
`Product Manager · 6 yrs PM
- PM, FreightFlow (logistics SaaS), 2019–present (5 yrs). Own carrier portal; roadmap owner; work with ops & sales.
- APM, logistics startup, 2018–2019 (1 yr).
- Solid B2B SaaS in logistics; steady tenure; leadership scope moderate.
- BTech Mechanical Engineering.` },

  { id: 'C14', name: 'Grace Kim', resume:
`Product Manager · 4 yrs PM
- PM, MediSync (healthcare SaaS for clinics), 2020–present (4 yrs). Own scheduling module; work with clinical & eng stakeholders.
- Relevant SaaS; healthcare domain; hasn't managed other PMs.
- BSc Nursing + product certificate.` },

  { id: 'C15', name: 'Oliver Wright', resume:
`Product Manager · 4 yrs PM
- PM, Cadence SaaS (B2B workflow tool), 2020–present (4 yrs). Deliver features from a roadmap set by the Head of Product; run sprints with eng.
- Good SaaS exposure but mostly execution; limited evidence of owning strategy or leading squads.
- BSc Information Systems.` },

  { id: 'C16', name: 'Amara Okoro', resume:
`Product Manager · 5 yrs PM
- PM, Pulse Martech (B2B SaaS), 2019–present (5 yrs). Own analytics dashboards; partner with data & design.
- Steady B2B SaaS; communication strong; leadership growing.
- BA Statistics.` },

  { id: 'C17', name: 'Lucas Silva', resume:
`Senior Product Manager · 7 yrs PM (gaming)
- Senior PM, NovaPlay (consumer mobile gaming), 2017–present (7 yrs). Own live-ops & monetization; led a squad of 10.
- Strong leadership and ownership, but domain is consumer gaming, not B2B SaaS.
- BA Game Design.` },

  { id: 'C18', name: 'Mei Lin', resume:
`Product Manager · 4 yrs PM
- PM, DevHub (B2B SaaS developer tools), 2020–present (4 yrs). Own CI/CD dashboard; write technical specs; work with eng.
- Good SaaS/devtools fit; tenure fine; leadership scope modest.
- BSc Computer Science.` },

  { id: 'C19', name: 'Daniel Cohen', resume:
`Product Owner · 5 yrs
- Product Owner, Meridian SaaS, 2019–present (5 yrs). Manage the backlog, write user stories, run sprint ceremonies for two eng teams.
- Mostly delivery/backlog execution; limited evidence of roadmap ownership or product strategy.
- BSc Software Engineering.` },

  { id: 'C20', name: 'Sofia Rossi', resume:
`Product Manager · 4 yrs PM
- PM, Clearline (B2B SaaS billing), 2020–present (4 yrs). Own invoicing product; praised for crisp PRDs and exec presentations.
- Solid SaaS; strong communication; hasn't led other PMs yet.
- BA Communications.` },

  { id: 'C21', name: 'Lisa Park', resume:
`Associate Product Manager · 2 yrs
- Associate PM, Brightwave SaaS, 2022–present (2 yrs). Support a senior PM; own small features; run user interviews.
- Promising but junior; under the required PM experience for a senior role.
- BSc Marketing.` },

  { id: 'C22', name: 'Brandon Lee', resume:
`Project Manager · 8 yrs (construction)
- Project Manager, Keystone Construction, 2016–present (8 yrs). Manage timelines, budgets, contractors for building projects.
- No software product management; this is construction project management.
- PMP certified.` },

  { id: 'C23', name: 'Chloe Martin', resume:
`Marketing Manager pivoting to product · 0 yrs PM
- Marketing Manager, Vantage SaaS, 2019–present (5 yrs). Run demand gen and campaigns; collaborate with the product team.
- Keen to move into PM; no product management ownership yet.
- BA Marketing.` },

  { id: 'C24', name: 'Ahmed Hassan', resume:
`Business Analyst · 6 yrs
- Senior Business Analyst, Corva SaaS, 2018–present (6 yrs). Gather requirements, write BRDs, support delivery.
- Adjacent to product but no roadmap ownership or product decisions.
- BSc Information Systems.` },

  { id: 'C25', name: 'Emma Thompson', resume:
`Associate Product Manager · 1.5 yrs
- APM, Tally SaaS, 2023–present (1.5 yrs). Own small enhancements under a senior PM.
- Early-career; below the experience bar for a senior role.
- BA Economics.` },

  { id: 'C26', name: 'Carlos Mendez', resume:
`Program Manager · 7 yrs
- Technical Program Manager, Zenith SaaS, 2017–present (7 yrs). Coordinate cross-team delivery, dependencies, and launches.
- Program management, not product ownership; doesn't set the roadmap.
- BSc Engineering.` },

  { id: 'C27', name: 'Sophie Dubois', resume:
`UX Designer moving to PM · 0 yrs PM
- Senior UX Designer, Aperture SaaS, 2018–present (6 yrs). Own design system and flows; partner closely with PMs.
- Strong product sense but no PM title/ownership yet.
- BA Interaction Design.` },

  { id: 'C28', name: 'Ryan Foster', resume:
`Product Manager · job-hopping (red flag)
- PM, Quibble SaaS, Mar 2024–present (6 mo).
- PM, Drift startup, Jul 2023–Feb 2024 (7 mo).
- PM, Nomad SaaS, Nov 2022–Jun 2023 (7 mo).
- PM, Flux app, Mar 2022–Oct 2022 (7 mo).
- B2B SaaS but four sub-8-month stints in ~2.5 years.
- BSc Business.` },

  { id: 'C29', name: 'Priyanka Iyer', resume:
`Junior Product Manager · 2 yrs
- Junior PM, Cobalt SaaS, 2022–present (2 yrs). Own small features; assist roadmap prep.
- Below the senior experience bar.
- BTech Computer Science.` },

  { id: 'C30', name: 'Jackson Miller', resume:
`Account Executive aspiring to PM · 0 yrs PM
- Senior AE, Rampart SaaS, 2019–present (5 yrs). Close mid-market deals; relay customer needs to product.
- Strong customer insight but no product management experience.
- BA Business.` },

  { id: 'C31', name: 'Zara Ahmed', resume:
`Data Analyst · 5 yrs
- Senior Data Analyst, Insight SaaS, 2019–present (5 yrs). Build dashboards and reports; support product with analysis.
- Analytics, not product management.
- MSc Data Science.` },

  { id: 'C32', name: 'Nathan Clark', resume:
`APM · ~1 yr (plus internship)
- APM, Beacon SaaS, 2023–present (1 yr).
- Product intern, 2022 (6 mo).
- Very early career.
- BSc Business Analytics.` },

  { id: 'C33', name: 'Isabella Garcia', resume:
`Operations Manager · 6 yrs
- Ops Manager, Cargo SaaS, 2018–present (6 yrs). Run internal operations, vendor management, and process improvement.
- No product ownership.
- BA Management.` },

  { id: 'C34', name: 'Wei Zhang', resume:
`Software Engineer wanting PM · 0 yrs PM
- Senior Engineer, Kernel SaaS, 2018–present (6 yrs). Build backend services; contribute to technical design.
- Strong technical depth; no PM ownership yet.
- MSc Computer Science.` },

  { id: 'C35', name: 'Megan Turner', resume:
`Product Manager · 3 yrs PM (gap)
- PM, Harbor SaaS, 2021–present (3 yrs). Own onboarding flows.
- Career gap 2019–mid-2021 (~18 months, unexplained).
- Below experience bar once the gap is accounted for; gap unexplained.
- BA Psychology.` },

  { id: 'C36', name: 'Omar Farah', resume:
`Management Consultant · 5 yrs
- Consultant, Meridian Advisory, 2019–present (5 yrs). Advise SaaS clients on strategy and operations.
- Strategy exposure but no hands-on product ownership.
- MBA.` },

  { id: 'C37', name: 'Hannah Cole', resume:
`Associate Product Manager · 2.5 yrs
- APM, Willow SaaS, 2021–present (2.5 yrs). Own minor features under a lead PM.
- Below the senior bar.
- BA Communications.` },

  { id: 'C38', name: 'Victor Nguyen', resume:
`Project Coordinator · 4 yrs
- Project Coordinator, Summit SaaS, 2020–present (4 yrs). Track tasks, schedules, and status across teams.
- Coordination, not product management.
- BA Business Administration.` },

  { id: 'C39', name: 'Leah Goldberg', resume:
`Product Marketing Manager · 5 yrs
- PMM, Crestview SaaS, 2019–present (5 yrs). Own positioning, launches, and messaging; partner with PMs.
- Marketing, not product management ownership.
- BA English.` },

  { id: 'C40', name: 'Samuel Adeyemi', resume:
`QA Lead moving to PM · 0 yrs PM
- QA Lead, Fathom SaaS, 2017–present (7 yrs). Own test strategy; work closely with product and eng.
- No PM ownership yet.
- BSc Computer Science.` },

  { id: 'C41', name: 'Julia Ivanova', resume:
`Product Manager · skills listed without evidence (red flag)
- PM, Apex SaaS, 2020–present (4 yrs).
- Skills section lists: roadmap strategy, A/B testing, SQL, pricing, growth, ML products.
- Role bullets only mention "attended planning meetings" and "updated the backlog" — none of the listed skills appear in actual work described.
- BSc Business.` },

  { id: 'C42', name: 'Marcus Bell', resume:
`Founder / self-described PM · unclear scope
- Founder, Bell Labs (own failed startup), 2021–2024 (3 yrs). "Did product, sales, and everything."
- Solo founder; no evidence of structured PM practice, roadmap process, or team leadership.
- BSc Entrepreneurship.` },

  { id: 'C43', name: 'Anaïs Laurent', resume:
`Associate Product Manager · 3 yrs (consumer)
- APM, Bloom (consumer wellness app), 2021–present (3 yrs). Own small features; run experiments.
- Consumer domain and still associate-level.
- BA Design.` },

  { id: 'C44', name: 'Tyler Scott', resume:
`Product Manager · short stints (red flag)
- PM, Ridge SaaS, 2023–present (10 mo).
- PM, Vale SaaS, 2022–2023 (9 mo).
- PM, Peak SaaS, 2021–2022 (11 mo).
- PM, Crest app, 2020–2021 (10 mo).
- ~4 yrs total but every role under a year.
- BSc Marketing.` },

  { id: 'C45', name: 'Deepa Krishnan', resume:
`Scrum Master · 6 yrs
- Scrum Master, Orion SaaS, 2018–present (6 yrs). Facilitate ceremonies, remove blockers for two squads.
- Agile delivery role, not product management.
- CSM certified.` },

  { id: 'C46', name: 'George Papadopoulos', resume:
`Product Manager · 2 yrs PM + unrelated
- PM, Atlas SaaS, 2022–present (2 yrs). Own a small module.
- Retail store manager, 2019–2022 (3 yrs, unrelated).
- Below the senior PM experience bar.
- BA Business.` },

  { id: 'C47', name: 'Farah Nasser', resume:
`Recent graduate · 0 yrs
- Product Management certificate, 2024.
- No professional product experience; internships in marketing.
- BA Communications.` },
]
