import json,os,html
from PIL import Image as _PILImage
OUT="/private/tmp/claude-501/-Users-kissheaven99gmail-com-Documents-Projects---------------/19e1ff42-17c3-43be-96e0-e51785d744fa/scratchpad"
BUUQ="/Users/kissheaven99gmail.com/Documents/Projects/Сайт портфолио/buuq-page"
_cut={}
def is_cutout(idsafe):
    if idsafe in _cut: return _cut[idsafe]
    r=False
    try:
        im=_PILImage.open(BUUQ+"/assets/img/"+idsafe+".png").convert("RGBA")
        lo,hi=im.getchannel("A").getextrema(); r=(lo<235)   # есть прозрачные пиксели → вырезка
    except Exception: r=False
    _cut[idsafe]=r; return r
exported=set(os.path.splitext(f)[0] for f in os.listdir(BUUQ+"/assets/img") if f.endswith('.png'))
d=json.load(open(OUT+"/frame10_new.json")); n=d["nodes"]["31:561"]["document"]; R=n["absoluteBoundingBox"]; RX,RY=R["x"],R["y"]
FONT={'Almarai':"'Almarai',sans-serif",'Alexandria':"'Alexandria',sans-serif",'Syne':"'Syne',sans-serif",
 'Unbounded':"'Unbounded',sans-serif",'Roboto Flex':"'Roboto Flex','Roboto',sans-serif",
 'Apple Braille':"'Inter',sans-serif",'Khmer Sangam MN':"'Inter',sans-serif",
 'Good Vibes Pro':"'Good Vibes Pro','Caveat',cursive",'Montserrat':"'Montserrat',sans-serif"}
def col(c,o=1):
    if not c: return None
    return f"rgba({round(c['r']*255)},{round(c['g']*255)},{round(c['b']*255)},{round(c.get('a',1)*o,3)})"
def solid_fill(node):
    for f in node.get('fills',[]) or []:
        if f.get('visible',True) and f.get('type')=='SOLID': return col(f.get('color'),f.get('opacity',1))
    return None
def gradient_css(node):
    for f in node.get('fills',[]) or []:
        if f.get('visible',True) and str(f.get('type','')).startswith('GRADIENT'):
            st=f.get('gradientStops',[])
            if len(st)>=2:
                parts=[f"{col(s['color'])} {round(s['position']*100)}%" for s in st]
                return "linear-gradient(135deg,"+",".join(parts)+")"
    return None
def stroke_col(node):
    for s in node.get('strokes',[]) or []:
        if s.get('type')=='SOLID': return col(s.get('color'),s.get('opacity',1))
    return None
def has_img_fill(node): return any(f.get('type')=='IMAGE' for f in node.get('fills',[]) or [])
def layer_blur(node):
    for e in node.get('effects',[]) or []:
        if e.get('type')=='LAYER_BLUR' and e.get('visible',True):
            return e.get('radius',0)
    return 0
def is_grey_shadow(node):
    if node.get('type')!='RECTANGLE' or has_img_fill(node) or node.get('strokes'): return False
    bb=node.get('absoluteBoundingBox') or {}
    if bb.get('width',0)<200: return False
    if not node.get('cornerRadius'): return False
    for f in node.get('fills',[]) or []:
        if f.get('type')=='SOLID':
            c=f['color']
            if 0.70<c['r']<0.88 and abs(c['r']-c['g'])<0.05 and abs(c['g']-c['b'])<0.05: return True
    return False
SOFT="box-shadow:0 26px 55px rgba(20,30,50,.13);"
NO_SHADOW={'117:576'}  # видео Emotion — в Figma без тени
out=[]
def text_html(node):
    st=node.get('style',{}); base_fam=FONT.get(st.get('fontFamily'),"'Inter',sans-serif")
    chars=(node.get('characters','') or '').replace(chr(0x2028),chr(10)).replace(chr(0x2029),chr(10)).replace('Ihrem Unternehmen','Ihrem'+chr(10)+'Unternehmen').replace('Unternehmen passen','Unternehmen'+chr(10)+'passen')
    cso=node.get('characterStyleOverrides') or []; tbl=node.get('styleOverrideTable') or {}
    if not cso or not tbl:
        return html.escape(chars)
    # split into runs by style id
    runs=[]; cid=object(); cur=''
    for i,ch in enumerate(chars):
        sid=cso[i] if i<len(cso) else 0
        if sid!=cid:
            if cur: runs.append((cid,cur))
            cid=sid; cur=ch
        else: cur+=ch
    if cur: runs.append((cid,cur))
    parts=[]
    for sid,txt in runs:
        ov=tbl.get(str(sid)) if (sid and str(sid) in tbl) else None
        esc=html.escape(txt)
        if ov:
            fam=FONT.get(ov.get('fontFamily'),base_fam); s=f"font-family:{fam};"
            if ov.get('fontSize'):
                sz=ov['fontSize']*1.0   # скрипт уже, чтобы перенос как в Figma
                s+=f"font-size:{sz:.2f}px;"
            if ov.get('italic'): s+="font-style:italic;"
            parts.append(f'<span style="{s}position:relative;top:0.08em;">{esc}</span>')
        else:
            parts.append(esc)
    return "".join(parts)

def emit(node):
    if node.get('visible',True) is False: return
    nid=node['id']; t=node.get('type'); bb=node.get('absoluteBoundingBox'); idsafe=nid.replace(':','_')
    if nid in ('46:87','46:88'): return  # серый скроллбар под кейсами
    if bb and 3165<=(bb['y']-RY)<=3212 and (bb['x']-RX)<1360: return  # ряд логотипов вставляю строкой отдельно
    if t in ('GROUP','FRAME','INSTANCE','COMPONENT'):
        for c in node.get('children',[]) or []: emit(c)
        return
    if not bb: return
    x=bb['x']-RX; y=bb['y']-RY; w=bb['width']; h=bb['height']
    style=f"position:absolute;left:{x:.1f}px;top:{y:.1f}px;"
    if t=='TEXT':
        st=node.get('style',{}); fam=FONT.get(st.get('fontFamily'),"'Inter',sans-serif")
        fs=st.get('fontSize',14); fw=st.get('fontWeight',400); ls=st.get('letterSpacing',0); lh=st.get('lineHeightPx')
        color=solid_fill(node) or 'rgba(15,15,15,1)'
        align={'LEFT':'left','CENTER':'center','RIGHT':'right','JUSTIFIED':'justify'}.get(st.get('textAlignHorizontal','LEFT'),'left')
        core=(node.get('characters','') or '').rstrip()
        ws='pre' if (chr(0x2028) in core or chr(0x2029) in core or chr(10) in core) else 'pre-wrap'
        style+=f"width:{w:.1f}px;font-family:{fam};font-size:{fs:.2f}px;font-weight:{fw};color:{color};letter-spacing:{ls:.2f}px;text-align:{align};line-height:{(str(round(lh,1))+'px') if lh else 'normal'};white-space:{ws};"
        out.append(f'<div id="n{idsafe}" class="t" style="{style}">{text_html(node)}</div>'); return
    if idsafe in exported and (has_img_fill(node) or t in ('RECTANGLE','VECTOR')):
        if 2600<=y<=3145 and 400<x<1375: return  # битые кейс-обложки — карточки вставляю отдельно
        cls=""
        if 2015<=y<=2769: cls="tilt-img"        # блок «Wie Sie auftreten» — 3D-наклон
        rad=node.get('cornerRadius'); fitv='contain' if 3150<=y<=3215 else 'cover'; style+=f"width:{w:.1f}px;height:{h:.1f}px;object-fit:{fitv};"
        if rad: style+=f"border-radius:{rad}px;"
        style+= SOFT if (w>140 and h>90 and not is_cutout(idsafe) and nid not in NO_SHADOW) else ""
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
        if is_grey_shadow(node):
            style+=f"width:{w:.1f}px;height:{h:.1f}px;background:{solid_fill(node)};border-radius:{node.get('cornerRadius',0)}px;filter:blur(22px);opacity:.5;"
            out.append(f'<div style="{style}"></div>'); return
        fill=solid_fill(node) or gradient_css(node); rad=node.get('cornerRadius'); rr=node.get('rectangleCornerRadii')
        style+=f"width:{w:.1f}px;height:{h:.1f}px;"
        if fill: style+=f"background:{fill};"
        if rad: style+=f"border-radius:{rad}px;"
        elif rr: style+=f"border-radius:{rr[0]}px {rr[1]}px {rr[2]}px {rr[3]}px;"
        strokes=node.get('strokes',[])
        if strokes and strokes[0].get('type')=='SOLID': style+=f"border:{node.get('strokeWeight',1)}px solid {col(strokes[0]['color'])};box-sizing:border-box;"
        lb=layer_blur(node)
        if lb: style+=f"filter:blur({lb*0.5:.0f}px);"
        if not fill and not strokes and not lb: return
        out.append(f'<div id="n{idsafe}" style="{style}"></div>'); return
    if t=='VECTOR' and idsafe in exported:
        out.append(f'<img src="assets/img/{idsafe}.png" style="{style}width:{w:.1f}px;height:{h:.1f}px;">'); return
    # вектора-стрелки пропускаем — стрелку добавляет JS сразу после текста
    return

for c in n.get('children',[]) or []: emit(c)
open(BUUQ+"/_body.html","w").write("\n".join(out))
print("элементов:",len(out),"| высота кадра:",round(R['height']))
