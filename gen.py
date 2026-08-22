import json,os,html,sys
OUT="/private/tmp/claude-501/-Users-kissheaven99gmail-com-Documents-Projects---------------/19e1ff42-17c3-43be-96e0-e51785d744fa/scratchpad"
BUUQ="/Users/kissheaven99gmail.com/Documents/Projects/Сайт портфолио/buuq-page"
exported=set(os.path.splitext(f)[0] for f in os.listdir(BUUQ+"/assets/img") if f.endswith('.png'))
d=json.load(open(OUT+"/frame10.json")); n=d["nodes"]["31:561"]["document"]; R=n["absoluteBoundingBox"]; RX,RY=R["x"],R["y"]
FONT={'Almarai':"'Almarai',sans-serif",'Alexandria':"'Alexandria',sans-serif",'Syne':"'Syne',sans-serif",
 'Unbounded':"'Unbounded',sans-serif",'Roboto Flex':"'Roboto Flex','Roboto',sans-serif",
 'Apple Braille':"'Inter',sans-serif",'Khmer Sangam MN':"'Inter',sans-serif"}
TILT={'31:660','31:657','29:506'}
SKIP={'31:664','46:72','46:50','46:63','36:6','46:79'}   # чёрный квадрат + кейс-обложки (кейсы верстаю отдельно)
SHADOWRECT={'31:642','61:143','31:658','31:659'}        # серые блоки-подложки → убрать
SOFT="box-shadow:0 26px 55px rgba(20,30,50,.13);"
def col(c,o=1):
    if not c: return None
    return f"rgba({round(c['r']*255)},{round(c['g']*255)},{round(c['b']*255)},{round(c.get('a',1)*o,3)})"
def solid_fill(node):
    for f in node.get('fills',[]) or []:
        if f.get('visible',True) and f.get('type')=='SOLID': return col(f.get('color'),f.get('opacity',1))
    return None
def stroke_col(node):
    for s in node.get('strokes',[]) or []:
        if s.get('type')=='SOLID': return col(s.get('color'),s.get('opacity',1))
    return None
def has_img_fill(node): return any(f.get('type')=='IMAGE' for f in node.get('fills',[]) or [])
def shadow(node):
    parts=[]
    for e in node.get('effects',[]) or []:
        if e.get('type')=='DROP_SHADOW' and e.get('visible',True):
            o=e.get('offset',{}); parts.append(f"{o.get('x',0):.0f}px {o.get('y',0):.0f}px {e.get('radius',0):.0f}px {col(e.get('color'))}")
    return ("box-shadow:"+", ".join(parts)+";") if parts else ""

def build(Y0,Y1,yoff,use_tilt,use_skip,use_iconband,outfile):
    out=[]
    def in_iconband(x,y,w): return use_iconband and (812<=y<=846) and (x<505) and (w<=40)
    def emit(node):
        if node.get('visible',True) is False: return
        nid=node['id']; t=node.get('type'); bb=node.get('absoluteBoundingBox'); idsafe=nid.replace(':','_')
        if use_skip and (nid in SKIP or nid in SHADOWRECT): return
        if t in ('GROUP','FRAME','INSTANCE','COMPONENT'):
            for c in node.get('children',[]) or []: emit(c)
            return
        if not bb: return
        yb=bb['y']-RY
        if not (Y0<=yb<=Y1): return
        x=bb['x']-RX; y=yb-yoff; w=bb['width']; h=bb['height']
        if in_iconband(x,yb,w): return
        style=f"position:absolute;left:{x:.1f}px;top:{y:.1f}px;"
        if t=='TEXT':
            st=node.get('style',{}); fam=FONT.get(st.get('fontFamily'),"'Inter',sans-serif")
            fs=st.get('fontSize',14); fw=st.get('fontWeight',400); ls=st.get('letterSpacing',0); lh=st.get('lineHeightPx')
            color=solid_fill(node) or 'rgba(15,15,15,1)'
            align={'LEFT':'left','CENTER':'center','RIGHT':'right','JUSTIFIED':'justify'}.get(st.get('textAlignHorizontal','LEFT'),'left')
            style+=f"width:{w:.1f}px;font-family:{fam};font-size:{fs:.2f}px;font-weight:{fw};color:{color};letter-spacing:{ls:.2f}px;text-align:{align};line-height:{(str(round(lh,1))+'px') if lh else 'normal'};white-space:pre-wrap;"
            out.append(f'<div id="n{idsafe}" class="t" style="{style}">{html.escape(node.get("characters","") or "")}</div>'); return
        if idsafe in exported and (has_img_fill(node) or t in ('RECTANGLE','VECTOR')):
            cls="tilt-img" if (use_tilt and nid in TILT) else ""
            rad=node.get('cornerRadius'); style+=f"width:{w:.1f}px;height:{h:.1f}px;object-fit:cover;"
            if rad: style+=f"border-radius:{rad}px;"
            style+= SOFT if (w>140 and h>90) else shadow(node)   # все скриншоты — мягкая размытая тень
            out.append(f'<img id="n{idsafe}" class="{cls}" src="assets/img/{idsafe}.png" style="{style}">'); return
        if t=='ELLIPSE':
            fill=solid_fill(node) or 'rgba(56,138,254,1)'
            style+=f"width:{w:.1f}px;height:{h:.1f}px;border-radius:50%;background:{fill};"
            out.append(f'<div style="{style}"></div>'); return
        if t=='LINE':
            c=stroke_col(node) or 'rgba(206,208,214,1)'; sw=node.get('strokeWeight',1)
            style+=f"width:{max(w,1):.1f}px;height:{max(h,sw):.1f}px;background:{c};"
            out.append(f'<div style="{style}"></div>'); return
        if t=='RECTANGLE':
            if has_img_fill(node) and idsafe not in exported: return
            fill=solid_fill(node); rad=node.get('cornerRadius'); rr=node.get('rectangleCornerRadii')
            style+=f"width:{w:.1f}px;height:{h:.1f}px;"
            if fill: style+=f"background:{fill};"
            if rad: style+=f"border-radius:{rad}px;"
            elif rr: style+=f"border-radius:{rr[0]}px {rr[1]}px {rr[2]}px {rr[3]}px;"
            strokes=node.get('strokes',[])
            if strokes and strokes[0].get('type')=='SOLID': style+=f"border:{node.get('strokeWeight',1)}px solid {col(strokes[0]['color'])};box-sizing:border-box;"
            style+=shadow(node)
            if not fill and not strokes and not shadow(node): return
            out.append(f'<div id="n{idsafe}" style="{style}"></div>'); return
        if t=='VECTOR' and 'Arrow' in node.get('name',''):
            out.append(f'<div class="t" style="{style}width:{max(w,10):.0f}px;font-size:14px;color:inherit;">&#8594;</div>')
    for c in n.get('children',[]) or []: emit(c)
    open(BUUQ+"/"+outfile,"w").write("\n".join(out)); print(outfile,len(out))

build(-40,2356,0,True,True,True,"_body.html")
