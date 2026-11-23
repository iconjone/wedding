# Ashley & Jonathan — Wedding Website (`ashleyandjonathan.com`)

A static, zero-build wedding website designed for GitHub Pages and inspired by your deep aubergine-plum embossed floral and handmade ivory botanical stationery mood board.

## Quick Edits

Edit [`config.js`](./config.js) whenever your date, venue, or schedule is finalized:

- **Lock in your date:** Set `date.confirmed = true`, update `date.displayLabel` (e.g., `"October 2, 2027"`), and update `date.countdownTargetISO`, `date.icsStartUTC`, and `date.icsEndUTC`.
- **Add your venue:** Update `location.venueName`, `location.venueStatus`, `location.venueAddress`, `location.venueDescription`, and paste your Google Maps link into `location.venueMapUrl` (the directions button activates automatically).
- **Update the schedule:** Edit the `schedule` array in `config.js`.

## GitHub Pages + Porkbun DNS Setup

This repository includes:
- `CNAME` pre-configured with `ashleyandjonathan.com`
- `.nojekyll` for direct static serving

### Required Porkbun DNS Records for `ashleyandjonathan.com`

| Type  | Host  | Answer                    |
| ----- | ----- | ------------------------- |
| `A`   | *(apex / blank)* | `185.199.108.153` |
| `A`   | *(apex / blank)* | `185.199.109.153` |
| `A`   | *(apex / blank)* | `185.199.110.153` |
| `A`   | *(apex / blank)* | `185.199.111.153` |
| `CNAME` | `www` | `iconjone.github.io`      |

Once DNS propagates, enable **Enforce HTTPS** in your GitHub repository under **Settings → Pages**.
