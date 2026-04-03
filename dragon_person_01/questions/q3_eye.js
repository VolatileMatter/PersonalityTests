// questions/q3_eye.js

export const meta = {
  id:     'eye',
  prompt: 'Which of these describes you best?',
};

const OPTIONS = [
  {
    value: 'passionate',   style: 'pink_purple_swirl',
    label: 'Passionate about silly things',
    sub:   'You will die on this hill. It is a very small hill.',
    description: 'Your eyes swirl pink and purple — burning bright for things others find ridiculous, and completely unapologetic about it.',
  },
  {
    value: 'loyal',        style: 'gold_white_swirl',
    label: 'Loyal to a fault',
    sub:   "You have forgiven things you probably shouldn't have.",
    description: 'Gold and white spiral through your eyes — the mark of someone who stays, sometimes past the point of wisdom.',
  },
  {
    value: 'brave',        style: 'green_gold_split',
    label: 'Brave',
    sub:   'Not fearless. You just go anyway.',
    description: 'Your eyes are split green and gold — the colors of a dragon who is afraid and does it anyway.',
  },
  {
    value: 'quiet_lover',  style: 'purple_blue_blob',
    label: 'Quiet, but love passionately',
    sub:   'Depth over volume, always.',
    description: 'Deep purple and blue bloom in your eyes — still on the surface, and fathomless underneath.',
  },
  {
    value: 'silly',        style: 'rainbow_swirl',
    label: 'Silly',
    sub:   'Deeply, committedly, magnificently silly.',
    description: 'Your eyes hold every color at once — a dragon who refuses to pick just one tone and stick to it.',
  },
  {
    value: 'wizard',       style: 'cyan_blue_space',
    label: 'Problem-solving wizard',
    sub:   'You see the solution before anyone else sees the problem.',
    description: 'Cyan and deep blue with gold sparks — eyes that are always running three steps ahead of the conversation.',
  },
  {
    value: 'misunderstood', style: 'black_purple_stripes',
    label: 'Misunderstood artist',
    sub:   "They just don't get it yet.",
    description: 'Black streaked with deep purple — your eyes hold entire worlds that you have given up trying to explain.',
  },
  {
    value: 'understood',   style: 'pink_purple_hearts',
    label: 'Perfectly understood artist',
    sub:   "They get it. You're just that good.",
    description: 'Soft pink and purple hearts — your eyes are exactly as open as they look, and people love you for it.',
  },
];

// ── Mini eye preview renderer ─────────────────────────────────
function drawEyePreview(canvas, style) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const cx = W/2, cy = H/2, r = Math.min(W,H)/2 - 1;
  ctx.clearRect(0,0,W,H);
  ctx.save();
  ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.clip();

  switch(style) {
    case 'pink_purple_swirl': {
      const g=ctx.createRadialGradient(cx,cy,0,cx,cy,r);
      g.addColorStop(0,'#ff80c0'); g.addColorStop(0.5,'#c050c0'); g.addColorStop(1,'#6020a0');
      ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
      ctx.strokeStyle='rgba(255,200,255,0.5)'; ctx.lineWidth=1.5;
      for(let i=0;i<4;i++){
        ctx.beginPath();
        for(let a=0;a<Math.PI*4;a+=0.1){
          const rad=(a/(Math.PI*4))*r*0.9;
          const px=cx+Math.cos(a+i*1.5)*rad, py=cy+Math.sin(a+i*1.5)*rad;
          a<0.1?ctx.moveTo(px,py):ctx.lineTo(px,py);
        }
        ctx.stroke();
      }
      break;
    }
    case 'gold_white_swirl': {
      const g=ctx.createRadialGradient(cx,cy,0,cx,cy,r);
      g.addColorStop(0,'#fff8e0'); g.addColorStop(0.5,'#c9a84c'); g.addColorStop(1,'#7a5010');
      ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
      ctx.strokeStyle='rgba(255,255,220,0.6)'; ctx.lineWidth=1.5;
      for(let i=0;i<4;i++){
        ctx.beginPath();
        for(let a=0;a<Math.PI*4;a+=0.1){
          const rad=(a/(Math.PI*4))*r*0.9;
          const px=cx+Math.cos(a+i*1.5)*rad, py=cy+Math.sin(a+i*1.5)*rad;
          a<0.1?ctx.moveTo(px,py):ctx.lineTo(px,py);
        }
        ctx.stroke();
      }
      break;
    }
    case 'green_gold_split': {
      const gl=ctx.createLinearGradient(0,0,W,0);
      gl.addColorStop(0,'#1a7a30'); gl.addColorStop(0.48,'#1a9a40');
      gl.addColorStop(0.52,'#c9a84c'); gl.addColorStop(1,'#8a6010');
      ctx.fillStyle=gl; ctx.fillRect(0,0,W,H);
      ctx.strokeStyle='rgba(255,255,200,0.4)'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(cx,0); ctx.lineTo(cx,H); ctx.stroke();
      break;
    }
    case 'purple_blue_blob': {
      ctx.fillStyle='#0a0520'; ctx.fillRect(0,0,W,H);
      [[cx-5,cy-4,'#4020a0'],[cx+4,cy+3,'#1040c0'],[cx,cy,'#6030b0']].forEach(([bx,by,c])=>{
        const bg=ctx.createRadialGradient(bx,by,0,bx,by,r*0.7);
        bg.addColorStop(0,c+'cc'); bg.addColorStop(1,'transparent');
        ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
      });
      break;
    }
    case 'rainbow_swirl': {
      for(let i=0;i<360;i+=3){
        ctx.beginPath(); ctx.moveTo(cx,cy);
        ctx.arc(cx,cy,r,i*Math.PI/180,(i+3)*Math.PI/180); ctx.closePath();
        ctx.fillStyle=`hsl(${i},100%,55%)`; ctx.fill();
      }
      ctx.strokeStyle='rgba(255,255,255,0.4)'; ctx.lineWidth=1.2;
      for(let i=0;i<3;i++){
        ctx.beginPath();
        for(let a=0;a<Math.PI*3;a+=0.08){
          const rad=(a/(Math.PI*3))*r*0.85;
          const px=cx+Math.cos(a+i*2.1)*rad, py=cy+Math.sin(a+i*2.1)*rad;
          a<0.08?ctx.moveTo(px,py):ctx.lineTo(px,py);
        }
        ctx.stroke();
      }
      break;
    }
    case 'cyan_blue_space': {
      ctx.fillStyle='#000820'; ctx.fillRect(0,0,W,H);
      [[cx-4,cy-4,'#00c0d0'],[cx+5,cy+3,'#0040c0']].forEach(([bx,by,c])=>{
        const bg=ctx.createRadialGradient(bx,by,0,bx,by,r*0.65);
        bg.addColorStop(0,c+'bb'); bg.addColorStop(1,'transparent');
        ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
      });
      // sparkles (fixed positions for thumbnail)
      ctx.fillStyle='#ffd700';
      [[W*0.2,H*0.3],[W*0.7,H*0.2],[W*0.5,H*0.7],[W*0.8,H*0.6],[W*0.3,H*0.8]].forEach(([sx,sy])=>{
        ctx.beginPath(); ctx.arc(sx,sy,0.8,0,Math.PI*2); ctx.fill();
      });
      break;
    }
    case 'black_purple_stripes': {
      ctx.fillStyle='#080510'; ctx.fillRect(0,0,W,H);
      ctx.strokeStyle='#3a1060'; ctx.lineWidth=3;
      for(let i=-W;i<W*2;i+=6){
        ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i+H,H); ctx.stroke();
      }
      break;
    }
    case 'pink_purple_hearts': {
      const g=ctx.createRadialGradient(cx,cy,0,cx,cy,r);
      g.addColorStop(0,'#ffb0d0'); g.addColorStop(1,'#c060a0');
      ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
      ctx.fillStyle='rgba(160,40,120,0.5)';
      [[cx-7,cy-5],[cx+6,cy+4],[cx-2,cy+8]].forEach(([hx,hy])=>{
        const s=3;
        ctx.beginPath();
        ctx.moveTo(hx,hy+s*0.5);
        ctx.bezierCurveTo(hx,hy-s*0.3,hx-s*1.2,hy-s*0.8,hx-s*1.2,hy);
        ctx.bezierCurveTo(hx-s*1.2,hy+s*0.8,hx,hy+s*1.2,hx,hy+s*1.5);
        ctx.bezierCurveTo(hx,hy+s*1.2,hx+s*1.2,hy+s*0.8,hx+s*1.2,hy);
        ctx.bezierCurveTo(hx+s*1.2,hy-s*0.8,hx,hy-s*0.3,hx,hy+s*0.5);
        ctx.fill();
      });
      break;
    }
  }
  ctx.restore();
  // iris ring + pupil
  ctx.beginPath(); ctx.arc(cx,cy,r*0.35,0,Math.PI*2);
  ctx.strokeStyle='rgba(0,0,0,0.6)'; ctx.lineWidth=1.5; ctx.stroke();
  ctx.beginPath(); ctx.arc(cx,cy,r*0.18,0,Math.PI*2);
  ctx.fillStyle='rgba(0,0,0,0.8)'; ctx.fill();
}

export function render(container, onAnswer) {
  const style = document.createElement('style');
  style.textContent = `
    .eye-list { display: flex; flex-direction: column; gap: 0.5rem; }
    .eye-card {
      padding: 0.85rem 1.2rem;
      display: flex; align-items: center; gap: 1rem;
    }
    .eye-thumb-wrap {
      width: 38px; height: 38px; border-radius: 50%; overflow: hidden;
      border: 1px solid var(--border-bright); background: #111; flex-shrink: 0;
    }
    .eye-opt-key {
      font-family: 'Cinzel Decorative', serif; font-size: 0.58rem;
      color: var(--gold-dim); letter-spacing: 0.1em;
      width: 1.4rem; text-align: right; flex-shrink: 0;
      transition: color 0.2s;
    }
    .eye-card.selected .eye-opt-key { color: var(--gold); }
    .eye-opt-label { font-size: 1rem; line-height: 1.3; }
    .eye-opt-sub   { font-size: 0.76rem; color: var(--text-dim); font-style: italic; margin-top: 0.1rem; }
  `;
  container.appendChild(style);

  const list = document.createElement('div');
  list.className = 'eye-list';

  OPTIONS.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-card eye-card';

    const thumbWrap = document.createElement('div');
    thumbWrap.className = 'eye-thumb-wrap';
    const thumbCanvas = document.createElement('canvas');
    thumbCanvas.width = 38; thumbCanvas.height = 38;
    thumbCanvas.style.cssText = 'width:38px;height:38px;display:block;';
    thumbWrap.appendChild(thumbCanvas);

    const textWrap = document.createElement('span');
    textWrap.innerHTML = `
      <div class="eye-opt-label">${opt.label}</div>
      <div class="eye-opt-sub">${opt.sub}</div>
    `;

    const keySpan = document.createElement('span');
    keySpan.className = 'eye-opt-key';
    keySpan.textContent = String.fromCharCode(65 + i);

    btn.appendChild(keySpan);
    btn.appendChild(thumbWrap);
    btn.appendChild(textWrap);

    requestAnimationFrame(() => drawEyePreview(thumbCanvas, opt.style));

    btn.addEventListener('click', () => {
      list.querySelectorAll('.eye-card').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      setTimeout(() => onAnswer({
        eyeStyle:      opt.style,
        eyeStyleValue: opt.value,
        description:   opt.description,
      }), 160);
    });
    list.appendChild(btn);
  });

  container.appendChild(list);
}
