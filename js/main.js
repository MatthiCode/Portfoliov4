/* ==========================================================================
   MUSÉE MATTHIEU BAYLE : comportement
   GSAP + ScrollTrigger + Lenis. Pas de 3D.
   Ordre : 1) rendu du contenu  2) découpe du texte  3) Lenis  4) animations
   (créées dans l'ordre de la page, indispensable avec les sections épinglées)
   ========================================================================== */
(function () {
  "use strict";

  var D = window.MUSEE;
  var S = window.Scenes;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  };

  var body = document.body;

  // Sortie de secours : quoi qu'il arrive, le billet ne bloque jamais la page plus de 9 s.
  setTimeout(function () {
    var pre = document.querySelector(".preloader");
    if (pre) pre.remove();
    body.classList.remove("is-loading");
    if (window.__lenis) window.__lenis.start();
  }, 9000);
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var hasGSAP = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  var SCENE_CYCLE = ["dawn", "glacier", "dusk", "forest", "storm", "gold"];

  /* ------------------------------------------------------------------
     1) RENDU DU CONTENU
     ------------------------------------------------------------------ */
  function render() {
    // Photo plein fond du hall
    S.mountVisual($(".js-hero-bg"), Object.assign({ alt: "" }, D.me.hero));

    // Galerie : les 6 premières œuvres
    var gal = $(".gal-track");
    var end = $(".gal-end");
    var ratios = ["4 / 5", "1 / 1", "3 / 4", "5 / 4", "4 / 5", "1 / 1"];
    var vedettes = D.oeuvres.filter(function (o) { return o.vedette; });
    if (!vedettes.length) vedettes = D.oeuvres.slice(0, 6);
    vedettes.forEach(function (o, i) {
      var fig = document.createElement("figure");
      fig.className = "piece";
      fig.dataset.idx = D.oeuvres.indexOf(o);
      var ratio = o.ratio || ratios[i % ratios.length];
      var rp = ratio.split("/");
      var wide = parseFloat(rp[0]) / parseFloat(rp[1]) > 1.2;
      fig.style.setProperty("--ar", ratio);
      fig.style.setProperty("--h", "56vh");
      var lines = [];
      var head = [o.annee, o.secteur].filter(Boolean).join(", ");
      if (head) lines.push(esc(head));
      if (o.outils) lines.push("Technique : " + esc(o.outils));
      if (o.role) lines.push("Rôle : " + esc(o.role));
      fig.innerHTML =
        '<div class="frame"><div class="vis"></div></div>' +
        '<figcaption class="cartel"><b>' + esc(o.titre) + "</b>" + lines.join("<br>") +
        (o.placeholder ? '<br><span class="ph-tag">Fiche d\'exemple</span>' : "") +
        "</figcaption>" +
        (o.lien || o.image ? '<a class="btn piece-link" href="' + esc(o.lien || o.image) + '" target="_blank" rel="noopener">Voir le projet</a>' : "");
      gal.insertBefore(fig, end);
      S.mountVisual($(".vis", fig), { image: o.image, scene: o.scene || SCENE_CYCLE[i % 6], seed: o.seed || (i + 1) * 13, alt: o.titre });
    });

    // Registre complet + aperçus
    var list = $(".registre-list");
    var prev = $(".registre-preview");
    D.oeuvres.forEach(function (o, i) {
      var li = document.createElement(o.lien ? "li" : "li");
      li.className = "row" + (o.placeholder ? " is-ph" : "");
      var inner =
        '<span class="t">' + esc(o.titre) + '</span>' +
        '<span class="s">' + esc(o.secteur || "") + '</span><span class="y">' + esc(o.annee || "") + "</span>" +
        '<span class="go" aria-hidden="true">' + "Voir" + "</span>";
      var href = o.lien || o.image;
      li.innerHTML = href ? '<a href="' + esc(href) + '" target="_blank" rel="noopener" style="display:contents">' + inner + "</a>" : inner;
      list.appendChild(li);

      var v = document.createElement("div");
      prev.appendChild(v);
      S.mountVisual(v, { image: o.image, scene: o.scene || SCENE_CYCLE[i % 6], seed: o.seed || (i + 1) * 13 });
    });

    // Outils
    var tools = $(".tools");
    (D.outils || []).forEach(function (n) {
      var li = document.createElement("li");
      li.textContent = n;
      tools.appendChild(li);
    });
    // Compétences
    var skills = $(".skills");
    D.competences.forEach(function (c) {
      var li = document.createElement("li");
      li.innerHTML = '<span class="d">' + esc(c.domaine) + '</span><span class="o">' + esc(c.outils) + "</span>";
      skills.appendChild(li);
    });

    // Parcours
    var tl = $(".timeline");
    D.parcours.forEach(function (p) {
      var li = document.createElement("li");
      li.className = "tl";
      li.innerHTML = '<div class="date">' + esc(p.date) + "</div><h3>" + esc(p.titre) + "</h3><p>" + esc(p.texte) + "</p>";
      tl.appendChild(li);
    });

    // Contact
    $(".mail-text").textContent = D.me.email;
    $(".js-mailto").href = "mailto:" + D.me.email;
    var copyBtn = $(".js-copy");
    copyBtn.addEventListener("click", function () {
      var done = function () {
        copyBtn.firstChild.textContent = "Adresse copiée";
        setTimeout(function () { copyBtn.firstChild.textContent = "Copier l'adresse"; }, 2200);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(D.me.email).then(done, done);
      else done();
    });
    var links = $(".links");
    D.me.liens.forEach(function (l) {
      var li = document.createElement("li");
      li.innerHTML = '<a class="btn" href="' + esc(l.href) + '" target="_blank" rel="noopener">Voir ' + esc(l.label) + "</a>";
      links.appendChild(li);
    });

    // Plan du musée + mini plan
    var plan = $(".plan-list");
    var mini = $(".minimap");
    var menuIds = { hall: 1, ateliers: 1, archives: 1, sortie: 1 };
    $$("section[id][data-room]").forEach(function (sec) {
      if (menuIds[sec.id]) {
        var li = document.createElement("li");
        li.innerHTML = '<a href="#' + sec.id + '"><span class="nom">' + esc(sec.dataset.name) + "</span></a>";
        plan.appendChild(li);
      }
      var m = document.createElement("span");
      m.dataset.room = sec.dataset.room;
      mini.appendChild(m);
    });
  }

  /* ------------------------------------------------------------------
     2) DÉCOUPE DU TEXTE
     ------------------------------------------------------------------ */
  function splitWords(el) {
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/([ \t\r\n]+)/).forEach(function (part) {
            if (!part) return;
            if (/^[ \t\r\n]+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
            var w = document.createElement("span"); w.className = "w";
            var wi = document.createElement("span"); wi.className = "wi"; wi.textContent = part;
            w.appendChild(wi); frag.appendChild(w);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) { walk(n); }
      });
    })(el);
    return $$(".wi", el);
  }

  function splitChars(el) {
    var txt = el.textContent;
    el.setAttribute("aria-hidden", "true");
    el.textContent = "";
    txt.split("").forEach(function (c) {
      var s = document.createElement("span"); s.className = "ch"; s.textContent = c; el.appendChild(s);
    });
    return $$(".ch", el);
  }

  /* ------------------------------------------------------------------
     Utilitaires
     ------------------------------------------------------------------ */
  function clock() {
    var f = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" });
    var tick = function () {
      var t = f.format(new Date());
      $(".js-clock").textContent = t;
      var _ht=$(".hero-time"); if(_ht) _ht.textContent = t + " à Lannion";
    };
    tick(); setInterval(tick, 20000);
  }

  function setRoom(room, name) {
    var rn = $(".js-room-name"); if (rn) rn.textContent = name;
    $$(".minimap span").forEach(function (s) { s.classList.toggle("is-on", s.dataset.room === room); });
  }

  /* ------------------------------------------------------------------
     DÉMARRAGE
     ------------------------------------------------------------------ */
  try { render(); } catch (err) { console.error("render:", err); }
  try { clock(); } catch (err) { console.error("clock:", err); }

  var wordTargets = $$(".js-split").map(function (el) { return { el: el, words: splitWords(el) }; });
  var statement = $(".js-statement");
  var statementWords = splitWords(statement);
  var nameChars = [];
  $$(".name .line-in").forEach(function (el) { nameChars = nameChars.concat(splitChars(el)); });

  // Sans GSAP (ou mouvement réduit) : on affiche tout, sans animation.
  if (!hasGSAP) {
    $(".preloader").remove();
    setRoom("I", "Le hall");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Lenis ---------- */
  var lenis = null;
  if (!reduceMotion && typeof window.Lenis !== "undefined") {
    lenis = new Lenis({ duration: 1.15, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); } });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
    window.__lenis = lenis;
  }

  function goTo(target) {
    if (lenis) lenis.scrollTo(target, { duration: 1.8, force: true, easing: function (t) { return 1 - Math.pow(1 - t, 4); } });
    else target.scrollIntoView();
  }

  /* ---------- Menu « Plan du musée » ---------- */
  var plan = $(".plan");
  var menuBtn = $(".bar-menu");
  var menuOpen = false;
  function openMenu() {
    menuOpen = true;
    plan.hidden = false;
    menuBtn.setAttribute("aria-expanded", "true");
    $(".js-menu-label").textContent = "Fermer";
    if (lenis) lenis.stop();
    gsap.fromTo(plan, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: reduceMotion ? 0 : .9, ease: "power4.inOut" });
    if (!reduceMotion) gsap.fromTo(".plan-list a", { yPercent: 105 }, { yPercent: 0, duration: .9, stagger: .05, ease: "power4.out", delay: .25 });
  }
  function closeMenu() {
    if (!menuOpen) return;
    menuOpen = false;
    menuBtn.setAttribute("aria-expanded", "false");
    $(".js-menu-label").textContent = "Menu";
    gsap.to(plan, { clipPath: "inset(100% 0 0 0)", duration: reduceMotion ? 0 : .8, ease: "power4.inOut", onComplete: function () { plan.hidden = true; if (lenis) lenis.start(); } });
  }
  menuBtn.addEventListener("click", function () { menuOpen ? closeMenu() : openMenu(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href");
    if (id.length < 2) return;
    var t = document.querySelector(id);
    if (!t) return;
    e.preventDefault();
    var wasOpen = menuOpen;
    closeMenu();
    setTimeout(function () { goTo(t); }, wasOpen ? 950 : 0);
  });

  /* ---------- Curseur ---------- */
  if (finePointer && !reduceMotion) {
    var cur = $(".cursor");
    var lab = $(".cursor-label");
    body.classList.add("has-cursor");
    gsap.set(cur, { xPercent: -50, yPercent: -50 });
    var cx = gsap.quickTo(cur, "x", { duration: .35, ease: "power3" });
    var cy = gsap.quickTo(cur, "y", { duration: .35, ease: "power3" });
    window.addEventListener("mousemove", function (e) { cx(e.clientX); cy(e.clientY); }, { passive: true });
    document.addEventListener("mouseover", function (e) {
      var t = e.target.closest("[data-cursor], a, button");
      if (!t || t.classList.contains("btn")) { cur.classList.remove("is-label"); gsap.to(cur, { width: 14, height: 14, duration: .4, ease: "power3.out" }); return; }
      var text = t.dataset.cursor;
      if (text) {
        lab.textContent = text; cur.classList.add("is-label");
        gsap.to(cur, { width: 92, height: 92, duration: .5, ease: "power3.out" });
      } else {
        cur.classList.remove("is-label");
        gsap.to(cur, { width: 44, height: 44, duration: .4, ease: "power3.out" });
      }
    });
    document.documentElement.addEventListener("mouseleave", function () { gsap.to(cur, { opacity: 0, duration: .2 }); });
    document.documentElement.addEventListener("mouseenter", function () { gsap.to(cur, { opacity: 1, duration: .2 }); });
  }

  /* ------------------------------------------------------------------
     ANIMATIONS (dans l'ordre de la page)
     ------------------------------------------------------------------ */
  var mm = gsap.matchMedia();
  mm.add({
    desktop: "(min-width: 900px)",
    motion: "(prefers-reduced-motion: no-preference)"
  }, function (ctx) {
    var desktop = ctx.conditions.desktop;
    var motion = ctx.conditions.motion;
    var gal = $(".gal");
    gal.classList.toggle("is-static", desktop && !motion);

    if (motion) {
      /* ----- Salle I : hall ----- */
      gsap.to(".name .line:nth-child(1)", { xPercent: -7, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".name .line:nth-child(2)", { xPercent: 7,  ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-bg", { yPercent: 4, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

      gsap.set(statementWords, { opacity: .14 });
      gsap.to(statementWords, { opacity: 1, ease: "none", stagger: .12, scrollTrigger: { trigger: statement, start: "top 82%", end: "bottom 50%", scrub: true } });

      /* ----- Titres : révélation mot par mot ----- */
      wordTargets.forEach(function (t) {
        gsap.from(t.words, { yPercent: 112, duration: 1.1, stagger: .055, ease: "power4.out", scrollTrigger: { trigger: t.el, start: "top 88%", once: true } });
      });

      /* ----- Salle II : galerie horizontale ----- */
      if (desktop) {
        var track = $(".gal-track");
        var dist = function () { return Math.max(0, track.scrollWidth - window.innerWidth); };
        var bar = $(".gal-progress span");
        var tween = gsap.to(track, {
          x: function () { return -dist(); }, ease: "none",
          scrollTrigger: {
            trigger: gal, pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: 10,
            end: function () { return "+=" + dist(); },
            onUpdate: function (self) { gsap.set(bar, { scaleX: self.progress }); }
          }
        });
        $$(".piece").forEach(function (p) {
          var media = $(".vis svg, .vis .vis-img", p) || $(".vis", p);
          gsap.fromTo(media, { scale: 1.28, xPercent: -7 }, { scale: 1.28, xPercent: 7, ease: "none", scrollTrigger: { trigger: p, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
          gsap.fromTo($(".frame", p), { yPercent: 10, opacity: 0 }, { yPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 98%", end: "left 70%", scrub: true } });
        });
      } else {
        $$(".piece").forEach(function (p) {
          gsap.from($(".frame", p), { clipPath: "inset(0 0 100% 0)", duration: 1.3, ease: "power4.out", scrollTrigger: { trigger: p, start: "top 85%", once: true } });
        });
      }

      /* Registre : aperçu qui suit la souris */
      if (finePointer) {
        var prev = $(".registre-preview");
        var layers = $$(".vis", prev);
        var rows = $$(".row");
        var px = gsap.quickTo(prev, "x", { duration: .55, ease: "power3" });
        var py = gsap.quickTo(prev, "y", { duration: .55, ease: "power3" });
        gsap.set(prev, { scale: .92, rotation: -2 });
        var onMove = function (e) { px(e.clientX - prev.offsetWidth / 2); py(e.clientY - prev.offsetHeight / 2); };
        var regList = $(".registre-list");
        regList.addEventListener("mousemove", onMove);
        rows.forEach(function (row, i) {
          var txt = $(".t", row);
          txt.addEventListener("mouseenter", function () {
            prev.style.setProperty("--pr", (D.oeuvres[i] && D.oeuvres[i].ratio) || "4 / 5");
            layers.forEach(function (l, j) { l.classList.toggle("is-on", j === i); });
            gsap.to(prev, { opacity: 1, scale: 1, rotation: 0, duration: .5, ease: "power3.out", overwrite: "auto" });
          });
          txt.addEventListener("mouseleave", function () { hide(); });
        });
        var hide = function () {
          gsap.to(prev, { opacity: 0, scale: .92, rotation: -2, duration: .35, ease: "power3.in", overwrite: "auto" });
        };
        return function () { regList.removeEventListener("mousemove", onMove); };
      }
    }
  });

  /* Tablette / tactile : en appuyant sur un projet, son image apparaît sous le doigt */
  if (!finePointer) {
    var tPrev = $(".registre-preview");
    var tLayers = $$(".vis", tPrev);
    var tShow = function (idx, e) {
      tLayers.forEach(function (l, j) { l.classList.toggle("is-on", j === idx); });
      tPrev.style.setProperty("--pr", (D.oeuvres[idx] && D.oeuvres[idx].ratio) || "4 / 5");
      var touch = e.pointerType === "touch";
      var w = tPrev.offsetWidth, h = tPrev.offsetHeight;
      var x = e.clientX - w / 2;
      var y = touch ? e.clientY - h - 24 : e.clientY - h / 2;
      x = Math.min(Math.max(x, 8), window.innerWidth - w - 8);
      y = Math.min(Math.max(y, 8), window.innerHeight - h - 8);
      gsap.set(tPrev, { x: x, y: y });
      gsap.to(tPrev, { opacity: 1, scale: 1, rotation: 0, duration: .35, ease: "power3.out", overwrite: "auto" });
    };
    var tHide = function () { gsap.to(tPrev, { opacity: 0, scale: .92, duration: .3, overwrite: "auto" }); };
    var bind = function (el, idx) {
      el.addEventListener("pointerenter", function (e) { if (e.pointerType !== "touch") tShow(idx, e); });
      el.addEventListener("pointermove", function (e) { if (e.pointerType !== "touch") tShow(idx, e); });
      el.addEventListener("pointerdown", function (e) { tShow(idx, e); });
      ["pointerup", "pointercancel", "pointerleave"].forEach(function (n) { el.addEventListener(n, tHide); });
    };
    $$(".row").forEach(function (row, i) { bind($(".t", row), i); });
  }

  /* Le reste des animations vit dans un second matchMedia, créé APRÈS la galerie
     pour que ScrollTrigger calcule les positions avec l'espace de l'épinglage. */
  var mm2 = gsap.matchMedia();
  mm2.add("(prefers-reduced-motion: no-preference)", function () {
    $$(".tl").forEach(function (t) {
      gsap.from(t, { y: 36, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: t, start: "top 88%", once: true } });
    });


    /* ----- Salle VII : sortie ----- */
    gsap.from(".mail", { clipPath: "inset(0 0 100% 0)", y: 50, duration: 1.4, ease: "power4.out", scrollTrigger: { trigger: ".mail", start: "top 92%", once: true } });
    gsap.from(".links li, .foot > *", { y: 20, opacity: 0, duration: 1, stagger: .08, ease: "power3.out", scrollTrigger: { trigger: ".links", start: "top 95%", once: true } });
  });

  /* ---------- Suivi de la salle courante (toujours actif, créé en dernier) ---------- */
  $$("section[data-room]").forEach(function (sec) {
    ScrollTrigger.create({
      trigger: sec, start: "top 50%", end: "bottom 50%",
      onToggle: function (self) { if (self.isActive) setRoom(sec.dataset.room, sec.dataset.name); }
    });
  });
  setRoom("I", "Le hall");

  /* ------------------------------------------------------------------
     INTRODUCTION : le billet, puis le rideau s'ouvre
     ------------------------------------------------------------------ */
  function heroIn() {
    var tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(nameChars, { yPercent: 118, duration: 1.4, stagger: .045 }, 0)
      .from(".hero-bg svg, .hero-bg .vis-img", { scale: 1.25, duration: 2.4 }, 0)
      .from(".hero-foot > *", { opacity: 0, y: 14, duration: 1, stagger: .07 }, .8);
    return tl;
  }

  function finishLoading() {
    var pre = $(".preloader");
    if (pre) pre.remove();
    body.classList.remove("is-loading");
    if (lenis) lenis.start();
    ScrollTrigger.refresh();
  }

  if (reduceMotion) {
    finishLoading();
  } else {
    body.classList.add("is-loading");
    var intro = gsap.timeline({ onComplete: finishLoading });
    intro
      .to({}, { duration: .5 })
      .to(".curtain--top", { yPercent: -100, duration: 1.2, ease: "power4.inOut" })
      .to(".curtain--bottom", { yPercent: 100, duration: 1.2, ease: "power4.inOut" }, "<")
      .add(heroIn, "<.5");
    // filet de sécurité : jamais bloqué derrière le rideau
    setTimeout(function () { if (document.querySelector(".preloader")) { intro.progress(1); } }, 9000);
  }

  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
})();
