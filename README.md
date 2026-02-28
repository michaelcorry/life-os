# Breath OS Demo (Interactive Front-End Prototype)

This repo contains an interactive **Breath OS** style dashboard demo built from the report plan.

## Highlights

- Dark-first theme with a one-click dark/light toggle.
- Life-OS command-center layout with mission-based wording and unified control surfaces.
- Sidebar profile moved to the bottom area for persistent identity context.
- Interactive **hourly task view**:
  - Tasks with a specified time are shown by hour in the schedule panel.
  - Tasks without a specified time are shown in a separate unscheduled queue.
- Interactive recurring **habit tracker** with streak progression and check-ins.
- Lightweight gamification:
  - XP and level system
  - Task/habit completion rewards
  - Streak and achievement states
- Career and growth modules:
  - Interest list
  - Career skill tracking
  - Career document vault (e.g., resume location)
- Plugin marketplace demo toggles and AI assistant mock panel.
- Timezone display pinned to `Africa/Nairobi`.

## Reusable component approach (shadcn-inspired)

To keep this static prototype reusable and maintainable, the UI uses shadcn-style design tokens and reusable primitives (`card`, `action-btn`, `badge`, `pill`, progress track), plus a `components.json` scaffold aligned with shadcn conventions.

## Files

- `index.html` — dashboard structure and module zones
- `styles.css` — design tokens, dark/light themes, and responsive styling
- `app.js` — seeded data, interaction logic, and render pipeline
- `components.json` — shadcn-style component config scaffold for future migration

## Run

```bash
python3 -m http.server 4173
# open http://127.0.0.1:4173
```

## Note

Prototype/demo only; no real backend integrations are included.
