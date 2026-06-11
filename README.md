# TreeTracker — front-end skeleton

Look-and-feel only. Responsive (phone + tablet), navigable between screens, **no data layer and no logic** — every value comes from `src/mock.js`. Wire your Firestore/Storage in underneath and delete the mock.

## Run

```bash
npm install
npm run dev
```

Open the printed URL. Resize the window across ~760px to see the layout switch from the phone bottom-tab bar to the tablet side rail.

## What's here

```
src/
  styles.css            all styling + design tokens (top of file) + responsive rules
  mock.js               hardcoded sample data — replace with real reads
  App.jsx               responsive shell + presentational navigation (no router)
  screens/
    Schedule.jsx        week agenda + "waiting on customer" banner
    Pool.jsx            unscheduled jobs (triage)
    JobDetail.jsx       photos, contact buttons, details, one-tap push-back
    NewJob.jsx          customer search, work-type chips, photo add, dictation field
    Customers.jsx       searchable customer list
```

## Where to plug things in

- **Theming/branding:** every color, radius, and size is a CSS variable at the top of `styles.css`. Change `--green` to rebrand the whole app.
- **Navigation:** `App.jsx` uses simple `useState`. Swap for `react-router` when you want real URLs/back-button.
- **Data:** each screen imports from `mock.js`. Replace those imports with your data hooks; the markup and classes stay.
- **Work-type chips:** the selected state in `NewJob.jsx` is local `useState` purely so it feels alive — lift it into your form state.

## Responsive notes

- Mobile-first. Single breakpoint at **760px** (and a wider one at 1080px for optional two-column layouts via `.col-2` / `.screen.wide`).
- Touch targets are ≥52px and type is sized up for an older user — keep that if you restyle.
- `env(safe-area-inset-*)` is handled so the tab bar clears the iPhone/iPad home indicator.
