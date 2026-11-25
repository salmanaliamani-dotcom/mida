# Mida AI: app dyal AI video (b7al Higgsfield)

Users kaysjlo, kaycheriw credits, w kaygeneriw videos mn **text** wla mn **tswira**, b presets dyal camera (drone, orbit, anime…).

**Stack (kolchi free tier):** Next.js · Supabase (login + database + stockage) · fal.ai (models dyal video) · Lemon Squeezy (khlas) · Vercel (hosting)

## Kifach kaykhdem

```
User → login → kaychri credits (Lemon Squeezy) → kaykteb prompt
     → server kayn99ss 10 credits → kaysift l fal.ai → video → kayban f Studio
Ila fchlat lvideo → credits kayrj3o automatiquement
```

## Tjriba f pc dyalk (bla flouss)

1. Dir compte f **supabase.com** (free) → New project.
2. F Supabase: **SQL Editor** → copy/paste `supabase/schema.sql` → **Run**.
3. F Supabase: **Authentication → URL Configuration** → zid `http://localhost:3000/auth/callback` f Redirect URLs.
4. Copy `.env.example` → `.env.local` w 3mmer l'keys dyal Supabase (Project Settings → API).
   Khlli `MOCK_GENERATION=true`: hakka l'app kat3tik video demo bla ma tkhlles fal.ai.
5. ```bash
   npm install
   npm run dev
   ```
6. 7ell `http://localhost:3000`, dkhol b email dyalk.
7. Bach tzid credits l rasek f tjriba: Supabase → Table Editor → `profiles` → bdel `credits` l 100.

## Bach tkhdem b videos 7a9i9iyin

1. Dir compte f **fal.ai** → Dashboard → Keys → copy key l `FAL_KEY`.
2. Bdel `MOCK_GENERATION=false`.
3. Models kaytbdlo f `.env.local` (`FAL_T2V_MODEL`, `FAL_I2V_MODEL`). Chouf **fal.ai/models** w khtar li bghiti
   (Kling, Wan, Minimax/Hailuo, LTX…). Tsa77e7 smiya dyal model w l'input dyalo 3la page dyalo
   (l'app kaysift `prompt`, `duration`, `aspect_ratio`, w `image_url` f image-to-video).
4. **7seb lmarge**: chouf ch7al katklef video f fal.ai w bdel `VIDEO_COST` w `PACKS` f `lib/config.ts`.

## Khlas (Lemon Squeezy)

1. Dir compte f **lemonsqueezy.com** (kaykhdem m3a lMaghrib, kayt9ablo taxes 3lik).
2. Dir **produit wa7d** b 3 variants: Starter / Creator / Studio (b nafs taman li f `lib/config.ts`).
3. 3mmer f `.env.local`: `LEMONSQUEEZY_API_KEY`, `LEMONSQUEEZY_STORE_ID`, w ID dyal kol variant.
4. Settings → Webhooks → URL: `https://SITE-DYALK/api/webhooks/lemonsqueezy`, event: `order_created`,
   w dir secret → `LEMONSQUEEZY_WEBHOOK_SECRET`.
5. Jreb b **Test mode** 9bel ma t7ell live.

## Tla3ha f internet (Vercel, free)

1. Push repo l GitHub → **vercel.com** → Import → Root directory: `mida-ai`.
2. Zid ga3 les variables dyal `.env.local` f Vercel (bdel `NEXT_PUBLIC_SITE_URL` b domain dyalk).
3. F Supabase zid `https://SITE-DYALK/auth/callback` f Redirect URLs.
4. (Optionnel) Login b Google: Supabase → Authentication → Providers → Google.

## Fin tbdel chi 7aja

| Bghiti tbdel… | Fichier |
|---|---|
| Presets, taman, credits, mots interdits | `lib/config.ts` |
| Models dyal video | `.env.local` / `lib/fal.ts` |
| Page d'accueil | `app/page.tsx` |
| Studio (fin kaytsawbo videos) | `components/Studio.tsx` |
| Logo | `public/icon.svg`, `app/icon.svg` |
| Alwan | `app/globals.css` |

## Mohim 9bel ma t7ell l'public
- Kteb **Conditions d'utilisation** w **Privacy policy** (Lemon Squeezy kaytlbhom).
- Filtre dyal prompts f `lib/config.ts` bsit bzaf: zid moderation API 9bel ma tkbar.
- Ma t3tich free credits bzaf f `schema.sql`: kol credit kaykhllsek nta.
