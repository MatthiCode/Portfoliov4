/* ==========================================================================
   MASCOTTE : les pupilles suivent le curseur (ou le doigt), clignent des yeux,
   regardent autour d'elles quand on ne bouge plus, et sautent quand on les touche.
   Sans GSAP ou avec « mouvement réduit » : la mascotte reste fixe, pupilles au repos.
   ========================================================================== */
(function () {
  "use strict";
  var root = document.querySelector(".mascotte");
  if (!root || typeof window.gsap === "undefined") return;

  var inner = root.querySelector(".mascotte-in");
  var corps = root.querySelector(".mascotte-corps");
  var eyes = [
    // cx, cy : centre de l'œil vert dans l'image du corps (px) ; mx, my : course max de la pupille (px)
    { el: root.querySelector(".mascotte-pupille--g"), cx: 11,   cy: 91.5, mx: 2,  my: 3 },
    { el: root.querySelector(".mascotte-pupille--d"), cx: 68.5, cy: 85.5, mx: 9,  my: 2.5 }
  ];
  var BODY_W = 156;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  eyes.forEach(function (e) {
    e.x = gsap.quickTo(e.el, "x", { duration: .28, ease: "power3" });
    e.y = gsap.quickTo(e.el, "y", { duration: .28, ease: "power3" });
  });

  var lastMove = Date.now();

  /* direction du regard : v = (-1..1, -1..1) */
  function look(vx, vy) {
    var k = corps.getBoundingClientRect().width / BODY_W;
    eyes.forEach(function (e) { e.x(vx * e.mx * k); e.y(vy * e.my * k); });
  }

  function lookAt(px, py) {
    var r = corps.getBoundingClientRect();
    var k = r.width / BODY_W;
    var vx = 0, vy = 0;
    // chaque œil regarde depuis sa propre position : l'effet de parallaxe est plus naturel
    eyes.forEach(function (e) {
      var ex = r.left + e.cx * k, ey = r.top + e.cy * k;
      var dx = px - ex, dy = py - ey;
      var d = Math.hypot(dx, dy) || 1;
      var f = Math.min(1, d / 220);         // proche = regard doux, loin = plein effet
      e.x((dx / d) * f * e.mx * k);
      e.y((dy / d) * f * e.my * k);
    });
  }

  if (reduce) return;

  var onPointer = function (e) { lastMove = Date.now(); lookAt(e.clientX, e.clientY); };
  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("pointerdown", onPointer, { passive: true });

  /* au repos : flottement léger */
  var bob = gsap.to(inner, { y: -5, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1, paused: true });

  /* clignement : les pupilles s'étirent et couvrent l'œil vert */
  function blink() {
    gsap.to(eyes.map(function (e) { return e.el; }), {
      scaleY: 2.4, scaleX: 1.15, duration: .07, yoyo: true, repeat: 1, ease: "power1.in", overwrite: false
    });
  }
  (function schedule() {
    setTimeout(function () { blink(); if (Math.random() < .25) setTimeout(blink, 220); schedule(); }, 2200 + Math.random() * 3800);
  })();

  /* sans mouvement depuis 3 s : elle regarde autour d'elle */
  setInterval(function () {
    if (Date.now() - lastMove < 3000) return;
    look(Math.random() * 2 - 1, Math.random() * 2 - 1);
  }, 1400);

  /* clic / toucher : petit saut + regard écarquillé */
  var jumping = false;
  root.addEventListener("pointerdown", function () {
    if (jumping) return;
    jumping = true; bob.pause();
    gsap.timeline({ onComplete: function () { jumping = false; bob.play(); } })
      .to(inner, { scaleY: .88, scaleX: 1.06, duration: .12, ease: "power2.out" })
      .to(inner, { y: -46, scaleY: 1.06, scaleX: .96, duration: .26, ease: "power2.out" })
      .to(inner, { y: 0, scaleY: .92, scaleX: 1.04, duration: .24, ease: "power2.in" })
      .to(inner, { scaleX: 1, scaleY: 1, duration: .4, ease: "elastic.out(1, .4)" });
    gsap.fromTo(eyes.map(function (e) { return e.el; }), { scale: 1.25 }, { scale: 1, duration: .6, ease: "elastic.out(1,.4)" });
  });

  /* apparition après le rideau d'entrée */
  gsap.from(root, { yPercent: 105, duration: 1.1, ease: "back.out(1.4)", delay: 2.4, onComplete: function () { bob.play(); } });
  setTimeout(function () { bob.play(); }, 9500); // filet de sécurité
})();
