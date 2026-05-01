---
layout: post
title: Detection Debt
---

Every engineering leader knows the slow burn of technical debt, the “good enough for now” code, the duct-taped legacy systems, and undocumented workarounds that eventually grind development to a halt.
Cybersecurity has its own version, and the stakes are often higher. We call it Detection Debt.
It’s the quiet buildup of outdated, noisy, broken, or abandoned detection rules clogging your SOC. Left unchecked, it wastes analyst time, buries real threats in alert noise, and creates a false sense of security.
Here’s how it piles up, what it really costs, and how to start paying it down.

**The Main Types of Detection Debt**
Detection debt shows up in a few common forms:
* Legacy Leftovers: Rules written by people who’ve long since left. No one remembers why they exist or what they were meant to catch. This also includes rules monitoring dead or barely-used software.
* Silent Failures: The scariest kind. The rule still shows “enabled,” but it’s matching on nothing because a schema changed, a migration happened, or an EDR update broke the logic. Example: A rule watching for EventCode=7045 in Windows logs goes dark after switching EDR platforms. It never fires again, and no one notices for months.
* Noise Generators: Untuned rules that flood analysts with false positives. Triage starts feeling like digging for gold in a trash heap, and people quietly learn to ignore them.
* Copy-Paste Traps: Community Sigma rules or vendor intel dropped in verbatim, never adapted to your environment or baseline.

**What It Really Costs Your Team**
Every piece of detection debt drags on daily operations.
It fuels analyst burnout. Constant false positives create alert fatigue, so when a real threat appears, it’s easy to miss.
Onboarding becomes painful. New hires waste weeks learning which alerts to ignore instead of understanding actual threats and that knowledge rarely gets documented.
Over time, it erodes trust. When the system cries wolf too often, the team stops believing the alerts. Triage slows, prioritization breaks down, and critical things slip through the cracks.

**The Hidden Danger: False Confidence**
The daily pain is bad, but the worst part is what leadership doesn’t see.
A dashboard showing “500 active rules” looks impressive. In reality, many may be stale, broken, or mentally tuned out by analysts.
Key distinction: Detection count is not detection capability.
A high rule count is a vanity metric. What matters is whether your detections actually surface real threats and drive investigations. If you can’t answer “When was the last time this rule caught something useful?”, you don’t know if it’s protecting you or just taking up space.

**Why Detection Debt Keeps Growing**
This rarely comes from negligence. It stems from structure and incentives:
* Teams reward building new detections (it looks great in reviews) far more than maintaining or retiring old ones.
* Fear of deletion: No one wants to be the person who disabled the rule that would’ve caught the next big incident.
* Employee churn: When rule creators leave, teams inherit undocumented black boxes they’re afraid to touch.

**How to Pay It Down**
You can’t wipe it out overnight, but you can manage it better:
* Leverage threat hunts: When hunting a technique, also check if your existing rules would have caught it. Did they fire? Did they miss? Turn every hunt into coverage validation.
* Add basic metadata: Require every rule to have an owner, creation date, data sources, last validated date, and a short threat description. This prevents mystery rules.
* Create a deprecation process: Define clear criteria for retirement (no true positives in 90 days, superseded technique, etc.), add a quick review, and archive instead of permanently deleting. Make killing rules feel safe.
* Track better metrics: Ditch “number of active rules.” Instead monitor fire rate, true positive rate, last actionable alert date, and data source health.
* Schedule maintenance: Put recurring rule reviews on the calendar, quarterly minimum. Treat it like patching: not sexy, but skipping it compounds the problem.

**Detection Debt Shows Your Maturity**
Early security programs focus on adding coverage which is normal. Mature teams realize that curating, maintaining, and pruning rules is equally important.
Detection debt compounds just like technical debt. The longer you ignore it, the noisier your alerts get and the bigger your hidden gaps become.
So stop counting rules.
