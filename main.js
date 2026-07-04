/* =========================================================
   Mallory Chipman — site scripts
   Injects the shared nav + footer, runs scroll reveals,
   and wires the contact + mailing-list forms.

   ── DEPLOY: set these two values ──────────────────────────
   1. FORMSPREE_ENDPOINT — create a free form at formspree.io
      and paste its URL, e.g. "https://formspree.io/f/mabcwxyz"
   2. MAILCHIMP — from Mailchimp → Audience → Signup forms →
      Embedded form, copy the <form action="..."> URL and the
      hidden honeypot field name (looks like b_xxxxx_yyyyy).
   ========================================================= */

const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
const MAILCHIMP = {
  action:   "https://YOURSERVER.list-manage.com/subscribe/post?u=YOUR_U&id=YOUR_ID",
  honeypot: "b_YOUR_U_YOUR_ID",
};

/* ---- shared data ---- */
const NAV_ITEMS = [
  { label: "home",  href: "index.html",  key: "home"  },
  { label: "bio",   href: "bio.html",    key: "bio"   },
  { label: "music", href: "music.html",  key: "music" },
  { label: "tour",  href: "tour.html",   key: "tour"  },
  { label: "store", href: "https://mallorychipman.bandcamp.com/merch", key: "store" },
  { label: "epk",   href: "epk.html",    key: "epk"   },
];

const SOCIALS = [
  { label: "Spotify",      href: "https://open.spotify.com/artist/3cpzQEwjCmaMuaTI5Gc8kC" },
  { label: "Apple Music",  href: "https://music.apple.com/ca/artist/mallory-chipman/1172576371" },
  { label: "Bandcamp",     href: "https://mallorychipman.bandcamp.com" },
  { label: "YouTube",      href: "https://www.youtube.com/results?search_query=mallory+chipman" },
  { label: "Tidal",        href: "https://tidal.com/search?q=mallory%20chipman" },
  { label: "Amazon Music", href: "https://music.amazon.com/artists/B01M5KBY1M/mallory-chipman" },
  { label: "Instagram",    href: "https://instagram.com/paranormallory" },
  { label: "Facebook",     href: "https://www.facebook.com/mallorychipmanmusic" },
];

/* ---- nav ---- */
function buildNav(active) {
  const links = NAV_ITEMS.map(i =>
    `<li><a href="${i.href}" class="${i.key === active ? "active" : ""}">${i.label}</a></li>`
  ).join("");
  const mobLinks = NAV_ITEMS.map(i =>
    `<li><a href="${i.href}" class="${i.key === active ? "active" : ""}">${i.label}</a></li>`
  ).join("");

  return `
  <header class="site-header">
    <nav class="nav">
      <a class="brand" href="index.html">mallory chipman</a>
      <ul class="nav-links">${links}</ul>
      <button class="nav-toggle" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="nav-mobile"><ul>${mobLinks}</ul></div>
  </header>`;
}

/* ---- footer ---- */
function buildFooter(showContact) {
  const social = SOCIALS.map(s =>
    `<li><a href="${s.href}" target="_blank" rel="noopener">${s.label}</a></li>`
  ).join("");

  const contactCol = showContact ? `
      <div class="footer-col">
        <h3>Contact</h3>
        <a class="btn btn-primary" href="tour.html#contact">Contact form →</a>
        <p class="sub" style="margin-top:20px;">Booking, press, studio time, collaborations &amp; more.</p>
        <a class="footer-mail" href="mailto:mal.chipman@gmail.com?subject=Website Inquiry">mal.chipman@gmail.com</a>
      </div>` : "";

  return `
  <footer class="site-footer">
    <div class="footer-grid">
      <div class="footer-col">
        <h2>join the mailing list</h2>
        <p class="sub">New music, shows, and stories — straight to your inbox. No spam, ever.</p>
        <form class="mc-form" action="${MAILCHIMP.action}" method="post" target="mc_target" novalidate>
          <input type="email" name="EMAIL" required placeholder="your email" />
          <div style="position:absolute;left:-9999px" aria-hidden="true">
            <input type="text" name="${MAILCHIMP.honeypot}" tabindex="-1" value="" />
          </div>
          <button type="submit" class="btn btn-primary">Subscribe</button>
        </form>
        <iframe name="mc_target" title="mailchimp" style="display:none;width:0;height:0;border:0"></iframe>
        <p class="mc-thanks">Thanks for subscribing! ♥︎</p>
      </div>

      <div class="footer-col">
        <h3>Listen &amp; Follow</h3>
        <ul class="social">${social}</ul>
      </div>

      ${contactCol}
    </div>

    <div class="footer-bar">
      <div class="inner">
        <span class="name">mallory chipman</span>
        <span class="copy">© ${new Date().getFullYear()} mallory chipman music. all rights reserved.</span>
      </div>
    </div>
  </footer>`;
}

/* ---- contact form markup ---- */
const CONTACT_TOPICS = [
  "Booking / live performance",
  "Press & interviews",
  "Studio time / session work",
  "Collaboration or feature",
  "Licensing & sync",
  "General inquiry",
];

function buildContactForm() {
  const opts = CONTACT_TOPICS.map(t => `<option>${t}</option>`).join("");
  return `
  <div class="contact-card">
    <div class="contact-inner">
      <p class="eyebrow center">Contact</p>
      <h2 class="h3 center">Get in touch</h2>
      <p class="lead center" style="margin:0 auto 34px;max-width:48ch;">Booking, press, studio sessions, collaborations &amp; everything in between — choose a topic below and Mallory will get back to you.</p>

      <div class="form-ok hidden" data-ok>
        <div class="big">Thank you ♥︎</div>
        <p>Your message is on its way. You’ll get a reply at the email you provided — usually within 3–5 business days.</p>
      </div>

      <form class="contact-form" data-contact novalidate>
        <div class="field full">
          <label>What is this about?</label>
          <select name="inquiry_type">${opts}</select>
        </div>
        <div class="field">
          <label>Name <span class="req">*</span></label>
          <input name="name" required />
        </div>
        <div class="field">
          <label>Email <span class="req">*</span></label>
          <input type="email" name="email" required />
        </div>
        <div class="field">
          <label>Organization / affiliation</label>
          <input name="organization" />
        </div>
        <div class="field">
          <label>Date / timeline</label>
          <input name="timeline" placeholder="optional" />
        </div>
        <div class="field full">
          <label>Message <span class="req">*</span></label>
          <textarea name="message" rows="5" required placeholder="Tell Mallory a bit about your inquiry…"></textarea>
        </div>
        <div class="form-foot">
          <button type="submit" class="btn btn-primary">Send message</button>
          <span class="form-note">Typically responds within 3–5 business days.</span>
          <span class="form-error" data-err></span>
        </div>
      </form>
    </div>
  </div>`;
}

/* ---- scroll reveal (robust: sweeps on scroll, resize, load) ---- */
function initReveal() {
  const els = Array.from(document.querySelectorAll("[data-reveal]"));
  if (!els.length) return;
  let pending = els.slice();
  const sweep = () => {
    pending = pending.filter(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        el.classList.add("in");
        return false;
      }
      return true;
    });
    if (!pending.length) {
      window.removeEventListener("scroll", sweep);
      window.removeEventListener("resize", sweep);
    }
  };
  window.addEventListener("scroll", sweep, { passive: true });
  window.addEventListener("resize", sweep);
  requestAnimationFrame(sweep);
  setTimeout(sweep, 250);
}

/* ---- mobile nav toggle ---- */
function initNavToggle() {
  const btn = document.querySelector(".nav-toggle");
  const panel = document.querySelector(".nav-mobile");
  if (!btn || !panel) return;
  btn.addEventListener("click", () => {
    const open = btn.classList.toggle("open");
    panel.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
  });
}

/* ---- mailing list (Mailchimp) ---- */
function initMailchimp() {
  const form = document.querySelector(".mc-form");
  if (!form) return;
  const thanks = document.querySelector(".mc-thanks");
  const isPlaceholder = MAILCHIMP.action.indexOf("YOUR_") !== -1;
  form.addEventListener("submit", (e) => {
    if (isPlaceholder) e.preventDefault();   // demo mode: don't POST to a fake URL
    if (thanks) thanks.classList.add("show");
  });
}

/* ---- contact form (Formspree) ---- */
function initContactForm() {
  const form = document.querySelector("[data-contact]");
  if (!form) return;
  const ok  = document.querySelector("[data-ok]");
  const err = form.querySelector("[data-err]");
  const btn = form.querySelector("button[type=submit]");
  const isPlaceholder = FORMSPREE_ENDPOINT.indexOf("YOUR_FORM_ID") !== -1;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (err) err.textContent = "";
    if (!form.reportValidity()) return;

    const data = Object.fromEntries(new FormData(form).entries());
    data._subject = `New inquiry (${data.inquiry_type}) — ${data.name || "website"}`;

    if (isPlaceholder) {              // demo mode until endpoint is set
      form.classList.add("hidden");
      if (ok) ok.classList.remove("hidden");
      return;
    }

    btn.disabled = true; btn.textContent = "Sending…";
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        form.classList.add("hidden");
        if (ok) ok.classList.remove("hidden");
      } else {
        if (err) err.textContent = "Something went wrong — please email mal.chipman@gmail.com.";
      }
    } catch {
      if (err) err.textContent = "Network error — please email mal.chipman@gmail.com.";
    } finally {
      btn.disabled = false; btn.textContent = "Send message";
    }
  });
}

/* ---- boot ---- */
document.addEventListener("DOMContentLoaded", () => {
  // inject nav
  const navMount = document.querySelector("[data-nav]");
  if (navMount) navMount.outerHTML = buildNav(navMount.getAttribute("data-nav"));

  // inject contact form (before footer, so footer query still works)
  const cMount = document.querySelector("[data-contact-form]");
  if (cMount) cMount.innerHTML = buildContactForm();

  // inject footer
  const fMount = document.querySelector("[data-footer]");
  if (fMount) fMount.outerHTML = buildFooter(fMount.getAttribute("data-footer") !== "no-contact");

  initNavToggle();
  initReveal();
  initMailchimp();
  initContactForm();
});
