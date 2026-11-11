/* Ooya — motion script. Version 1.0 — 2026-11-11
   Changes: first version (CC_SESSION_ooya_js_glass_bg_v1): mascot walk / blink / waves, OOYA background words, leaves, butterflies.
   Previous: NONE
   Vanilla JS, no library, no network, no cookie, no storage. Decoration only (aria-hidden). Safe: the page is complete without it. */
(function () {
  'use strict';
  try {
    var doc = document, win = window;
    var reduce = win.matchMedia && win.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var phone = win.innerWidth < 600 || (navigator.hardwareConcurrency || 4) <= 2;
    var vw = win.innerWidth, vh = win.innerHeight;
    var COL = ['#3F6B4F', '#2F5039', '#C9A24B', '#F3E7C6', '#E4EEE6'];
    var LEAF = ['#3F6B4F', '#C9A24B', '#D98E3F', '#8FB58A', '#C8643C', '#E3C25B', '#6E9F5A', '#D98A8A'];
    var NS = 'http://www.w3.org/2000/svg';
    var loops = [];

    // Changed: random helpers 2026-11-11
    function rnd(a, b) { return a + Math.random() * (b - a); }
    // Changed: pick (new file) 2026-11-11
    function pick(list) { return list[Math.floor(Math.random() * list.length)]; }
    // Changed: clamp (new file) 2026-11-11
    function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
    // Changed: layer (new file) 2026-11-11
    function layer(cls) {
      var d = doc.createElement('div');
      d.className = cls;
      d.setAttribute('aria-hidden', 'true');
      doc.body.appendChild(d);
      return d;
    }

    // Changed: OOYA words on the fixed background, built here so they are not in the page source 2026-11-11
    var words = layer('ow-layer');
    var lastW = vw;
    // Changed: buildWords (new file) 2026-11-11
    function buildWords() {
      var n = phone ? 8 : 14, placed = [], i, tries, best, w, s, x, y, edge, el, d;
      words.innerHTML = '';
      vw = win.innerWidth; vh = win.innerHeight; lastW = vw;
      for (i = 0; i < n; i++) {
        s = phone ? rnd(46, 130) : rnd(70, 220);
        edge = i < Math.ceil(n * 0.4);
        best = null;
        for (tries = 0; tries < 40; tries++) {
          if (edge) {
            var side = Math.floor(Math.random() * 4);
            x = side === 0 ? rnd(-0.1, 0.1) * vw : (side === 1 ? vw + rnd(-0.1, 0.1) * vw : rnd(0.05, 0.95) * vw);
            y = side === 2 ? rnd(-0.05, 0.05) * vh : (side === 3 ? vh + rnd(-0.05, 0.05) * vh : rnd(0.05, 0.95) * vh);
          } else {
            x = rnd(0.12, 0.88) * vw; y = rnd(0.1, 0.9) * vh;
          }
          var worst = 1e9, j;
          for (j = 0; j < placed.length; j++) {
            d = Math.sqrt(Math.pow(x - placed[j].x, 2) + Math.pow(y - placed[j].y, 2)) - (s + placed[j].s) * 0.7;
            if (d < worst) worst = d;
          }
          if (!best || worst > best.w) best = { x: x, y: y, w: worst };
          if (worst > 0) break;
        }
        placed.push({ x: best.x, y: best.y, s: s });
        el = doc.createElement('span');
        el.className = 'ow';
        el.textContent = 'OOYA';
        el.style.cssText = 'left:' + best.x.toFixed(0) + 'px;top:' + best.y.toFixed(0) + 'px;font-size:' + s.toFixed(0) +
          'px;color:' + pick(COL) + ';--a:' + rnd(-35, 35).toFixed(1) + 'deg;--o:' + rnd(0.1, 0.2).toFixed(2) +
          ';font-weight:' + (Math.random() < 0.5 ? 600 : 700);
        words.appendChild(el);
        (function (node) {
          if (reduce) { node.classList.add('on'); return; }
          setTimeout(function () { node.classList.add('on'); }, rnd(0, 2500));
        })(el);
      }
    }
    buildWords();
    var rz = 0;
    win.addEventListener('resize', function () {
      vw = win.innerWidth; vh = win.innerHeight;
      clearTimeout(rz);
      rz = setTimeout(function () { if (Math.abs(win.innerWidth - lastW) / lastW > 0.2) buildWords(); }, 300);
    });

    if (reduce) { return; }  // reduced motion: words static, no mascot loop, no leaves, no butterflies

    // Changed: shared scroll speed, smoothed 2026-11-11
    var scrollY = win.pageYOffset || 0, sv = 0, pushLeaf = 0, pushBfly = 0;
    // Changed: scroll gives only a gentle push to leaves and butterflies 2026-11-11
    function scrollStep(dt) {
      var y = win.pageYOffset || 0, v = Math.abs(y - scrollY) / dt;
      scrollY = y;
      sv += (v - sv) * (1 - Math.exp(-dt / 0.1));
      var k = 1 - Math.exp(-dt / 0.2);
      pushLeaf += (clamp(sv * 0.12, 0, 35) - pushLeaf) * k;
      pushBfly += (clamp(sv * 0.05, 0, 15) - pushBfly) * k;
    }

    // ---------- leaves ----------
    var leafLayer = layer('fx fx-leaf'), leaves = [];
    // Changed: one leaf gets a new random look and start 2026-11-11
    function resetLeaf(l, top) {
      l.s = phone ? rnd(16, 26) : rnd(18, 34);
      l.x0 = rnd(0, vw); l.y = top ? -l.s : rnd(-vh, vh * 0.7);
      l.v = rnd(28, 70); l.amp = rnd(20, 70); l.per = rnd(3, 7); l.ph = rnd(0, 6.28);
      l.spin = rnd(-40, 40); l.rot = rnd(0, 360);
      l.el.style.width = l.s.toFixed(0) + 'px';
      l.el.firstChild.firstChild.setAttribute('fill', pick(LEAF));
    }
    (function () {
      var n = phone ? 6 : 10, i, el, svg, p, l;
      for (i = 0; i < n; i++) {
        el = doc.createElement('span');
        svg = doc.createElementNS(NS, 'svg');
        svg.setAttribute('viewBox', '0 0 64 64');
        p = doc.createElementNS(NS, 'path');
        p.setAttribute('d', 'M8 56C8 28 26 8 56 6c0 30-18 50-46 50z');
        svg.appendChild(p);
        p = doc.createElementNS(NS, 'path');
        p.setAttribute('d', 'M12 52L44 20');
        p.setAttribute('stroke', '#fff'); p.setAttribute('stroke-width', '3'); p.setAttribute('stroke-linecap', 'round'); p.setAttribute('opacity', '.45');
        svg.appendChild(p);
        el.appendChild(svg);
        leafLayer.appendChild(el);
        l = { el: el };
        resetLeaf(l, false);
        leaves.push(l);
      }
    })();
    // Changed: leaves fall on their own clock, sway and spin 2026-11-11
    function leafStep(dt, t) {
      var i, l, x;
      for (i = 0; i < leaves.length; i++) {
        l = leaves[i];
        l.y += (l.v + pushLeaf) * dt;
        l.rot += l.spin * dt;
        if (l.y > vh + l.s) resetLeaf(l, true);
        x = l.x0 + l.amp * Math.sin(6.283 * t / l.per + l.ph);
        l.el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + l.y.toFixed(1) + 'px,0) rotate(' + l.rot.toFixed(0) + 'deg)';
      }
    }

    // ---------- butterflies ----------
    var bflyLayer = layer('fx fx-bfly'), bflies = [];
    // Changed: one butterfly drawing (type 0 classic gold, type 1 swallowtail), wings mirrored in one group 2026-11-11
    function drawButterfly(type) {
      var svg = doc.createElementNS(NS, 'svg'), wings = doc.createElementNS(NS, 'g'), side, g, up, lo, i, c, body, a;
      svg.setAttribute('viewBox', '-70 -52 140 118');
      for (side = 0; side < 2; side++) {
        g = doc.createElementNS(NS, 'g');
        if (side) g.setAttribute('transform', 'scale(-1 1)');
        up = doc.createElementNS(NS, 'path'); lo = doc.createElementNS(NS, 'path');
        if (type === 0) {
          up.setAttribute('d', 'M4 -4 C30 -44 66 -32 58 -4 C54 6 20 6 4 0Z'); up.setAttribute('fill', '#C9A24B');
          lo.setAttribute('d', 'M4 2 C30 4 54 14 44 38 C34 54 12 32 4 6Z'); lo.setAttribute('fill', '#C9A24B');
        } else {
          up.setAttribute('d', 'M4 -4 C26 -42 58 -38 52 -6 C42 2 16 4 4 0Z'); up.setAttribute('fill', '#3F6B4F');
          lo.setAttribute('d', 'M4 2 C24 2 42 10 38 28 C36 40 42 60 32 62 C22 54 8 32 4 6Z'); lo.setAttribute('fill', '#C9A24B');
        }
        up.setAttribute('stroke', '#2F5039'); up.setAttribute('stroke-width', '1.5');
        lo.setAttribute('stroke', '#2F5039'); lo.setAttribute('stroke-width', '1.5');
        g.appendChild(up); g.appendChild(lo);
        var spots = type === 0 ? [[34, -14, 6, '#F3E7C6'], [28, 20, 4, '#F3E7C6']] : [[34, -16, 5, '#E4EEE6'], [30, 18, 3.5, '#E4EEE6']];
        for (i = 0; i < spots.length; i++) {
          c = doc.createElementNS(NS, 'circle');
          c.setAttribute('cx', spots[i][0]); c.setAttribute('cy', spots[i][1]); c.setAttribute('r', spots[i][2]); c.setAttribute('fill', spots[i][3]);
          g.appendChild(c);
        }
        wings.appendChild(g);
      }
      svg.appendChild(wings);
      body = doc.createElementNS(NS, 'ellipse');
      body.setAttribute('rx', '3.5'); body.setAttribute('ry', '20'); body.setAttribute('fill', '#2F5039');
      svg.appendChild(body);
      for (a = -1; a <= 1; a += 2) {
        c = doc.createElementNS(NS, 'path');
        c.setAttribute('d', 'M0 -18 Q' + (a * 4) + ' -30 ' + (a * 10) + ' -38');
        c.setAttribute('fill', 'none'); c.setAttribute('stroke', '#2F5039'); c.setAttribute('stroke-width', '1.5'); c.setAttribute('stroke-linecap', 'round');
        svg.appendChild(c);
      }
      return { svg: svg, wings: wings };
    }
    (function () {
      var n = phone ? 2 : 3, i, el, d, b;
      for (i = 0; i < n; i++) {
        d = drawButterfly(i < 2 ? i : Math.floor(Math.random() * 2));
        el = doc.createElement('span');
        el.appendChild(d.svg);
        bflyLayer.appendChild(el);
        b = { el: el, wings: d.wings, w: phone ? rnd(32, 44) : rnd(40, 58), x: rnd(0, vw), y: rnd(-vh * 0.2, vh * 0.8),
          h: 0, ht: 0, hn: 0, sp: rnd(18, 40), per: rnd(0.3, 0.5), ph: rnd(0, 6.28) };
        el.style.width = b.w.toFixed(0) + 'px';
        bflies.push(b);
      }
    })();
    // Changed: butterflies wander with a smoothed random heading, flap by scaleX 2026-11-11
    function bflyStep(dt, t) {
      var i, b, vx, vy, flap;
      for (i = 0; i < bflies.length; i++) {
        b = bflies[i];
        b.hn -= dt;
        if (b.hn <= 0) { b.ht = rnd(-1.3, 1.3); b.hn = rnd(0.8, 2.2); }
        if (b.x < 20) b.ht = Math.abs(b.ht); else if (b.x > vw - 20) b.ht = -Math.abs(b.ht);
        b.h += (b.ht - b.h) * (1 - Math.exp(-dt / 0.6));
        vx = Math.sin(b.h) * b.sp;
        vy = (0.45 + 0.55 * Math.cos(b.h)) * b.sp + pushBfly;
        b.x += vx * dt; b.y += vy * dt;
        if (b.y > vh + 70) { b.y = -70; b.x = rnd(0, vw); }
        flap = 0.25 + 0.75 * Math.abs(Math.cos(6.283 * t / b.per + b.ph));
        b.wings.setAttribute('transform', 'scale(' + flap.toFixed(2) + ' 1)');
        b.el.style.transform = 'translate3d(' + (b.x - b.w / 2).toFixed(1) + 'px,' + (b.y - b.w * 0.42).toFixed(1) + 'px,0) rotate(' + clamp(b.h * 40, -45, 45).toFixed(0) + 'deg)';
      }
    }

    // ---------- mascot ----------
    var mascot = doc.querySelector('.mascot');
    var M = null;
    // Changed: take over the mascot after the intro: clear the intro animations so inline transforms win 2026-11-11
    function startMascot() {
      if (M || !mascot) return;
      var q = function (s) { return mascot.querySelector(s); };
      M = { walk: q('.m-walk'), hop: q('.m-hop'), armL: q('.m-armL'), armR: q('.m-armR'), legL: q('.m-legL'), legR: q('.m-legR'),
        eyeL: q('.m-eyeL'), eyeR: q('.m-eyeR'), pupL: q('.m-eyeL .m-pup'), pupR: q('.m-eyeR .m-pup'),
        smile: q('.m-smile'), open: q('.m-open'), body: q('.m-body'), shadow: q('.m-shadow') };
      var k, list = ['armL', 'armR', 'legL', 'legR', 'smile', 'open', 'body', 'shadow'];
      for (k = 0; k < list.length; k++) { if (M[list[k]]) M[list[k]].style.animation = 'none'; }
      if (M.open) M.open.style.opacity = '0';
      if (M.smile) M.smile.style.opacity = '1';
      M.x = 0; M.v = 0; M.vs = 0; M.phase = 0; M.move = 0;
      M.hopT = -1; M.hopLast = -9; M.nextHop = rnd(5, 9);
      M.waveT = -1; M.waveArm = 0; M.nextWave = rnd(4, 8);
      M.blinkT = -1; M.blinkNext = rnd(2, 5); M.blinkTwice = false;
      M.mouthOpen = false; M.mouthSince = 0; M.openUntil = 0;
    }
    if (mascot) {
      mascot.addEventListener('animationend', function (e) { if (e.animationName === 'm-intro') startMascot(); });
      setTimeout(startMascot, 7200);
    }
    // Changed: mascot step: position follows a sine of the scroll position, with smoothing and a hard speed cap 2026-11-11
    function mascotStep(dt, t) {
      if (!M || !M.walk) return;
      var cap = phone ? 90 : 120, period = phone ? 800 : 1100;
      var target = Math.sin(6.283 * scrollY / period) * vw * 0.34;
      var vel = clamp((target - M.x) / 0.35, -cap, cap);
      M.vs += (vel - M.vs) * (1 - Math.exp(-dt / 0.15));
      M.x += M.vs * dt;
      var speed = Math.abs(M.vs), ratio = speed / cap;
      M.move += ((speed > 6 ? 1 : 0) - M.move) * (1 - Math.exp(-dt / 0.2));
      M.phase += dt * 6.283 * (1.4 + 1.8 * ratio) * (speed > 6 ? 1 : 0);
      var sw = Math.sin(M.phase) * M.move;
      M.legL.style.transform = 'rotate(' + (sw * 26).toFixed(1) + 'deg)';
      M.legR.style.transform = 'rotate(' + (-sw * 26).toFixed(1) + 'deg)';
      // hops: fast movement (at least 1.2 s apart) or an idle hop every 5-9 s with a chance
      if (M.hopT < 0 && t - M.hopLast > 1.2 && ratio > 0.6) { M.hopT = 0; M.hopLast = t; }
      M.nextHop -= dt;
      if (M.nextHop <= 0) { M.nextHop = rnd(5, 9); if (M.hopT < 0 && Math.random() < 0.6) { M.hopT = 0; M.hopLast = t; } }
      var hy = 0, squash = 0;
      if (M.hopT >= 0) {
        M.hopT += dt;
        if (M.hopT >= 0.5) M.hopT = -1; else { hy = -Math.sin(Math.PI * M.hopT / 0.5) * 18; squash = Math.sin(Math.PI * M.hopT / 0.5) * 0.04; }
      }
      // waves: one arm to about 150 degrees for 1 s every 4-8 s
      M.nextWave -= dt;
      if (M.waveT < 0 && M.nextWave <= 0) { M.waveT = 0; M.waveArm = Math.random() < 0.5 ? 0 : 1; M.nextWave = rnd(4, 8); }
      var wv = 0;
      if (M.waveT >= 0) {
        M.waveT += dt;
        if (M.waveT >= 1) M.waveT = -1; else wv = Math.sin(Math.PI * M.waveT) * (1 + 0.08 * Math.sin(M.waveT * 30));
      }
      var aL = -sw * 22 + (M.waveArm === 0 ? wv * 150 : 0), aR = sw * 22 - (M.waveArm === 1 ? wv * 150 : 0);
      M.armL.style.transform = 'rotate(' + aL.toFixed(1) + 'deg)';
      M.armR.style.transform = 'rotate(' + aR.toFixed(1) + 'deg)';
      M.walk.style.transform = 'translate3d(' + M.x.toFixed(1) + 'px,0,0)';
      M.hop.style.transform = 'translate3d(0,' + hy.toFixed(1) + 'px,0)';
      M.body.style.transform = 'rotate(' + (M.vs / cap * 4).toFixed(1) + 'deg) scale(' + (1 + squash).toFixed(3) + ',' + (1 - squash).toFixed(3) + ')';
      // eyes: blink every 2-5 s (120 ms, sometimes twice); pupils lean toward the travel direction (up to 2 px)
      M.blinkNext -= dt;
      if (M.blinkT < 0 && M.blinkNext <= 0) { M.blinkT = 0; M.blinkTwice = Math.random() < 0.15; M.blinkNext = rnd(2, 5); }
      var bs = 1;
      if (M.blinkT >= 0) {
        M.blinkT += dt;
        if (M.blinkT < 0.12) bs = 0.1;
        else if (M.blinkTwice && M.blinkT > 0.24 && M.blinkT < 0.36) bs = 0.1;
        else if (M.blinkT > (M.blinkTwice ? 0.36 : 0.12)) M.blinkT = -1;
      }
      M.eyeL.style.transform = 'scaleY(' + bs + ')';
      M.eyeR.style.transform = 'scaleY(' + bs + ')';
      var px = clamp(M.vs / cap, -1, 1) * 2;
      M.pupL.style.transform = 'translate(' + px.toFixed(1) + 'px,0)';
      M.pupR.style.transform = 'translate(' + px.toFixed(1) + 'px,0)';
      // mouth: small smile; open while hopping, waving or after a speed spike; at least 250 ms per state
      var now = t * 1000;
      if (ratio > 0.85) M.openUntil = now + 600;
      var want = M.hopT >= 0 || M.waveT >= 0 || now < M.openUntil;
      if (want !== M.mouthOpen && now - M.mouthSince >= 250) {
        M.mouthOpen = want; M.mouthSince = now;
        M.open.style.opacity = want ? '1' : '0';
        M.smile.style.opacity = want ? '0' : '1';
      }
    }

    // ---------- one loop, paused when the tab is hidden ----------
    var raf = 0, last = 0, clock = 0;
    // Changed: single requestAnimationFrame loop with a capped delta time 2026-11-11
    function frame(ts) {
      var dt = last ? Math.min((ts - last) / 1000, 0.05) : 0.016;
      last = ts;
      clock += dt;
      try {
        scrollStep(dt);
        leafStep(dt, clock);
        bflyStep(dt, clock);
        mascotStep(dt, clock);
      } catch (err) {
        // a failure stops the loop and gives the page back to the CSS fallback
        leafLayer.parentNode.removeChild(leafLayer); bflyLayer.parentNode.removeChild(bflyLayer);
        doc.documentElement.classList.remove('js');
        if (M && M.walk) { M.walk.style.transform = ''; M.hop.style.transform = ''; }
        return;
      }
      raf = win.requestAnimationFrame(frame);
    }
    // Changed: stop the loop while the tab is hidden 2026-11-11
    doc.addEventListener('visibilitychange', function () {
      if (doc.hidden) { win.cancelAnimationFrame(raf); raf = 0; last = 0; }
      else if (!raf) { raf = win.requestAnimationFrame(frame); }
    });
    raf = win.requestAnimationFrame(frame);
  } catch (e) {
    /* a failure leaves the page complete: the CSS fallback motion stays */
    try { document.documentElement.classList.remove('js'); } catch (e2) {}
  }
})();
