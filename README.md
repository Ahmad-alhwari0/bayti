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
1. **هلأ: HTML + CSS + Bootstrap.** كل صفحة ثابتة، والمحتوى مكتوب جوا الـ HTML.
2. **بعدين: JavaScript خطوة خطوة.** إظهار كلمة المرور، الـ wizard، رسم البطاقات من البيانات، الفلاتر، حساب نسبة التوافق.

## هيكل المشروع
```
index.html                ← Landing
auth/                     ← login, register, onboarding
seeker/                   ← صفحات الباحث عن سكن
owner/                    ← صفحات صاحب العقار
admin/                    ← صفحات الأدمن
assets/css/main.css       ← الألوان والخط والمكونات (لا تكتب ألوان برا هالملف)
assets/js/i18n.js         ← نظام اللغتين
assets/js/layout.js       ← الهيدر والفوتر والـ sidebar
assets/i18n/ar.js         ← النصوص العربية المشتركة
assets/i18n/en.js         ← النصوص الإنجليزية المشتركة
assets/i18n/auth.i18n.js  ← نصوص صفحات الدخول (عربي + إنجليزي)
assets/fonts/             ← IBM Plex Sans Arabic
```

## إضافة صفحة جديدة
1. انسخ أي صفحة من `seeker/` أو `owner/` أو `admin/` وغيّر اسمها.
2. على الـ `<body>` غيّر `data-role` (seeker / owner / admin) و `data-page`.
3. `data-page` لازم يطابق `key` بقائمة `MENUS` بـ `layout.js`، عشان الرابط يظهر active.
4. اكتب محتوى الصفحة جوا `<main>` بس، والباقي بيجي تلقائيا.

## اللغتين
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
