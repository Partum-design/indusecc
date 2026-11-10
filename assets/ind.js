/* INDUSECC — shared interactions for every page */
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body, $ = function(s,c){ return (c||document).querySelector(s); }, $$ = function(s,c){ return [].slice.call((c||document).querySelectorAll(s)); };
  var ioReady = false, revealHeroQueued = false;

  /* ── PRELOADER: full animation once per session, quick curtain afterwards ── */
  var pre = $('#pre');
  function afterPreloader(){
    body.classList.remove('is-loading');
    setTimeout(function(){ body.classList.add('ready'); revealHero(); }, 300);
  }
  if (pre){
    var quick = document.documentElement.classList.contains('pre-quick');
    $$('.pre-mark path', pre).forEach(function(p){ p.style.setProperty('--len', Math.ceil(p.getTotalLength())); });
    $$('.pre-word span', pre).forEach(function(s,i){ s.style.animationDelay = (0.4 + i*0.06)+'s'; });
    requestAnimationFrame(function(){ pre.classList.add('run'); });
    var num = $('.pre-num', pre), bar = $('.pre-bar i', pre);
    var MIN = reduce ? 150 : quick ? 450 : 2300, start = performance.now(), loaded = quick, shown = 0;
    if (document.readyState === 'complete') loaded = true;
    window.addEventListener('load', function(){ loaded = true; });
    setTimeout(function(){ loaded = true; }, quick ? 1200 : 6000);
    var tick = function(now){
      var t = Math.min((now - start)/MIN, 1);
      var target = loaded ? t : Math.min(t, .9);
      shown += (target - shown) * (quick ? .3 : .12);
      if (loaded && t >= 1 && shown > .99) shown = 1;
      var e = 1 - Math.pow(1 - shown, 2);
      if (num) num.textContent = Math.round(e*100) + '%';
      if (bar) bar.style.transform = 'scaleX(' + e + ')';
      if (shown < 1) requestAnimationFrame(tick); else finish();
    };
    requestAnimationFrame(tick);
    var finish = function(){
      try { sessionStorage.setItem('ind-pre', '1'); } catch(e){}
      setTimeout(function(){
        pre.classList.add('out');
        afterPreloader();
        setTimeout(function(){ pre.remove(); }, 1500);
      }, quick ? 60 : 250);
    };
  } else {
    afterPreloader();
  }

  /* ── HEADER + MOBILE MENU + PROGRESS ── */
  var hdr = $('#hdr'), prog = $('#prog'), lastY = 0;
  function onScrollHeader(){
    var y = window.scrollY;
    if (hdr){
      hdr.classList.toggle('scrolled', y > 40);
      hdr.classList.toggle('hide', y > lastY && y > 500 && !body.classList.contains('menu-open'));
    }
    lastY = y;
    if (prog){ var h = document.documentElement.scrollHeight - innerHeight; prog.style.transform = 'scaleX(' + (h > 0 ? y/h : 0) + ')'; }
  }
  var burger = $('#burger');
  if (burger){
    burger.addEventListener('click', function(){
      var open = body.classList.toggle('menu-open');
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      body.style.overflow = open ? 'hidden' : '';
    });
    $$('#mnav a').forEach(function(a){ a.addEventListener('click', function(){ body.classList.remove('menu-open'); body.style.overflow=''; }); });
  }

  /* ── DECORATIVE LINES (hero + impact) ── */
  $$('.hero-lines g').forEach(function(g){
    var d = '';
    for (var i=0;i<26;i++){ var y = 900 - i*14; d += '<path d="M-50 '+(y+120)+' C 500 '+(y-60)+', 1000 '+(y+180-i*9)+', 1650 '+(y-260+i*6)+'"/>'; }
    g.innerHTML = d;
  });
  $$('svg.rays').forEach(function(rays){
    var r = '';
    for (var k=0;k<60;k++){ r += '<line x1="1600" y1="'+(150+k*12)+'" x2="'+(560 - k*4)+'" y2="'+(380 + k*9)+'" stroke="rgba(201,168,76,'+(0.05+0.25*(k/60))+')" stroke-width=".7"/>'; }
    for (var m=0;m<40;m++){ r += '<line x1="0" y1="'+(820+m*3)+'" x2="1600" y2="'+(500+m*10)+'" stroke="rgba(255,255,255,'+(0.03+0.06*(m/40))+')" stroke-width=".6"/>'; }
    rays.innerHTML = r;
  });

  /* ── STARS ── */
  var star = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>';
  $$('[data-stars]').forEach(function(el){ el.innerHTML = star+star+star+star+star; });

  /* ── MARQUEES: duplicate content for a seamless loop ── */
  $$('[data-marquee]').forEach(function(el){ el.innerHTML += el.innerHTML; });

  /* ── FIT TEXT: shrink giant words so they never get cut ── */
  function fit(){
    $$('[data-fit]').forEach(function(el){
      el.style.fontSize = '';
      var host = el.parentElement, max = parseFloat(getComputedStyle(el).fontSize), w = host.clientWidth;
      if (el.scrollWidth > w && w > 0) el.style.fontSize = Math.floor(max * (w / el.scrollWidth) * 0.98) + 'px';
    });
  }
  fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);

  /* ── COUNTERS ── */
  function count(el){
    if (el.dataset.done) return; el.dataset.done = 1;
    var to = +el.dataset.count, suf = el.dataset.suffix || '', pre = el.dataset.prefix || '', t0 = performance.now(), dur = 1800;
    (function step(now){
      var p = Math.min((now-t0)/dur,1), e = 1 - Math.pow(1-p,4);
      el.textContent = pre + Math.round(to*e).toLocaleString('es-MX') + suf;
      if (p<1) requestAnimationFrame(step);
    })(t0);
  }

  /* ── SPLIT LINES: release overflow once revealed so nothing gets cut ── */
  function settleSplit(el){ setTimeout(function(){ el.classList.add('done'); }, 1600); }

  /* ── REVEAL ON SCROLL ── */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (!en.isIntersecting) return;
      var el = en.target;
      if (el._clipKids) el._clipKids.forEach(function(k){ k.classList.add('in'); });
      if (el.matches('[data-r^="clip"]')) { io.unobserve(el); return; }
      el.classList.add('in');
      if (el.hasAttribute('data-split')) settleSplit(el);
      $$('[data-count]', el).forEach(count);
      if (el.dataset.count) count(el);
      io.unobserve(el);
    });
  }, {threshold:.12, rootMargin:'0px 0px -6% 0px'});
  function inHero(el){ return el.closest('.hero, .phero'); }
  function revealHero(){
    $$('.hero [data-r], .hero [data-split], .phero [data-r], .phero [data-split]').forEach(function(el){
      el.classList.add('in'); if (el.hasAttribute('data-split')) settleSplit(el);
    });
    $$('.hero [data-count], .phero [data-count]').forEach(function(el){ setTimeout(function(){ count(el); }, 1100); });
  }
  /* clip-path hidden elements report no intersection, so watch their parent instead */
  $$('[data-r^="clip"]').forEach(function(el){
    if (inHero(el)) return;
    var host = el.parentElement; (host._clipKids = host._clipKids || []).push(el); io.observe(host);
  });
  $$('[data-r]:not([data-r^="clip"]), [data-split], .mosaic, .slices, [data-count]').forEach(function(el){
    if (!inHero(el)) io.observe(el);
  });

  /* ── MOSAIC ── */
  $$('.mosaic[data-src]').forEach(function(mos){
    var src = mos.dataset.src;
    $$('.tile', mos).forEach(function(t,i){
      var v = t.dataset.t.split(',').map(Number), x=v[0], y=v[1], w=v[2], h=v[3];
      t.style.left = x+'%'; t.style.top = y+'%'; t.style.width = 'calc('+w+'% - 6px)'; t.style.height = 'calc('+h+'% - 6px)';
      t.style.setProperty('--tx', ((x+w/2-50)*1.6)+'px');
      t.style.setProperty('--ty', ((y+h/2-50)*1.6)+'px');
      t.style.setProperty('--d', (i*.06)+'s');
      var img = new Image(); img.src = src; img.alt = ''; img.loading = 'lazy';
      img.style.width = (100/w*100)+'%'; img.style.height = (100/h*100)+'%';
      img.style.left = (-x/w*100)+'%'; img.style.top = (-y/h*100)+'%';
      t.appendChild(img);
    });
  });

  /* ── ACCORDIONS (.mv-tab) ── */
  $$('.mv-tab button').forEach(function(b){
    b.addEventListener('click', function(){
      var tab = b.parentNode, group = tab.parentNode, was = tab.classList.contains('open');
      $$('.mv-tab', group).forEach(function(x){ x.classList.remove('open'); });
      if (!was) tab.classList.add('open');
    });
  });

  /* ── TESTIMONIALS ── */
  var track = $('#tTrack');
  if (track){
    var cards = track.children, dots = $('#tDots'), idx = 0, timer;
    var perView = function(){ return innerWidth <= 760 ? 1 : innerWidth <= 1180 ? 2 : 3; };
    var maxIdx = function(){ return Math.max(0, cards.length - perView()); };
    var buildDots = function(){
      dots.innerHTML = '';
      for (var i=0;i<=maxIdx();i++){ var b = document.createElement('button'); b.setAttribute('aria-label','Testimonio '+(i+1)); (function(n){ b.onclick = function(){ go(n); }; })(i); dots.appendChild(b); }
      dots.style.display = maxIdx() === 0 ? 'none' : '';
    };
    var go = function(n){
      var mx = maxIdx(); idx = n < 0 ? mx : n > mx ? 0 : n;
      var w = cards[0].getBoundingClientRect().width + 22;
      track.style.transform = 'translateX(' + (-idx*w) + 'px)';
      [].forEach.call(dots.children, function(d,i){ d.classList.toggle('on', i===idx); });
      clearInterval(timer); timer = setInterval(function(){ go(idx+1); }, 6000);
    };
    $('#tPrev').onclick = function(){ go(idx-1); };
    $('#tNext').onclick = function(){ go(idx+1); };
    buildDots(); go(0);
    var rT; addEventListener('resize', function(){ clearTimeout(rT); rT = setTimeout(function(){ buildDots(); go(Math.min(idx, maxIdx())); }, 150); });
  }

  /* ── CARD SPOTLIGHT ── */
  $$('.idx-card').forEach(function(c){
    c.addEventListener('pointermove', function(e){
      var b = c.getBoundingClientRect();
      c.style.setProperty('--mx', (e.clientX-b.left)+'px'); c.style.setProperty('--my', (e.clientY-b.top)+'px');
    });
  });

  /* ── NUMBERED TILES: one active at a time ── */
  $$('.why-tiles').forEach(function(group){
    var tiles = $$('.why-tile', group);
    tiles.forEach(function(t){ t.addEventListener('mouseenter', function(){ tiles.forEach(function(x){ x.classList.remove('on'); }); t.classList.add('on'); }); });
  });

  var rz; addEventListener('resize', function(){ clearTimeout(rz); rz = setTimeout(fit, 120); });

  if (reduce) { addEventListener('scroll', onScrollHeader, {passive:true}); onScrollHeader(); return; }

  /* ── MAGNETIC BUTTONS + HERO DEPTH ── */
  if (matchMedia('(hover:hover)').matches){
    $$('.mag').forEach(function(b){
      b.addEventListener('pointermove', function(e){
        var r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + ((e.clientX - r.left - r.width/2)*.18) + 'px,' + ((e.clientY - r.top - r.height/2)*.3) + 'px)';
      });
      b.addEventListener('pointerleave', function(){ b.style.transform = ''; });
    });
    $$('.hero, .phero').forEach(function(hero){
      var layers = $$('[data-depth]', hero);
      if (!layers.length) return;
      hero.addEventListener('pointermove', function(e){
        var cx = e.clientX/innerWidth - .5, cy = e.clientY/innerHeight - .5;
        layers.forEach(function(l){ var dp = +l.dataset.depth; l.style.translate = (cx*dp)+'px '+(cy*dp)+'px'; });
      });
    });
  }

  /* ── SCROLL-DRIVEN: parallax + process line ── */
  var par = $$('[data-speed]');
  var procT = $('#procTrack'), procL = $('#procLine'), steps = procT ? $$('.step', procT) : [];
  var ticking = false;
  function onScroll(){
    onScrollHeader();
    if (ticking) return; ticking = true;
    requestAnimationFrame(function(){
      var vh = innerHeight;
      par.forEach(function(el){
        var host = el.parentElement.getBoundingClientRect();
        if (host.bottom < -200 || host.top > vh + 200) return;
        var c = host.top + host.height/2 - vh/2;
        el.style.translate = '0 ' + (c * -(+el.dataset.speed)) + 'px';
      });
      if (procT){
        var b = procT.getBoundingClientRect();
        var p = Math.min(Math.max((vh*.75 - b.top)/(b.height + vh*.2), 0), 1);
        procL.style.setProperty('--p', p);
        var mobile = innerWidth <= 1180;
        steps.forEach(function(s,i){
          s.classList.toggle('lit', mobile ? s.getBoundingClientRect().top < vh*.7 : p >= i/(steps.length-1)*.92);
        });
      }
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();
