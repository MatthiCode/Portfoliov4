/* ==========================================================================
   Générateur de paysages de montagne (visuels de remplacement)
   Chaque scène est un SVG procédural : ciel dégradé, soleil, 5 crêtes
   enneigées, brume, grain. Aucune dépendance.
   ========================================================================== */
(function () {
  const PALETTES = {
    dawn:    { sky: ["#1b2a41", "#6b7fa3", "#f2b79a", "#ffd9a8"], sun: "#fff1d0", sunY: 0.52, ridges: ["#8a93b5", "#6a7399", "#4a5278", "#2e3454", "#161a2e"], snow: "#fff6ea", stars: 0.0 },
    glacier: { sky: ["#0f2a3d", "#3d7a96", "#a9d3df", "#e8f4f6"], sun: "#ffffff", sunY: 0.40, ridges: ["#9fc2cf", "#6e9fb3", "#44768d", "#244d63", "#0f2b3a"], snow: "#ffffff", stars: 0.0 },
    dusk:    { sky: ["#10081f", "#4b2a5c", "#c4566b", "#f0935a"], sun: "#ffd0a0", sunY: 0.58, ridges: ["#7b4a72", "#5a3361", "#3a2147", "#241230", "#10081a"], snow: "#ffd9d0", stars: 0.7 },
    forest:  { sky: ["#142a22", "#4d7a62", "#bcd5b4", "#f1efd6"], sun: "#fffbe0", sunY: 0.46, ridges: ["#98b79c", "#6b9378", "#44705a", "#264d3c", "#0f2a21"], snow: "#f4fbef", stars: 0.0 },
    storm:   { sky: ["#14181d", "#38424c", "#6b7885", "#a6b0b8"], sun: "#e4eaee", sunY: 0.34, ridges: ["#7e8a94", "#58646f", "#3a444e", "#232b33", "#0e1216"], snow: "#eef2f4", stars: 0.0 },
    gold:    { sky: ["#2a1a0c", "#9a5a22", "#e8a850", "#fbe3a8"], sun: "#fff6d6", sunY: 0.50, ridges: ["#c18a52", "#9a6232", "#6b4220", "#42270f", "#1f1206"], snow: "#fff1d0", stars: 0.0 }
  };

  let uid = 0;

  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // bruit de valeur 1D lissé
  function makeNoise(rand) {
    const table = Array.from({ length: 256 }, rand);
    const smooth = (t) => t * t * (3 - 2 * t);
    return function (x) {
      const i = Math.floor(x), f = x - i;
      const a = table[i & 255], b = table[(i + 1) & 255];
      return a + (b - a) * smooth(f);
    };
  }

  function ridgePath(noise, W, H, base, amp, freq, offset, ridged) {
    const step = 8;
    let d = "M0 " + H + " L0 ";
    const pts = [];
    for (let x = 0; x <= W; x += step) {
      let n = 0, a = 1, f = freq, norm = 0;
      for (let o = 0; o < 4; o++) {
        let v = noise(x * f + offset + o * 31.7);
        if (ridged) v = 1 - Math.abs(2 * v - 1);
        n += v * a; norm += a; a *= 0.5; f *= 2.1;
      }
      n /= norm;
      pts.push([x, base - amp * n]);
    }
    d += pts[0][1].toFixed(1);
    for (let i = 1; i < pts.length; i++) d += " L" + pts[i][0] + " " + pts[i][1].toFixed(1);
    d += " L" + W + " " + H + " Z";
    return d;
  }

  function sceneSVG(scene, seed, opts) {
    opts = opts || {};
    const P = PALETTES[scene] || PALETTES.dawn;
    const rand = rng(seed || 1);
    const noise = makeNoise(rng((seed || 1) * 7919));
    const W = opts.wide ? 1600 : 800, H = 1000;
    const id = "s" + (++uid);

    const sunX = W * (0.22 + rand() * 0.55);
    const sunY = H * P.sunY * (0.8 + rand() * 0.3);
    const sunR = 40 + rand() * 40;

    let svg = '<svg class="scene" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true">';
    svg += "<defs>";
    svg += '<linearGradient id="' + id + 'sky" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="' + P.sky[0] + '"/><stop offset=".38" stop-color="' + P.sky[1] + '"/>' +
      '<stop offset=".72" stop-color="' + P.sky[2] + '"/><stop offset="1" stop-color="' + P.sky[3] + '"/></linearGradient>';
    svg += '<radialGradient id="' + id + 'sun"><stop offset="0" stop-color="' + P.sun + '" stop-opacity="1"/>' +
      '<stop offset=".25" stop-color="' + P.sun + '" stop-opacity=".55"/><stop offset="1" stop-color="' + P.sun + '" stop-opacity="0"/></radialGradient>';
    P.ridges.forEach(function (c, i) {
      const snowStop = Math.max(0.015, 0.075 - i * 0.015);
      const rockStop = snowStop + 0.13;
      svg += '<linearGradient id="' + id + "r" + i + '" x1="0" y1="0" x2="0" y2="1">' +
        (i < 3 ? '<stop offset="0" stop-color="' + P.snow + '"/><stop offset="' + snowStop.toFixed(2) + '" stop-color="' + P.snow + '"/>' : '<stop offset="0" stop-color="' + c + '"/>') +
        '<stop offset="' + rockStop.toFixed(2) + '" stop-color="' + c + '"/><stop offset="1" stop-color="' + c + '"/></linearGradient>';
    });
    svg += '<linearGradient id="' + id + 'mist" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + P.sky[3] + '" stop-opacity="0"/>' +
      '<stop offset="1" stop-color="' + P.sky[3] + '" stop-opacity=".55"/></linearGradient>';
    svg += '<filter id="' + id + 'g" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="' + (seed || 1) + '"/>' +
      '<feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .55 -.18"/></filter>';
    svg += "</defs>";

    svg += '<rect width="' + W + '" height="' + H + '" fill="url(#' + id + 'sky)"/>';

    // étoiles
    if (P.stars) {
      svg += '<g fill="#fff">';
      for (let i = 0; i < 70; i++) {
        const o = (rand() * 0.8 * P.stars).toFixed(2);
        svg += '<circle cx="' + (rand() * W).toFixed(0) + '" cy="' + (rand() * H * 0.45).toFixed(0) + '" r="' + (0.6 + rand() * 1.2).toFixed(1) + '" opacity="' + o + '"/>';
      }
      svg += "</g>";
    }

    // soleil
    svg += '<circle cx="' + sunX.toFixed(0) + '" cy="' + sunY.toFixed(0) + '" r="' + (sunR * 4.2).toFixed(0) + '" fill="url(#' + id + 'sun)"/>';
    svg += '<circle cx="' + sunX.toFixed(0) + '" cy="' + sunY.toFixed(0) + '" r="' + sunR.toFixed(0) + '" fill="' + P.sun + '" opacity=".9"/>';

    // crêtes, de la plus lointaine à la plus proche
    const bases = [0.60, 0.68, 0.76, 0.85, 0.96];
    const amps  = [330, 300, 250, 190, 130];
    const freqs = [0.0045, 0.0055, 0.0075, 0.010, 0.014];
    for (let i = 0; i < 5; i++) {
      svg += '<path d="' + ridgePath(noise, W, H, H * bases[i], amps[i], freqs[i], rand() * 100, i < 3) + '" fill="url(#' + id + "r" + i + ')"/>';
      if (i < 4) svg += '<rect x="0" y="' + (H * bases[i] - 40) + '" width="' + W + '" height="' + (H * (bases[i + 1] - bases[i]) + 120) + '" fill="url(#' + id + 'mist)" opacity="' + (0.9 - i * 0.12).toFixed(2) + '"/>';
    }

    // silhouette (portrait)
    if (opts.figure) {
      svg += '<g fill="' + P.ridges[4] + '"><circle cx="400" cy="640" r="74"/>' +
        '<path d="M170 1000 C190 800 290 735 400 735 C510 735 610 800 630 1000 Z"/></g>';
    }

    svg += '<rect width="' + W + '" height="' + H + '" filter="url(#' + id + 'g)" opacity=".5" style="mix-blend-mode:overlay"/>';
    svg += "</svg>";
    return svg;
  }

  /**
   * Monte un visuel dans un élément : paysage généré immédiatement,
   * remplacé par la vraie image si elle existe.
   */
  function mountVisual(el, cfg) {
    el.classList.add("vis");
    el.innerHTML = sceneSVG(cfg.scene, cfg.seed, { figure: cfg.figure, wide: cfg.wide });
    el.dataset.fallback = "true";
    if (cfg.image) {
      const img = new Image();
      img.alt = cfg.alt || "";
      img.decoding = "async";
      img.className = "vis-img";
      img.onload = function () {
        el.innerHTML = "";
        el.appendChild(img);
        el.dataset.fallback = "false";
      };
      img.src = cfg.image;
    }
  }

  window.Scenes = { sceneSVG: sceneSVG, mountVisual: mountVisual };
})();
