# رفع التطبيق على Cloudflare Pages

هذه الحزمة جاهزة لـ Cloudflare Pages:

```
public/       ← الموقع (صفحة التثبيت + التطبيق + الصور + config.json)
functions/    ← يولّد ملف التعريف (.mobileconfig) تلقائياً على دومينك
lib/          ← كود مشترك للـ functions
wrangler.toml
```

> مهم: ملف التعريف يُولَّد عبر **Pages Functions**. رفع الملفات بالسحب والإفلات (Drag & Drop) من لوحة التحكم **لا يشغّل Functions**.
> استعمل إحدى الطريقتين أسفله.

## الطريقة 1: Wrangler (الأسهل، 3 أوامر)

1. ثبّت **Node.js** (نسخة 18 أو أحدث) من nodejs.org
2. افتح Terminal داخل هذا المجلد (حيث يوجد `wrangler.toml`):
```bash
npx wrangler login
npx wrangler pages deploy
```
3. أول مرة سيطلب منك اسم المشروع (مثلاً `my-app`). سيصبح الموقع: `https://my-app.pages.dev`

لتحديث الموقع بعد أي تعديل، أعد تشغيل: `npx wrangler pages deploy`

## الطريقة 2: GitHub

1. ارفع محتوى هذا المجلد إلى مستودع GitHub.
2. في Cloudflare: **Workers & Pages ← Create ← Pages ← Connect to Git** ← اختر المستودع.
3. الإعدادات: Framework preset = **None**، Build command = **فارغ**، Build output directory = **`public`**
4. اضغط **Save and Deploy**. كل `git push` سيحدّث الموقع تلقائياً.

## بعد الرفع

- افتح `https://اسم-مشروعك.pages.dev/` في **Safari على iPhone** ← «ابدأ التثبيت».
- التحقق من الملف: `https://اسم-مشروعك.pages.dev/profile` يجب أن ينزّل ملف `.mobileconfig`.
- **الدومين الخاص بك**: Pages ← مشروعك ← Custom domains ← أضف دومينك. لا تحتاج تغيير أي شيء، لأن الملف يأخذ الدومين تلقائياً.

## التعديل

| ماذا | أين |
|---|---|
| الاسم، الرابط، المعرّف، الأدوات العشر وروابطها | `public/config.json` |
| الصور | `public/assets/...` (الأسماء في `public/assets/README.md`) |
| أيقونة الشاشة الرئيسية | `public/assets/icons/app-icon.png` (1024×1024 PNG) |

- اترك `APP_URL` كما هو (`https://YOUR-DOMAIN.com/app/`) ليُستعمل دومين الموقع تلقائياً، أو ضع رابطك الكامل.
- غيّر `WEBSITE_DOMAIN` إلى دومينك ليظهر تحت زر التثبيت.
- غيّر `PROFILE_IDENTIFIER` مرة واحدة فقط قبل النشر (مثلاً `com.yourname.app`) ثم لا تغيّره.
- بعد تغيير الأيقونة أو الاسم، يجب على المستخدم حذف الملف القديم وتثبيته من جديد.

## ملاحظات

- على Cloudflare يكون الملف **غير موقّع (Unsigned)**. هذا طبيعي ويُثبَّت بشكل عادي.
- المواقع التي تمنع العرض داخل التطبيقات (Google، البنوك، أغلب مواقع التواصل) تُكتشف تلقائياً عبر `/frame-check` وتُفتح في نافذة Safari داخل التطبيق.
