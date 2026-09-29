/* ===== BOOQ v2 ===== */
(function(){
  'use strict';

  /* mobile nav */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if(burger && nav){
    burger.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded','false');
      });
    });
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

  /* play videos only when visible (saves data / battery) */
  var vids = Array.prototype.slice.call(document.querySelectorAll('video'));
  function tryPlay(v){ var p=v.play(); if(p&&p.catch){ p.catch(function(){}); } }
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
})();
