const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const source = process.argv[2];
const snapshot = path.join(__dirname, 'design-tokens.json');
if (source) {
  const web = JSON.parse(fs.readFileSync(path.join(source, 'tokens/web.json'))).web;
  const radius = JSON.parse(fs.readFileSync(path.join(source, 'tokens/radius.json'))).radius;
  fs.writeFileSync(snapshot, JSON.stringify({light:web.light, radius}, null, 2) + '\n');
}
const tokens = JSON.parse(fs.readFileSync(snapshot));
const c = Object.fromEntries(Object.entries(tokens.light).map(([k,v])=>[k,v.value]));
const r = k => parseFloat(tokens.radius[k].value);
const esc = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;');
const text = (x,y,s,size=16,color=c.ink,weight=400) => `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}">${esc(s)}</text>`;
const rect = (x,y,w,h,fill=c.surface,radius=r('xl'),stroke=c.line) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}"/>`;
const pill = (x,y,w,label) => rect(x,y,w,30,c.accentSoft,15,'none') + text(x+14,y+20,label,12,c.accent,600);
const start = (h,title) => `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="${h}" viewBox="0 0 960 ${h}" role="img" aria-labelledby="title"><title id="title">${title}</title><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="${c.line}"/></pattern></defs><g font-family="Segoe UI, Microsoft YaHei, Arial, sans-serif">`;
const save = (name,s) => fs.writeFileSync(path.join(root,'assets',name),s+'</g></svg>\n');
let s=start(228,'trevv — 做些有用的小东西');
s+=rect(.5,.5,959,227,c.canvas,r('2xl'));
s+=text(40,104,'trevv',60,c.ink,650)+text(42,151,'做些有用的小东西。',22,c.muted);
s+=rect(720,38,198,152,c.surface,r('xl'));
for(let i=0;i<3;i++)s+=rect(742+i*52,62,42,42,[c.accent,c.accentSoft,c.successSoft][i],12,'none');
s+=rect(742,122,154,12,c.inset,6,'none')+rect(742,148,98,12,c.accentSoft,6,'none');
save('profile-minimal.svg',s);
console.log('Built minimal light profile.');
