# Bayti — بيتي

مطابقة ذكية للسكن المؤقت في الأردن. فرونت إند: HTML · CSS · Bootstrap 5.3 · JavaScript.

## التشغيل
افتح `index.html` بالمتصفح مباشرة، أو استخدم Live Server بـ VS Code.

## الصفحات (19) — زي تصميم Claude Design
| | الصفحة | الملف |
|---|---|---|
| عام | Landing | `index.html` |
| | تسجيل الدخول | `auth/login.html` |
| | إنشاء حساب | `auth/register.html` |
| | الأسئلة الثلاث | `auth/onboarding.html` |
| الباحث | اكتشف بيتك | `seeker/search.html` |
| | تفاصيل العقار | `seeker/property.html` |
| | حجوزاتي | `seeker/bookings.html` |
| | الرسائل | `seeker/chat.html` |
| | ملفي وأولوياتي | `seeker/profile.html` |
| المالك | لوحة التحكم | `owner/dashboard.html` |
| | عقاراتي | `owner/properties.html` |
| | إضافة عقار | `owner/property-form.html` |
| | الطلبات والمعاينات | `owner/requests.html` |
| | الرسائل | `owner/chat.html` |
| | حسابي | `owner/account.html` |
| الأدمن | لوحة التحكم | `admin/dashboard.html` |
| | طلبات التوثيق | `admin/verifications.html` |
| | المستخدمين | `admin/users.html` |
| | الأحياء والأماكن | `admin/places.html` |

## خطة الشغل
1. **تم: HTML + CSS + Bootstrap.** كل الصفحات الـ 19 ثابتة، والمحتوى مكتوب جوا الـ HTML.
2. **الجاي: JavaScript خطوة خطوة.** كل ملفات الـ JS موجودة وفاضية (بس سطر تعليق بيشرح وظيفة الملف) — عبّيها انت:
   إظهار كلمة المرور، الـ wizard، رسم البطاقات من البيانات، الفلاتر، حساب نسبة التوافق، الشات...

## هيكل المشروع
```
index.html                      ← Landing
auth/                           ← login, register, onboarding
seeker/                         ← صفحات الباحث عن سكن
owner/                          ← صفحات صاحب العقار
admin/                          ← صفحات الأدمن

assets/css/main.css             ← الألوان والخط والمكونات المشتركة
assets/css/pages/seeker.css     ← ستايلات خاصة بصفحات الباحث
assets/css/pages/owner.css      ← ستايلات خاصة بصفحات المالك
assets/css/pages/admin.css      ← ستايلات خاصة بصفحات الأدمن
assets/fonts/                   ← IBM Plex Sans Arabic

assets/i18n/                    ← نصوص اللغتين (مستخدمة بالـ Landing وصفحات الدخول)
assets/js/i18n.js               ← نظام اللغتين (موجود)
assets/js/layout.js             ← هيدر وفوتر الـ Landing (موجود)

assets/js/                      ← ملفات فاضية جاهزة إلك
├── config.js                   ← ثوابت: رابط الـ API، مفاتيح التخزين، العملة
├── app.js                      ← بيشتغل بكل صفحات لوحات التحكم (sidebar، topbar، اللغة)
├── core/                       ← أدوات عامة
│   ├── api.js                  ← fetch wrapper
│   ├── storage.js              ← localStorage
│   ├── auth.js                 ← المستخدم الحالي والصلاحيات
│   ├── dom.js                  ← helpers للـ DOM
│   ├── format.js               ← تنسيق المبالغ والتواريخ
│   └── validation.js           ← التحقق من الفورمات
├── components/                 ← مكونات بتتكرر بأكثر من صفحة
│   ├── topbar.js  sidebar.js  tabs.js  modal.js  toast.js  table.js
│   ├── prop-card.js  score-ring.js  favorites.js  compare-tray.js
│   ├── chat.js  map.js  ai-assistant.js
│   └── password-toggle.js  file-upload.js
├── services/                   ← منطق العمل والتعامل مع البيانات
│   ├── matching.js             ← حساب نسبة التوافق
│   ├── cost.js                 ← التكلفة الشهرية الكاملة
│   ├── chat-guard.js           ← حجب الأرقام والإيميلات والروابط بالشات
│   └── *.service.js            ← properties, bookings, requests, messages, users, verifications, places, profile
├── data/                       ← بيانات تجريبية لحد ما يجهز الـ API
└── pages/                      ← ملف لكل صفحة (نفس اسم الصفحة)
    ├── landing.js
    ├── auth/     login, register, onboarding
    ├── seeker/   search, property, bookings, chat, profile
    ├── owner/    dashboard, properties, property-form, requests, chat, account
    └── admin/    dashboard, verifications, users, places
```

### ترتيب السكريبتات بكل صفحة لوحة تحكم
```html
<script src="…/bootstrap.bundle.min.js"></script>
<script src="../assets/js/config.js"></script>
<script src="../assets/js/app.js"></script>
<script src="../assets/js/pages/<role>/<page>.js"></script>
```
لما تحتاج ملف من `core/` أو `components/` أو `services/` أو `data/` ضيفه قبل سكريبت الصفحة.

## إضافة صفحة جديدة
1. انسخ أي صفحة من `seeker/` أو `owner/` أو `admin/` وغيّر اسمها.
2. على الـ `<body>` غيّر `data-role` و `data-page`، وبالـ sidebar حط `active` على الرابط الصح.
3. اعمل ملف JS بنفس الاسم بـ `assets/js/pages/<role>/`، وأي CSS خاص بـ `assets/css/pages/<role>.css`.
4. اكتب محتوى الصفحة جوا `<main class="app-main">`.

## اللغتين
> صفحات لوحات التحكم (الباحث، المالك، الأدمن) نصها عربي مكتوب مباشرة بالـ HTML عشان تشتغل بدون JS.
> لما تبني نظام اللغتين، حوّلها لطريقة `data-i18n` المشروحة تحت.

- ولا نص مكتوب مباشرة بالـ HTML. كل نص: `<span data-i18n="section.key"></span>`
- ضيف المفتاح بـ `ar.js` و `en.js` الاثنين.
- placeholder: `data-i18n-placeholder` · aria-label: `data-i18n-aria`
- استخدم `ms-*` و `me-*` و `text-start` و `text-end` من Bootstrap (بتنقلب تلقائيا مع RTL)،
  وبالـ CSS استخدم `margin-inline-start` و `inset-inline-end` بدل left و right.

## قواعد التصميم
| | |
|---|---|
| الخلفية | `--bt-bg` |
| الكروت | `--bt-surface` + كلاس `bt-card` أو `panel` |
| الأساسي | `--bt-primary` (بترولي) |
| الزر الرئيسي | `btn-accent` (طين) — **زر واحد بس بكل شاشة** |
| الزر الثانوي | `btn-outline-primary` |
| التوافق | `<div class="score-ring" style="--value:92">` (مش أحمر وأخضر) |
| الأحمر والأخضر | لرسائل النظام بس |
