/* ===== BOOQ v2 ===== */
(function(){
  'use strict';

  /* mobile nav */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  var navClose = document.getElementById('navClose');
  if(burger && nav){
    function closeNav(){ nav.classList.remove('open'); burger.setAttribute('aria-expanded','false'); }
    function openNav(){ nav.classList.add('open'); burger.setAttribute('aria-expanded','true'); }
    burger.addEventListener('click', function(){
      if(nav.classList.contains('open')) closeNav(); else openNav();
    });
    if(navClose){ navClose.addEventListener('click', closeNav); }
    nav.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeNav(); });
  }

  /* cookie banner (technical-only notice) */
  try{
    var CK='booq_cookie_ok';
    var box=document.getElementById('cookie');
    if(box){
      if(!localStorage.getItem(CK)){ box.hidden=false; }
      var ok=document.getElementById('ck-ok');
      if(ok){ ok.addEventListener('click', function(){
        try{ localStorage.setItem(CK,'1'); }catch(e){}
        box.hidden=true;
      }); }
    }
  }catch(e){}

  /* videos */
  var vids = Array.prototype.slice.call(document.querySelectorAll('video'));
  function tryPlay(v){ var p=v.play(); if(p&&p.catch){ p.catch(function(){}); } }

  /* play only when visible (saves data / battery) — keeps sound state */
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        var v=en.target;
        if(en.isIntersecting){ if(v.preload==='none'){v.preload='auto';} tryPlay(v); }
        else { v.pause(); }
      });
    },{threshold:0.25});
    vids.forEach(function(v){ io.observe(v); });
  } else {
    vids.forEach(function(v){ v.preload='auto'; tryPlay(v); });
  }

  /* sound toggle via the wave button */
  var waves = Array.prototype.slice.call(document.querySelectorAll('.wave'));
  waves.forEach(function(btn){
    btn.addEventListener('click', function(ev){
      ev.preventDefault(); ev.stopPropagation();
      var media = btn.parentNode;
      var v = media ? media.querySelector('video') : null;
      if(!v) return;
      var turnOn = v.muted;
      if(turnOn){
        /* solo: mute every other video first */
        vids.forEach(function(o){
          if(o!==v){ o.muted=true; }
        });
        waves.forEach(function(w){ if(w!==btn){ w.classList.remove('on'); w.setAttribute('aria-pressed','false'); w.setAttribute('aria-label','Ton einschalten'); } });
        v.muted=false; v.volume=1;
        if(v.preload==='none'){ v.preload='auto'; }
        tryPlay(v);
        btn.classList.add('on'); btn.setAttribute('aria-pressed','true'); btn.setAttribute('aria-label','Ton ausschalten');
      } else {
        v.muted=true;
        btn.classList.remove('on'); btn.setAttribute('aria-pressed','false'); btn.setAttribute('aria-label','Ton einschalten');
      }
    });
  });

  /* Logo-Icon dreht sich beim Scrollen wie ein Ladeindikator */
  var icons = Array.prototype.slice.call(document.querySelectorAll('.brand-ic svg'));
  if(icons.length){
    var ticking=false;
    function spin(){
      var deg = window.pageYOffset * 0.35;
      for(var i=0;i<icons.length;i++){ icons[i].style.transform='rotate('+deg+'deg)'; }
      ticking=false;
    }
    window.addEventListener('scroll', function(){
      if(!ticking){ window.requestAnimationFrame(spin); ticking=true; }
    }, {passive:true});
    spin();
  }
})();
