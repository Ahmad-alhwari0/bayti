/* =========================================================
   layout.js — الهيدر والفوتر والـ sidebar المشتركين
   كل صفحة بتحدد شكلها من الـ <body>:
     <body data-layout="public">                                    → صفحة عامة (Landing)
     <body data-layout="auth">                                      → صفحات الدخول (بدون هيدر)
     <body data-layout="app" data-role="seeker" data-page="search"> → لوحة تحكم
   والمحتوى الخاص بالصفحة بيكون جوا <main>
   ========================================================= */
(function () {
  // مسار جذر المشروع، محسوب من مكان هاد الملف — عشان الروابط تشتغل من أي مجلد
  const BASE = document.currentScript.src.replace(
    /assets\/js\/layout\.js.*$/,
    "",
  );
  const url = (path) => BASE + path;

  // روابط الـ sidebar لكل دور. لإضافة صفحة: زيد سطر هون وترجمته بـ menu بـ ar.js و en.js
  const MENUS = {
    seeker: [
      { key: "search", href: "seeker/search.html", icon: "bi-stars" },
      {
        key: "bookings",
        href: "seeker/bookings.html",
        icon: "bi-calendar-check",
        badge: 1,
      },
      { key: "chat", href: "seeker/chat.html", icon: "bi-chat-dots", badge: 2 },
      { key: "profile", href: "seeker/profile.html", icon: "bi-sliders" },
    ],
    owner: [
      { key: "dashboard", href: "owner/dashboard.html", icon: "bi-grid-1x2" },
      {
        key: "properties",
        href: "owner/properties.html",
        icon: "bi-house-door",
      },
      { key: "add", href: "owner/property-form.html", icon: "bi-plus-square" },
      {
        key: "requests",
        href: "owner/requests.html",
        icon: "bi-inbox",
        badge: 3,
      },
      { key: "chat", href: "owner/chat.html", icon: "bi-chat-dots", badge: 1 },
      { key: "account", href: "owner/account.html", icon: "bi-person-badge" },
    ],
    admin: [
      { key: "dashboard", href: "admin/dashboard.html", icon: "bi-grid-1x2" },
      {
        key: "verifications",
        href: "admin/verifications.html",
        icon: "bi-patch-check",
        badge: 4,
      },
      { key: "users", href: "admin/users.html", icon: "bi-people" },
      { key: "places", href: "admin/places.html", icon: "bi-geo-alt" },
    ],
  };

  // رابط "ملفي" بقائمة المستخدم
  const PROFILE = {
    seeker: "seeker/profile.html",
    owner: "owner/account.html",
  };

  // إشعارات تجريبية لكل دور (النص بـ ar.js و en.js تحت notif)
  const NOTIFS = {
    seeker: [
      { key: "n1", icon: "bi-stars", href: "seeker/property.html" },
      { key: "n2", icon: "bi-check2-circle", href: "seeker/bookings.html" },
    ],
    owner: [
      { key: "n1", icon: "bi-inbox", href: "owner/requests.html" },
      { key: "n2", icon: "bi-shield-check", href: "owner/properties.html" },
    ],
    admin: [
      { key: "n1", icon: "bi-patch-check", href: "admin/verifications.html" },
    ],
  };

  /* ---------- Pieces ---------- */
  const brand = (href = "index.html", extra = "") => `
    <a class="brand ${extra}" href="${url(href)}">
      <span class="brand-mark">B</span><span data-i18n="brand"></span>
    </a>`;

  const langButton = () => `
    <button type="button" class="btn btn-link nav-lang px-2" data-action="toggle-lang">
      <i class="bi bi-translate"></i><span data-i18n="lang.switch"></span>
    </button>`;

  function publicHeader() {
    return `
    <header class="site-header">
      <nav class="navbar navbar-expand-lg">
        <div class="container">
          ${brand()}
          <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#publicNav" data-i18n-aria="nav.menu">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="publicNav">
            <ul class="navbar-nav mx-auto gap-lg-3">
              <li class="nav-item"><a class="nav-link" href="${url("index.html#how")}" data-i18n="nav.how"></a></li>
              <li class="nav-item"><a class="nav-link" href="${url("index.html#features")}" data-i18n="nav.features"></a></li>
              <li class="nav-item"><a class="nav-link" href="${url("index.html#owners")}" data-i18n="nav.owners"></a></li>
            </ul>
            <div class="d-flex flex-column flex-lg-row align-items-lg-center gap-2 py-3 py-lg-0">
              ${langButton()}
              <a class="btn btn-outline-primary" href="${url("auth/login.html")}" data-i18n="nav.login"></a>
              <a class="btn btn-accent" href="${url("auth/register.html")}" data-i18n="nav.start"></a>
            </div>
          </div>
        </div>
      </nav>
    </header>`;
  }

  function footer() {
    return `
    <footer class="site-footer">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-5">
            ${brand("index.html", "mb-3")}
            <p class="mb-0" data-i18n="footer.tagline"></p>
          </div>
          <div class="col-6 col-lg-3 offset-lg-1">
            <h6 data-i18n="footer.product"></h6>
            <ul class="list-unstyled d-grid gap-2 mb-0">
              <li><a href="${url("index.html#how")}" data-i18n="nav.how"></a></li>
              <li><a href="${url("index.html#features")}" data-i18n="nav.features"></a></li>
              <li><a href="${url("index.html#owners")}" data-i18n="nav.owners"></a></li>
            </ul>
          </div>
          <div class="col-6 col-lg-3">
            <h6 data-i18n="footer.company"></h6>
            <ul class="list-unstyled d-grid gap-2 mb-0">
              <li><a href="#" data-i18n="footer.about"></a></li>
              <li><a href="#" data-i18n="footer.contact"></a></li>
              <li><a href="#" data-i18n="footer.terms"></a></li>
              <li><a href="#" data-i18n="footer.privacy"></a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom d-flex flex-wrap justify-content-between gap-2">
          <span data-i18n="footer.rights"></span>
          <button type="button" class="btn btn-link p-0 text-white-50 text-decoration-none" data-action="toggle-lang"><span data-i18n="lang.switch"></span></button>
        </div>
      </div>
    </footer>`;
  }

  function notificationsHtml(role) {
    return (NOTIFS[role] || [])
      .map(
        (n) => `
      <a class="dropdown-item d-flex gap-2 py-2 text-wrap" href="${url(n.href)}">
        <span class="kpi-icon flex-shrink-0" style="width:34px;height:34px;font-size:1rem"><i class="bi ${n.icon}"></i></span>
        <span class="small">
          <span class="d-block" data-i18n="notif.${role}.${n.key}"></span>
          <span class="text-muted" style="font-size:.72rem" data-i18n="notif.${role}.${n.key}t"></span>
        </span>
      </a>`,
      )
      .join("");
  }

  function appTopbar(role) {
    const home = (MENUS[role] && MENUS[role][0].href) || "index.html";
    return `
    <header class="app-topbar">
      <button class="icon-btn d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#appSidebar" data-i18n-aria="nav.menu">
        <i class="bi bi-list"></i>
      </button>
      ${brand(home)}
      <div class="ms-auto d-flex align-items-center gap-1">
        ${langButton()}
        <div class="dropdown">
          <button class="icon-btn" type="button" data-bs-toggle="dropdown" data-i18n-aria="app.notifications">
            <i class="bi bi-bell"></i><span class="dot"></span>
          </button>
          <div class="dropdown-menu dropdown-menu-end shadow-sm p-0" style="width: 320px">
            <div class="px-3 py-2 border-bottom fw-semibold" data-i18n="app.notifications"></div>
            <div class="py-1">${notificationsHtml(role)}</div>
          </div>
        </div>
        <div class="dropdown">
          <button class="app-user" type="button" data-bs-toggle="dropdown">
            <span class="avatar" data-i18n="users.${role}.initials"></span>
            <span class="d-none d-md-inline text-start lh-sm">
              <span class="d-block small fw-semibold" data-i18n="users.${role}.name"></span>
              <span class="d-block text-muted" style="font-size:.72rem" data-i18n="roles.${role}"></span>
            </span>
            <i class="bi bi-chevron-down small text-muted"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow-sm">
            ${
              PROFILE[role]
                ? `<li><a class="dropdown-item" href="${url(PROFILE[role])}" data-i18n="app.profile"></a></li><li><hr class="dropdown-divider"></li>`
                : ""
            }
            <li><a class="dropdown-item text-danger" href="${url("index.html")}" data-i18n="app.logout"></a></li>
          </ul>
        </div>
      </div>
    </header>`;
  }

  function appSidebar(role, page) {
    const links = (MENUS[role] || [])
      .map(
        (item) => `
      <a class="side-link ${item.key === page ? "active" : ""}" href="${url(item.href)}" ${item.key === page ? 'aria-current="page"' : ""}>
        <i class="bi ${item.icon}"></i><span class="flex-grow-1" data-i18n="menu.${role}.${item.key}"></span>
        ${item.badge ? `<span class="status status--info px-2" style="font-size:.7rem">${item.badge}</span>` : ""}
      </a>`,
      )
      .join("");

    return `
    <aside class="app-sidebar offcanvas-lg offcanvas-start" tabindex="-1" id="appSidebar">
      <div class="offcanvas-header border-bottom">
        ${brand()}
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#appSidebar"></button>
      </div>
      <div class="offcanvas-body">
        <div class="side-label" data-i18n="roles.${role}"></div>
        ${links}
      </div>
    </aside>`;
  }

  /* ---------- Init ---------- */
  function init() {
    const body = document.body;
    const { layout, role, page } = body.dataset;
    const main = document.querySelector("main");

    if (layout === "public") {
      body.insertAdjacentHTML("afterbegin", publicHeader());
      body.insertAdjacentHTML("beforeend", footer());

      const header = document.querySelector(".site-header");
      const onScroll = () =>
        header.classList.toggle("is-scrolled", window.scrollY > 8);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    if (layout === "app" && main) {
      body.insertAdjacentHTML("afterbegin", appTopbar(role));
      const shell = document.createElement("div");
      shell.className = "app-shell";
      main.replaceWith(shell);
      shell.insertAdjacentHTML("afterbegin", appSidebar(role, page));
      main.classList.add("app-main");
      shell.appendChild(main);
    }

    body.addEventListener("click", (e) => {
      if (e.target.closest('[data-action="toggle-lang"]')) window.I18n.toggle();
    });

    window.I18n.translate();
  }

  document.addEventListener("DOMContentLoaded", init);

  window.Layout = { url, brand, langButton };
})();
