# Pull request template — Ooya site (copied from the central rules repo, Block A)

## BLOCK A — OWNER QA (paste in the PR that carries the list: the site PR, or the one central PR of an injector or central-only order)

## OWNER QA — the owner ticks; Chat and CC read this before the next prompt (WF-11)
How: for every step tick **PASS** or **FAIL** (one only). On FAIL, write a comment on this PR that starts `QA-FAIL [step number]:` and say what you saw (screenshot if you can). When every step is ticked, tick **ALL DONE**. QA is not closed until ALL DONE is ticked. Start only when the PR text says the deploy (and any generator run) is green.
At most 5 steps (10 only for URL / SEO / generator orders). Checks a robot already shows (Actions green, Check Pictures, SEO Watch) are not steps — Chat reads them.

**IMPACT:** [CC fills in from KNOWLEDGE_MAP — which sites, pages or workflows this change can affect, or "none"; say "injector untouched" when js/ is not changed]

### STEP 1 — [one action, tap by tap, with the full address] → EXPECTED: [what you should see] (proves: [what this step shows is right])
- [ ] PASS
- [ ] FAIL

### STEP 2 — [one action] → EXPECTED: [what you should see] (proves: [...])
- [ ] PASS
- [ ] FAIL

### ALL DONE
- [ ] I ticked PASS or FAIL for every step above.

**Not verified by CC (for the owner's awareness):** [list — CC cannot open the live site]
