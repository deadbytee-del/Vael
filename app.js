function svg(p,w){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w||1.8}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`}
const ICONS={
chat:svg('<path d="M4 5h16v11H8l-4 4z"/>'),
help:svg('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1 1-1 1.7"/><path d="M12 17h.01"/>'),
idea:svg('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.9 1 .9 1.6V16h5.2v-.5c0-.6.4-1.2.9-1.6A6 6 0 0 0 12 3z"/>'),
trade:svg('<path d="M7 8l3-3 3 3M10 5v10M17 16l-3 3-3-3"/><path d="M14 19V9"/>'),
megaphone:svg('<path d="M3 10v4l4 1 9 4V5l-9 4z"/><path d="M8 15v4a2 2 0 0 0 4 0v-3"/>'),
shield:svg('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>'),
bug:svg('<rect x="8" y="8" width="8" height="12" rx="4"/><path d="M12 8V4M8 12H4M16 12h4M8.5 17L5 19M15.5 17l3.5 2M9 5l1.5 2M15 5l-1.5 2"/>'),
pin:svg('<path d="M12 2l3 3-1.5 5L19 15l-6 1-4 6-1-6-5-1 5-4.5L9.5 4z"/>'),
kick:svg('<path d="M15 3h4v4M19 3l-7 7"/><path d="M9 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"/>'),
check:svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
bell:svg('<path d="M6 8a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6z"/><path d="M9.5 17a2.5 2.5 0 0 0 5 0"/>'),
home:svg('<path d="M4 11l8-7 8 7"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/>'),
send:svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
reply:svg('<path d="M9 14l-5-5 5-5"/><path d="M4 9h9a6 6 0 0 1 6 6v2"/>'),
trash:svg('<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/>'),
flag:svg('<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>'),
smile:svg('<circle cx="12" cy="12" r="9"/><path d="M8.5 10h.01M15.5 10h.01"/><path d="M8.5 14.5c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8"/>'),
search:svg('<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>'),
gear:svg('<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7 7 0 0 0-2-1.2L14 3h-4l-.6 2.7a7 7 0 0 0-2 1.2l-2.3-1-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-1c.6.5 1.3.9 2 1.2L10 21h4l.6-2.7c.7-.3 1.4-.7 2-1.2l2.3 1 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z"/>'),
logout:svg('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>'),
link:svg('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'),
plus:svg('<path d="M12 5v14M5 12h14"/>'),
x:svg('<path d="M18 6L6 18M6 6l12 12"/>'),
copy:svg('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>'),
mail:svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'),
lock:svg('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
key:svg('<circle cx="8" cy="12" r="4"/><path d="M11 12h10M17 12v4M21 12v3"/>'),
back:svg('<path d="M15 6l-6 6 6 6"/>'),
menu:svg('<path d="M4 6h16M4 12h16M4 18h16"/>')
}
const state={puterUser:null,link:null,profile:{displayName:"",bio:""},avatar:null,channels:[],dms:[],status:{online:false,playerCount:0,maxPlayers:0,version:""},players:[],allMembers:[],staff:false,route:{name:"gate"},pollTimers:[],p2pActive:false}
const $=s=>document.querySelector(s)
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!==undefined)e.innerHTML=h;return e}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))
const app=$("#app")
function linkify(text){
let t=esc(text)
t=t.replace(/```([^`]+)```/g,(m,c)=>"<code>"+c.replace(/\n/g,"<br>")+"</code>")
t=t.replace(/`([^`]+)`/g,(m,c)=>"<code>"+c+"</code>")
t=t.replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>")
t=t.replace(/\*([^*]+)\*/g,"<i>$1</i>")
t=t.replace(/(https?:\/\/[^\s<]+)/g,url=>`<a href="${url}" target="_blank" rel="noopener">${url}</a>`)
t=t.replace(/(^|\s)@([a-zA-Z0-9_]{2,20})/g,(m,pre,name)=>{
const known=state.players.concat(state.dms.map(d=>({name:d})))
const hit=known.find(k=>k.name&&k.name.toLowerCase()===name.toLowerCase())
return pre+(hit?`<b style="color:#b9a4dc">@${name}</b>`:"@"+name)})
return t
}
function timeFmt(ts){return new Date(ts).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}
function dayFmt(ts){return new Date(ts).toLocaleDateString([],{weekday:"long",month:"long",day:"numeric"})}
function sameDay(a,b){const x=new Date(a),y=new Date(b);return x.toDateString()===y.toDateString()}
function toast(msg){
let t=$(".toast")
if(!t){t=el("div","toast");document.body.append(t)}
t.textContent=msg
t.classList.add("show")
clearTimeout(t._h)
t._h=setTimeout(()=>t.classList.remove("show"),2600)
}
function clearTimers(){state.pollTimers.forEach(clearInterval);state.pollTimers=[]}
async function boot(){
window.addEventListener("hashchange",render)
window.addEventListener("online",()=>{toast("Back online");flushOutbox()})
window.addEventListener("offline",()=>toast("You're offline. Messages will send once you're back."))
pruneLocalMessages(10).catch(()=>{})
await loadIdentity()
render()
}
async function loadIdentity(){
try{
state.puterUser=await puterUser()
if(state.puterUser){
state.link=await getLink()
state.profile=await getProfile()
state.avatar=await getAvatar()
state.passkeyRecord=await getPasskeyRecord()
state.passkeyRequired=await getSetting("require_passkey_unlock",false)
}
}catch(e){console.error(e)}
}
document.addEventListener("DOMContentLoaded",boot)
function render(){
if(!state.puterUser){clearTimers();app.innerHTML="";renderGateSignIn();return}
if(!DEFAULT_API_BASE){clearTimers();app.innerHTML="";renderGateNoServer();return}
if(!state.link){clearTimers();app.innerHTML="";renderGateLink();return}
if(state.passkeyRequired&&state.passkeyRecord&&!state.unlocked){clearTimers();app.innerHTML="";renderGateUnlock();return}
if(!state.shellBuilt){app.innerHTML="";buildShell();state.shellBuilt=true;startStatusPoll()}
renderMain()
}
function renderGateSignIn(){
const w=el("div","gate",`<div class="gatebox"><h1>Welcome to Vael</h1><p>VaelKits' own chat. Sign in with your Puter account to get started.</p><button class="btn pri" id="si">Sign in with Puter</button></div></div>`)
app.append(w)
$("#si").onclick=async()=>{
try{await puterSignIn();await loadIdentity();render()}
catch(e){toast("Sign-in was cancelled or failed")}}
}
function renderGateNoServer(){
app.append(el("div","gate",`<div class="gatebox"><h1>Not connected yet</h1><p>This copy of Vael has no VaelHook server configured. Set DEFAULT_API_BASE in config.js to your VaelHook address and redeploy.</p></div></div>`))
}
function renderGateUnlock(){
const w=el("div","gate",`<div class="gatebox"><div class="mark">${ICONS.lock}</div><h1>Unlock Vael</h1><p>Confirm it's you with the passkey you set up on this device.</p><button class="btn pri" id="unl">Unlock with passkey</button><p class="gerr hidden" id="uerr" style="margin-top:12px"></p></div></div>`)
app.append(w)
$("#unl").onclick=async()=>{
try{
const ok=await verifyPasskey(state.passkeyRecord)
if(!ok)throw new Error("bad_sig")
state.unlocked=true
render()
}catch(e){$("#uerr").textContent="That didn't check out. Try again.";$("#uerr").classList.remove("hidden")}}
}
function renderGateLink(){
const w=el("div","gate",`<div class="gatebox"><div class="mark">${ICONS.link}</div><h1>Link your Minecraft account</h1><p>Run <b style="color:#e8e3f0">/vaellink</b> in-game, then enter the code it gives you.</p><input id="code" maxlength="6" placeholder="CODE"><div class="gerr hidden" id="gerr"></div><button class="btn pri" id="go">Link account</button></div></div>`)
app.append(w)
const code=$("#code"),errEl=$("#gerr"),go=$("#go")
code.oninput=()=>{code.value=code.value.toUpperCase().replace(/[^A-Z0-9]/g,"");errEl.classList.add("hidden")}
async function submit(){
if(code.value.length<6)return
go.disabled=true;go.textContent="Linking..."
try{
const res=await redeemLink(code.value)
await saveLink({token:res.token,name:res.name,uuid:res.uuid})
state.link={token:res.token,name:res.name,uuid:res.uuid}
render()
}catch(e){
errEl.textContent=e.code==="invalid_or_expired_code"?"That code is wrong or expired. Run /vaellink again.":"Couldn't reach the server. Check your connection."
errEl.classList.remove("hidden")
go.disabled=false;go.textContent="Link account"
}}
go.onclick=submit
code.onkeydown=e=>{if(e.key==="Enter")submit()}
}
function currentRoute(){
const h=(location.hash.slice(1)||"").split("/").filter(Boolean)
if(h[0]==="home")return{name:"home"}
if(h[0]==="c"&&h[1])return{name:"channel",channel:h[1]}
if(h[0]==="dm"&&h[1])return{name:"dm",withName:h[1]}
if(h[0]==="settings")return{name:"settings",tab:h[1]||"profile"}
return{name:"home"}
}
function buildShell(){
app.append(el("div","shell",`
<div class="topbar">
<div class="tb-left"><span class="topbrand">Vael</span><span class="topstatus" id="topstatus"></span></div>
<div class="tb-search"><input id="searchbox" placeholder="Search messages" autocomplete="off">${ICONS.search}<div class="searchpanel hidden" id="searchpanel"></div></div>
<div class="tb-right">
<button class="topicon" id="notifbtn" title="Notifications">${ICONS.bell}<span class="nbadge hidden" id="nbadge">0</span><div class="notifpanel hidden" id="notifpanel"></div></button>
<div class="topprofile" id="topprofile"></div>
</div>
</div>
<div class="body3">
<button class="mobiletoggle" id="mobiletoggle">${ICONS.menu}</button>
<div class="sidebar" id="sidebar">
<div class="sidebar-scroll">
<div class="navlist" style="padding:12px 8px 4px"><a class="navitem" href="#/home" id="homelink">${ICONS.home}<span>Home</span></a></div>
<div id="channelgroups"></div>
<div class="navgroup"><div class="navgroup-head"><h4>Direct messages</h4><button class="addbtn" id="newdm">${ICONS.plus}</button></div><div class="navlist" id="dmnav"></div></div>
</div>
</div>
<div class="sidebar-scrim" id="scrim"></div>
<div class="main" id="main"></div>
<div class="rightbar" id="rightbar"></div>
</div>
`))
renderProfileButton()
$("#newdm").onclick=openDmPicker
$("#mobiletoggle").onclick=()=>{$("#sidebar").classList.toggle("open");$("#scrim").classList.toggle("show")}
$("#scrim").onclick=()=>{$("#sidebar").classList.remove("open");$("#scrim").classList.remove("show")}
wireSearch()
wireNotifs()
refreshChannelsAndDms()
}
function wireSearch(){
const input=$("#searchbox"),panel=$("#searchpanel")
let t=null
input.oninput=()=>{
clearTimeout(t)
t=setTimeout(async()=>{
const q=input.value.trim()
if(!q){panel.classList.add("hidden");return}
const results=await searchMessages(q)
panel.innerHTML=results.length?results.map(m=>{
const isDmc=m.channel.startsWith("dm-")
const label=isDmc?otherFromDm(m.channel,state.link.name):("#"+(CHANNEL_META[m.channel]?CHANNEL_META[m.channel].label:m.channel))
return `<div class="searchresult" data-channel="${esc(m.channel)}" data-dm="${isDmc?1:0}"><b>${esc(label)}</b><small>${esc(m.authorName)}: ${esc(m.content.slice(0,80))}</small></div>`
}).join(""):`<div class="searchempty">No messages match "${esc(q)}"</div>`
panel.classList.remove("hidden")
panel.querySelectorAll(".searchresult").forEach(r=>r.onclick=()=>{
panel.classList.add("hidden");input.value=""
location.hash=r.dataset.dm==="1"?"#/dm/"+r.dataset.channel.replace(/^dm-/,"").split("-").find(n=>n.toLowerCase()!==state.link.name.toLowerCase())||otherFromDm(r.dataset.channel,state.link.name):"#/c/"+r.dataset.channel
})
},220)}
document.addEventListener("pointerdown",e=>{if(!e.target.closest(".tb-search"))panel.classList.add("hidden")})
}
function wireNotifs(){
const btn=$("#notifbtn"),panel=$("#notifpanel")
refreshNotifBadge()
btn.onclick=async(e)=>{
e.stopPropagation()
panel.classList.toggle("hidden")
if(!panel.classList.contains("hidden")){
const list=await listNotifs()
panel.innerHTML=list.length?list.map(n=>`<a class="notifitem" href="${n.dm?"#/dm/"+n.from:"#/c/"+n.channel}"><b>${esc(n.from)}</b><small>${esc(n.preview)}</small><span class="ntime">${timeFmt(n.ts)}</span></a>`).join(""):`<div class="searchempty">You're all caught up.</div>`
await markNotifsRead()
refreshNotifBadge()
}}
document.addEventListener("pointerdown",e=>{if(!e.target.closest("#notifbtn"))panel.classList.add("hidden")})
}
async function refreshNotifBadge(){
const n=await unreadNotifCount()
const b=$("#nbadge")
if(!b)return
b.textContent=n>9?"9+":n
b.classList.toggle("hidden",n===0)
}
function renderProfileButton(){
const box=$("#topprofile")
box.innerHTML=`<button id="profbtn"><img src="${state.avatar||fallbackAvatar()}"><span>${esc(state.profile.displayName||state.link.name)}</span></button><div class="profmenu hidden" id="profmenu"><a href="#/settings">${ICONS.gear}Settings</a><button id="signoutbtn">${ICONS.logout}Sign out</button></div>`
$("#profbtn").onclick=e=>{e.stopPropagation();$("#profmenu").classList.toggle("hidden")}
$("#signoutbtn").onclick=async()=>{await puterSignOut();state.puterUser=null;state.shellBuilt=false;render()}
document.addEventListener("pointerdown",e=>{if(!e.target.closest(".topprofile"))$("#profmenu").classList.add("hidden")})
}
function iconBtn(name){return ICONS[name]}
function fallbackAvatar(){
return "data:image/svg+xml;utf8,"+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><rect width='40' height='40' fill='%233c2f51'/></svg>`).replace(/%25/g,"%")
}
async function refreshChannelsAndDms(){
try{
const[chans,dms,players,members]=await Promise.all([getChannels(),listDms(),getPlayers(),getMembers()])
state.channels=chans
state.dms=dms.map(id=>otherFromDm(id,state.link.name))
state.players=players
state.allMembers=members.map(m=>m.name)
state.staff=chans.some(c=>c.name==="staff")
cacheMembers(Array.from(new Set(members.map(m=>m.name).concat(state.dms))))
renderNav()
renderMembers()
renderHomeTiles()
if(state.route&&(state.route.name==="channel"||state.route.name==="dm")){
const ch=state.route.name==="dm"?store_dm_channel(state.route.withName):state.route.channel
getCachedMessages(ch,300).then(list=>renderMessages(list,ch))
}
}catch(e){}
}
function renderMembers(){
const box=$("#rightbar")
if(!box)return
const onlineNames=new Set(state.players.map(p=>p.name.toLowerCase()))
const offline=state.allMembers.filter(n=>!onlineNames.has(n.toLowerCase()))
const row=(name,uuid,online)=>`<div class="memberrow${online?"":" off"}"><img src="${mcHead(uuid||name)}"><span class="mdot${online?" on":""}"></span><span class="mname" data-profile="${esc(name)}">${esc(name)}</span></div>`
box.innerHTML=`<div class="rbgroup"><h4>Online — ${state.players.length}</h4>${state.players.map(p=>row(p.name,p.uuid,true)).join("")}</div><div class="rbgroup"><h4>Offline — ${offline.length}</h4>${offline.map(n=>row(n,null,false)).join("")}</div>`
box.querySelectorAll("[data-profile]").forEach(el=>el.onclick=()=>openProfilePopover(el.dataset.profile,el))
}
function otherFromDm(dmId,me){
const rest=dmId.replace(/^dm-/,"")
const low=me.toLowerCase()
if(rest.startsWith(low+"-"))return rest.slice(low.length+1)
return rest.slice(0,rest.length-low.length-1)
}
function renderNav(){
if($("#homelink"))$("#homelink").classList.toggle("on",state.route.name==="home")
const groups={}
state.channels.forEach(c=>{
const meta=CHANNEL_META[c.name]||{label:c.name,icon:"chat",group:"Other"}
;(groups[meta.group]=groups[meta.group]||[]).push({c,meta})
})
const order=CHANNEL_GROUP_ORDER.concat(Object.keys(groups).filter(g=>!CHANNEL_GROUP_ORDER.includes(g)))
$("#channelgroups").innerHTML=order.filter(g=>groups[g]).map(g=>`
<div class="navgroup"><div class="navgroup-head"><h4>${esc(g)}</h4></div><div class="navlist">${groups[g].map(({c,meta})=>{
const active=state.route.name==="channel"&&state.route.channel===c.name
return `<a class="navitem${active?" on":""}" href="#/c/${c.name}">${ICONS[meta.icon]||ICONS.chat}<span>${esc(meta.label)}</span>${c.name==="staff"?`<span class="lock">${ICONS.lock}</span>`:""}</a>`
}).join("")}</div></div>`).join("")
const dnav=$("#dmnav")
dnav.innerHTML=state.dms.length?state.dms.map(name=>{
const active=state.route.name==="dm"&&state.route.withName.toLowerCase()===name.toLowerCase()
return `<a class="navitem${active?" on":""}" href="#/dm/${name}"><img class="av" src="${mcHead(name)}">${esc(name)}</a>`
}).join(""):`<div class="dmempty">Message someone from a channel, or use + above.</div>`
}
function mcHead(nameOrUuid){
return `https://mc-heads.net/avatar/${encodeURIComponent(nameOrUuid)}/32`
}
function startStatusPoll(){
const tick=async()=>{
try{
state.status=await getStatus()
if(state.p2pActive)exitP2PMode()
renderTopStatus(true)
renderHomeStatusCard()
}catch(e){
if(!state.p2pActive)enterP2PMode()
renderTopStatus(false)
renderHomeStatusCard()
}}
tick()
state.pollTimers.push(setInterval(tick,15000))
state.pollTimers.push(setInterval(()=>{refreshChannelsAndDms();pollDmNotifications();pollChannelMentions()},20000))
}
function renderTopStatus(up){
const el=$("#topstatus")
if(!el)return
if(up)el.innerHTML=`<span class="tled on"></span>${state.status.playerCount}/${state.status.maxPlayers} online`
else el.innerHTML=`<span class="tled warn"></span>Offline · P2P ${p2pCount()}`
}
function renderHomeTiles(){
const grid=$("#hometiles")
if(!grid)return
grid.innerHTML=state.channels.map(c=>{
const meta=CHANNEL_META[c.name]||{label:c.name,desc:"",icon:"chat"}
return `<a class="hometile" href="#/c/${c.name}"><span class="ico">${ICONS[meta.icon]||ICONS.chat}</span><b>${esc(meta.label)}</b><small>${esc(meta.desc||"")}</small></a>`
}).join("")
}
async function renderHome(main){
main.innerHTML=`<div class="homewrap">
<h1 class="homehi">Welcome to Vael</h1>
<p class="homesub">VaelKits' own space to chat. Pick a channel or jump back into a conversation.</p>
<div class="homestatuscard" id="homestatuscard">Checking server status…</div>
<h3 class="hometilehead">Jump to a channel</h3>
<div class="hometiles" id="hometiles"></div>
</div>`
renderHomeStatusCard()
renderHomeTiles()
}
function renderP2PStatus(){
renderTopStatus(false)
renderHomeStatusCard()
}
function renderHomeStatusCard(){
const c=$("#homestatuscard")
if(!c)return
if(state.p2pActive){
const n=p2pCount()
c.innerHTML=`<div class="hsrow"><span class="led warn"></span><b>Server offline</b></div><p class="hsmeta">Running in peer-to-peer mode: ${n} ${n===1?"person":"people"} reachable directly.</p>`
return}
c.innerHTML=`<div class="hsrow"><span class="led on"></span><b>${state.status.playerCount}/${state.status.maxPlayers} players online</b></div><p class="hsmeta">${esc(state.status.version||"")}</p><div class="ip"><span>${esc(SERVER_IP)}</span><button title="Copy IP" id="homecopyip">${ICONS.copy}</button></div>`
const b=$("#homecopyip");if(b)b.onclick=()=>{navigator.clipboard.writeText(SERVER_IP).then(()=>toast("Server IP copied"))}
}
async function pollDmNotifications(){
for(const name of state.dms){
const channel=store_dm_channel(name)
const viewing=state.route.name==="dm"&&state.route.withName.toLowerCase()===name.toLowerCase()
if(viewing)continue
try{
const since=await latestTs(channel)
const fresh=await getMessages(channel,since,20)
if(fresh.length){
await cacheMessages(channel,fresh)
const last=fresh[fresh.length-1]
if(last.authorName.toLowerCase()!==state.link.name.toLowerCase()){
await addNotif({ts:last.ts,from:last.authorName,dm:true,preview:last.content.slice(0,80)})
refreshNotifBadge()}}
}catch(e){}}
}
async function pollChannelMentions(){
for(const c of state.channels){
const viewing=state.route.name==="channel"&&state.route.channel===c.name
if(viewing)continue
try{
const since=await latestTs(c.name)
const fresh=await getMessages(c.name,since,50)
if(fresh.length){
await cacheMessages(c.name,fresh)
for(const m of fresh){
if(m.authorName.toLowerCase()===state.link.name.toLowerCase())continue
if(new RegExp("@"+state.link.name+"\\b","i").test(m.content)){
await addNotif({ts:m.ts,from:m.authorName,channel:c.name,preview:m.content.slice(0,80)})
refreshNotifBadge()}}}
}catch(e){}}
}
async function enterP2PMode(){
state.p2pActive=true
p2pInit(state.link.name)
p2p.onMsg=receiveP2PMessage
p2p.onPresence=()=>renderP2PStatus()
const cached=await getCachedMembers()
p2pConnect(cached)
renderP2PStatus()
toast("Server's offline. Switched to peer-to-peer with people who are also online.")
}
function exitP2PMode(){
state.p2pActive=false
p2pTeardown()
flushOutbox()
toast("Server's back. Reconnected.")
}
async function receiveP2PMessage(data){
let payload
try{payload=JSON.parse(data)}catch(e){return}
if(payload.type!=="msg")return
const msg={id:payload.id,ts:payload.ts,authorName:payload.authorName,authorUuid:payload.authorUuid||"",content:payload.content,replyTo:payload.replyTo||null,edited:false,reactions:{}}
await cacheMessages(payload.channel,[msg])
if(state.route&&((state.route.name==="channel"&&state.route.channel===payload.channel)||(state.route.name==="dm"&&store_dm_channel(state.route.withName)===payload.channel))){
const wasBottom=isNearBottom()
renderMessages(await getCachedMessages(payload.channel,300),payload.channel)
if(wasBottom)scrollBottom()
}
}
function renderMain(){
state.route=currentRoute()
renderNav()
const sb=$("#sidebar"),sc=$("#scrim"),rb=$("#rightbar")
if(sb){sb.classList.remove("open")}
if(sc){sc.classList.remove("show")}
if(rb)rb.classList.toggle("hidden",state.route.name==="settings")
const main=$("#main")
main.innerHTML=""
clearViewTimer()
if(state.route.name==="home"){renderHome(main);return}
if(state.route.name==="settings"){renderSettings(main,state.route.tab);return}
if(state.route.name==="dm"){renderConversation(main,store_dm_channel(state.route.withName),state.route.withName,true);return}
renderConversation(main,state.route.channel,null,false)
}
function store_dm_channel(withName){
const pair=[state.link.name.toLowerCase(),withName.toLowerCase()].sort()
return "dm-"+pair[0]+"-"+pair[1]
}
function clearViewTimer(){if(state.viewTimer){clearInterval(state.viewTimer);state.viewTimer=null}}
async function renderConversation(main,channel,dmWith,isDm){
replyTarget=null
const meta=isDm?{label:dmWith,desc:"Direct message"}:(CHANNEL_META[channel]||{label:channel,desc:""})
const chanRec=state.channels.find(c=>c.name===channel)
const canWrite=isDm||!(chanRec&&chanRec.readonly)
main.innerHTML=`
<div class="chead"><b>${isDm?"":"#"}${esc(meta.label)}</b><span class="d">${esc(meta.desc||"")}</span><span class="sp"></span>${isDm?"":`<button id="pinsbtn" title="Pinned messages">${ICONS.pin}</button>`}</div>
<div class="msgs" id="msgs"></div>
<div class="composer" id="composer"></div>`
if(isDm)await startDm(dmWith).catch(()=>{})
if($("#pinsbtn"))$("#pinsbtn").onclick=()=>openPinsPanel(channel)
let cached=await getCachedMessages(channel,300)
renderMessages(cached,channel)
const outbox=await listOutbox(channel)
outbox.forEach(o=>appendPendingMessage(channel,o))
scrollBottom()
buildComposer(channel,canWrite)
try{
const since=await latestTs(channel)
const fresh=await getMessages(channel,since,300)
if(fresh.length){await cacheMessages(channel,fresh);cached=await getCachedMessages(channel,300);renderMessages(cached,channel);scrollBottom()}
}catch(e){}
state.viewTimer=setInterval(async()=>{
try{
const since=await latestTs(channel)
const fresh=await getMessages(channel,since,100)
if(fresh.length){
await cacheMessages(channel,fresh)
const all=await getCachedMessages(channel,300)
const wasBottom=isNearBottom()
renderMessages(all,channel)
if(wasBottom)scrollBottom()
notifyIfMentioned(fresh)
}
}catch(e){}
},4000)
}
function isNearBottom(){
const m=$("#msgs")
if(!m)return true
return m.scrollHeight-m.scrollTop-m.clientHeight<80
}
function scrollBottom(){
const m=$("#msgs")
if(m)m.scrollTop=m.scrollHeight
}
function renderMessages(list,channel){
const box=$("#msgs")
if(!box)return
if(!list.length){box.innerHTML=`<div class="empty-chan">${ICONS.chat}<b>Nothing here yet</b>Be the first to say something.</div>`;return}
let html="",lastDay=null,lastAuthor=null
for(const m of list){
if(!lastDay||!sameDay(m.ts,lastDay)){html+=`<div class="daydiv">${dayFmt(m.ts)}</div>`;lastAuthor=null}
lastDay=m.ts
const staffTag=state.staffList&&state.staffList.includes(m.authorName.toLowerCase())
const replyLine=m.replyTo?renderReplyLine(list,m.replyTo):""
const reactions=renderReactions(m,channel)
const grouped=lastAuthor===m.authorName&&!m.replyTo
html+=`<div class="msg${m.pinned?" pinnedmsg":""}" data-id="${m.id}" data-author="${esc(m.authorName)}">${grouped?'<div style="width:36px"></div>':`<img class="av" src="${mcHead(m.authorUuid||m.authorName)}" data-profile="${esc(m.authorName)}">`}<div class="body">${replyLine}${grouped?"":`<div class="hd"><button class="name${staffTag?" staff":""}" data-profile="${esc(m.authorName)}">${esc(m.authorName)}</button><span class="time">${timeFmt(m.ts)}</span>${m.pinned?`<span class="pinbadge">${ICONS.pin}Pinned</span>`:""}</div>`}<div class="text">${linkify(m.content)}</div>${reactions}</div><div class="mactions">${msgActions(m,channel)}</div></div>`
lastAuthor=m.authorName}
box.innerHTML=html
bindMessageActions(box,channel)
box.querySelectorAll("[data-profile]").forEach(b=>b.onclick=()=>openProfilePopover(b.dataset.profile,b))
}
function renderReplyLine(list,replyTo){
const src=list.find(x=>x.id===replyTo)
if(!src)return `<div class="reply">${ICONS.reply}replying to a message</div>`
return `<div class="reply">${ICONS.reply}<span>${esc(src.authorName)}: ${esc(src.content.slice(0,60))}</span></div>`
}
function renderReactions(m,channel){
const r=m.reactions||{}
const keys=Object.keys(r).filter(k=>r[k]&&r[k].length)
if(!keys.length)return ""
return `<div class="reactions">${keys.map(k=>{
const mine=r[k].some(n=>n.toLowerCase()===state.link.name.toLowerCase())
return `<button class="reaction${mine?" mine":""}" data-react="${k}" data-mid="${m.id}">${k} ${r[k].length}</button>`}).join("")}</div>`
}
function msgActions(m,channel){
const own=m.authorName.toLowerCase()===state.link.name.toLowerCase()
let out=`<button data-act="react" data-mid="${m.id}" title="React">${ICONS.smile}</button><button data-act="reply" data-mid="${m.id}" title="Reply">${ICONS.reply}</button>`
if(!own)out+=`<button data-act="report" data-mid="${m.id}" title="Report">${ICONS.flag}</button>`
if(state.staff){const pinned=m.pinned;out+=`<button data-act="pin" data-mid="${m.id}" data-pinned="${pinned?1:0}" title="${pinned?"Unpin":"Pin"}" style="${pinned?"color:var(--warn)":""}">${ICONS.pin}</button>`}
if(own||state.staff)out+=`<button data-act="delete" data-mid="${m.id}" title="Delete">${ICONS.trash}</button>`
return out
}
function bindMessageActions(box,channel){
box.querySelectorAll("[data-react]").forEach(b=>b.onclick=async()=>{
try{await reactMessage(channel,b.dataset.mid,b.dataset.react);const since=0;}catch(e){}
pokeChannel(channel)})
box.querySelectorAll('[data-act="react"]').forEach(b=>b.onclick=()=>quickReact(b.dataset.mid,channel))
box.querySelectorAll('[data-act="reply"]').forEach(b=>b.onclick=()=>setReplyTarget(box.querySelector(`[data-id="${b.dataset.mid}"]`).querySelector(".text").textContent,b.dataset.mid))
box.querySelectorAll('[data-act="delete"]').forEach(b=>b.onclick=async()=>{
try{await deleteMessage(channel,b.dataset.mid);pokeChannel(channel)}catch(e){toast("Couldn't delete that message")}})
box.querySelectorAll('[data-act="report"]').forEach(b=>b.onclick=async()=>{
try{await reportMessage(channel,b.dataset.mid,"reported from Vael");toast("Reported to staff")}catch(e){toast("Couldn't send the report")}})
box.querySelectorAll('[data-act="pin"]').forEach(b=>b.onclick=async()=>{
const willPin=b.dataset.pinned==="0"
try{if(willPin)await pinMessage(channel,b.dataset.mid);else await unpinMessage(channel,b.dataset.mid);pokeChannel(channel)}
catch(e){toast("Couldn't update pin")}})
}
async function pokeChannel(channel){
const since=0
try{const fresh=await getMessages(channel,since,300);await cacheMessages(channel,fresh);renderMessages(await getCachedMessages(channel,300),channel)}catch(e){}
}
function openProfilePopover(name,anchor){
document.querySelectorAll(".profpop").forEach(p=>p.remove())
if(name.toLowerCase()===state.link.name.toLowerCase())return
const r=anchor.getBoundingClientRect()
const pop=el("div","profpop",`<div class="ph"><img src="${mcHead(name)}"><b>${esc(name)}</b></div><div class="msgline">Loading…</div>`)
pop.style.top=(r.bottom+window.scrollY+6)+"px"
pop.style.left=Math.min(r.left+window.scrollX,window.innerWidth-256)+"px"
document.body.append(pop)
const close=e=>{if(!pop.contains(e.target)){pop.remove();document.removeEventListener("pointerdown",close)}}
setTimeout(()=>document.addEventListener("pointerdown",close),10)
getVaelKitsProfile(name).then(p=>{
pop.innerHTML=`<div class="ph"><img src="${mcHead(name)}"><b>${esc(name)}</b></div><div class="stat"><span>Coins</span><b>${p.coins}</b></div><div class="stat"><span>Kills / Deaths</span><b>${p.kills} / ${p.deaths}</b></div><div class="stat"><span>Prestige</span><b>${p.prestige}</b></div>${p.bounty?`<div class="stat"><span>Bounty</span><b>${p.bounty}</b></div>`:""}${p.streak>1?`<div class="stat"><span>Streak</span><b>${p.streak}</b></div>`:""}<a class="dmbtn" href="#/dm/${encodeURIComponent(name)}">Message</a>`
}).catch(e=>{
pop.innerHTML=`<div class="ph"><img src="${mcHead(name)}"><b>${esc(name)}</b></div><div class="msgline">${e.code==="vaelkits_not_installed"?"VaelKits isn't running on this server.":"Couldn't load their stats."}</div><a class="dmbtn" href="#/dm/${encodeURIComponent(name)}">Message</a>`
})
}
function quickReact(mid,channel){
const emojis=["👍","❤️","😂","😮","😢","🎉"]
const box=el("div","pickr")
box.innerHTML=`<div class="pickbox" style="width:auto;padding:10px"><div style="display:flex;gap:8px">${emojis.map(e=>`<button style="font-size:22px" data-e="${e}">${e}</button>`).join("")}</div></div>`
document.body.append(box)
box.onclick=async e=>{
const em=e.target.dataset&&e.target.dataset.e
box.remove()
if(!em)return
try{await reactMessage(channel,mid,em)}catch(ex){}
pokeChannel(channel)}
}
let replyTarget=null
function setReplyTarget(text,id){
replyTarget={id,text:text.slice(0,80)}
const bar=$("#replybar")
if(bar)renderReplyBar()
}
function renderReplyBar(){
let bar=$("#replybar")
if(!replyTarget){if(bar)bar.remove();return}
if(!bar){bar=el("div","replybar");$("#composer").prepend(bar)}
bar.innerHTML=`Replying to <b>${esc(replyTarget.text)}</b><button id="cancelreply">${ICONS.x}</button>`
$("#cancelreply").onclick=()=>{replyTarget=null;renderReplyBar()}
}
function buildComposer(channel,canWrite){
const box=$("#composer")
if(!canWrite){box.innerHTML=`<div class="cbox" style="opacity:.6">${ICONS.lock}<span style="color:var(--dim);font-size:14px">Only staff can post here</span></div>`;return}
box.innerHTML=`<div class="cbox top" id="cbox"><textarea id="ta" placeholder="Message ${channel.startsWith("dm-")?"":"#"+channel}" rows="1"></textarea><button class="send" id="sendbtn">${ICONS.send}</button></div><div class="muted-line hidden" id="mutedline">You're muted right now.</div>`
renderReplyBar()
const ta=$("#ta"),send=$("#sendbtn")
getDraft(channel).then(d=>{if(d)ta.value=d})
ta.oninput=()=>{ta.style.height="auto";ta.style.height=Math.min(140,ta.scrollHeight)+"px";setDraft(channel,ta.value)}
ta.onkeydown=e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();doSend()}}
send.onclick=doSend
async function doSend(){
const content=ta.value.trim()
if(!content)return
const replyTo=replyTarget?replyTarget.id:null
ta.value="";ta.style.height="auto";setDraft(channel,"")
replyTarget=null;renderReplyBar()
if(!navigator.onLine||state.p2pActive){
const localId=await queueOutbox(channel,content,replyTo)
const msg={id:"p2p-"+localId,ts:Date.now(),authorName:state.link.name,authorUuid:state.link.uuid||"",content,replyTo,edited:false,reactions:{}}
if(state.p2pActive){
await cacheMessages(channel,[msg])
renderMessages(await getCachedMessages(channel,300),channel)
scrollBottom()
p2pBroadcast({type:"msg",channel,id:msg.id,ts:msg.ts,authorName:msg.authorName,authorUuid:msg.authorUuid,content,replyTo})
}else{
appendPendingMessage(channel,{content,replyTo,ts:Date.now()})
}
return}
send.disabled=true
try{
const msg=await postMessage(channel,content,replyTo)
await cacheMessages(channel,[msg])
renderMessages(await getCachedMessages(channel,300),channel)
scrollBottom()
}catch(e){
if(e.code==="muted"){$("#mutedline").classList.remove("hidden")}
else{await queueOutbox(channel,content,replyTo);appendPendingMessage(channel,{content,replyTo,ts:Date.now()});toast("Couldn't send. It'll retry when you're back online.")}
}
send.disabled=false}
}
function appendPendingMessage(channel,o){
const box=$("#msgs")
if(!box)return
const div=el("div","msg pending",`<img class="av" src="${mcHead(state.link.uuid||state.link.name)}"><div class="body"><div class="hd"><span class="name">${esc(state.profile.displayName||state.link.name)}</span><span class="time">sending…</span></div><div class="text">${linkify(o.content)}</div></div>`)
box.append(div)
}
async function flushOutbox(){
for(const ch of new Set(state.channels.map(c=>c.name).concat(state.dms.map(d=>store_dm_channel(d))))){
const items=await listOutbox(ch)
for(const it of items){
try{const msg=await postMessage(it.channel,it.content,it.replyTo);await cacheMessages(it.channel,[msg]);await dropOutbox(it.localId)}
catch(e){}}}
if(state.route&&(state.route.name==="channel"||state.route.name==="dm"))renderMain()
}
function notifyIfMentioned(fresh){
if(document.visibilityState==="visible")return
getSetting("notify_mentions",true).then(on=>{
if(!on)return
for(const m of fresh){
if(m.authorName.toLowerCase()===state.link.name.toLowerCase())continue
const mentioned=new RegExp("@"+state.link.name+"\\b","i").test(m.content)
if(mentioned&&window.Notification&&Notification.permission==="granted"){
new Notification(m.authorName+" mentioned you",{body:m.content.slice(0,120)})}}})
}
function openPinsPanel(channel){
const box=el("div","pickr")
box.innerHTML=`<div class="pickbox"><div class="ph"><b>Pinned in #${esc(channel)}</b><button id="pclose">${ICONS.x}</button></div><div class="picklist" id="pinlist" style="padding:10px">Loading...</div></div>`
document.body.append(box)
$("#pclose").onclick=()=>box.remove()
box.addEventListener("click",e=>{if(e.target===box)box.remove()})
getPins(channel).then(list=>{
$("#pinlist").innerHTML=list.length?list.map(m=>`<div class="rowitem" style="align-items:flex-start"><div class="rt"><b>${esc(m.authorName)}</b><small>${esc(m.content.slice(0,140))}</small></div>${state.staff?`<button data-unpin="${esc(m.id)}" class="btn sec" style="width:auto;padding:6px 10px">Unpin</button>`:""}</div>`).join(""):`<div class="sub" style="padding:6px">Nothing pinned yet.</div>`
$("#pinlist").querySelectorAll("[data-unpin]").forEach(b=>b.onclick=async()=>{await unpinMessage(channel,b.dataset.unpin);box.remove();pokeChannel(channel)})
}).catch(()=>{$("#pinlist").textContent="Couldn't load pinned messages."})
}
function openDmPicker(){
const box=el("div","pickr")
box.innerHTML=`<div class="pickbox"><div class="ph"><b>Start a DM</b><button id="pclose">${ICONS.x}</button></div><input id="psearch" placeholder="Search players..."><div class="picklist" id="plist"></div></div>`
document.body.append(box)
$("#pclose").onclick=()=>box.remove()
box.addEventListener("click",e=>{if(e.target===box)box.remove()})
getMembers().then(members=>{
const names=Array.from(new Set(members.map(m=>m.name).concat(state.players.map(p=>p.name)))).filter(n=>n.toLowerCase()!==state.link.name.toLowerCase())
const draw=list=>{$("#plist").innerHTML=list.map(n=>`<div class="pickitem" data-n="${esc(n)}"><img src="${mcHead(n)}">${esc(n)}</div>`).join("")||`<div style="padding:12px;color:var(--dim)">No one found</div>`}
draw(names)
$("#psearch").oninput=e=>draw(names.filter(n=>n.toLowerCase().includes(e.target.value.toLowerCase())))
$("#plist").onclick=e=>{
const it=e.target.closest(".pickitem")
if(!it)return
box.remove()
location.hash="#/dm/"+it.dataset.n}
}).catch(()=>{$("#plist").innerHTML=`<div style="padding:12px;color:var(--dim)">Couldn't load players</div>`})
}
function renderSettings(main,tab){
const tabs=[["profile","Profile"],["passkeys","Passkeys"],["notifications","Notifications"],["privacy","Privacy"],["data","Local data"]]
if(state.staff)tabs.push(["staff","Staff"])
main.innerHTML=`<div class="chead"><b>Settings</b><span class="sp"></span><a href="#/c/general" class="navitem" style="width:auto;padding:6px 10px">${ICONS.back}Back to chat</a></div><div class="settings-wrap"><div class="stabs">${tabs.map(([k,l])=>`<button data-t="${k}" class="${tab===k?"on":""}">${l}</button>`).join("")}</div><div class="spane" id="spane"></div></div>`
main.querySelectorAll(".stabs button").forEach(b=>b.onclick=()=>{location.hash="#/settings/"+b.dataset.t})
const pane=$("#spane")
if(tab==="profile")return settingsProfile(pane)
if(tab==="passkeys")return settingsPasskeys(pane)
if(tab==="notifications")return settingsNotifications(pane)
if(tab==="privacy")return settingsPrivacy(pane)
if(tab==="data")return settingsData(pane)
if(tab==="staff")return settingsStaff(pane)
}
function settingsProfile(pane){
pane.innerHTML=`<h2>Profile</h2><p class="sub">How you show up in Vael.</p>
<div class="avatarrow"><img id="avprev" src="${state.avatar||fallbackAvatar()}"><div><button class="btn sec" id="avbtn" style="width:auto;padding:8px 14px">Change avatar</button><input type="file" id="avfile" accept="image/*" class="hidden"></div></div>
<div class="field"><label>Display name</label><input id="dname" value="${esc(state.profile.displayName||"")}" placeholder="${esc(state.link.name)}"></div>
<div class="field"><label>Bio</label><textarea id="dbio" rows="3">${esc(state.profile.bio||"")}</textarea></div>
<button class="btn pri" id="savep" style="width:auto;padding:10px 18px">Save profile</button>
<div class="hr"></div>
<div class="rowitem"><div class="rt"><b>${esc(state.link.name)}</b><small>Linked Minecraft account</small></div><span class="tag ok">Linked</span></div>
<button class="btn sec" id="unlink" style="width:auto;padding:8px 14px;margin-top:10px">Forget link on this device</button>`
$("#avbtn").onclick=()=>$("#avfile").click()
$("#avfile").onchange=async e=>{
const f=e.target.files[0]
if(!f)return
try{const url=await saveAvatarFromFile(f);state.avatar=url;$("#avprev").src=url;renderProfileButton();toast("Avatar updated")}
catch(err){toast(err.message||"Couldn't use that image")}}
$("#savep").onclick=async()=>{
state.profile={displayName:$("#dname").value.trim(),bio:$("#dbio").value.trim()}
await saveProfile(state.profile)
renderProfileButton()
toast("Profile saved")}
$("#unlink").onclick=async()=>{
await clearLink()
state.link=null
state.shellBuilt=false
render()}
}
function settingsPasskeys(pane){
const has=!!state.passkeyRecord
pane.innerHTML=`<h2>Passkeys</h2><p class="sub">A passkey lets you lock Vael on this device behind your device's own fingerprint, face, or PIN. It doesn't replace your Puter sign-in — it's a local screen lock stored only on this device.</p>
<div class="rowitem"><div class="rt"><b>Device passkey</b><small>${has?"Set up on this device":"Not set up"}</small></div>${has?`<button class="btn sec" id="rmpk" style="width:auto;padding:7px 12px">Remove</button>`:`<button class="btn pri" id="addpk" style="width:auto;padding:7px 12px">Set up</button>`}</div>
${has?`<div class="toggle"><div><b>Require it to open Vael</b><small>Asks for your passkey every time you open this site</small></div><button class="switch${state.passkeyRequired?" on":""}" id="reqpk"><i></i></button></div>`:""}`
if($("#addpk"))$("#addpk").onclick=async()=>{
try{
const rec=await registerPasskey(state.link.name)
await savePasskeyRecord(rec)
state.passkeyRecord=rec
toast("Passkey saved")
renderSettings($("#main")||pane.closest(".main"),"passkeys")
settingsPasskeys(pane)
}catch(e){toast(e.message||"Couldn't set up a passkey")}}
if($("#rmpk"))$("#rmpk").onclick=async()=>{
await clearPasskeyRecord()
await setSetting("require_passkey_unlock",false)
state.passkeyRecord=null;state.passkeyRequired=false
settingsPasskeys(pane)}
if($("#reqpk"))$("#reqpk").onclick=async()=>{
state.passkeyRequired=!state.passkeyRequired
await setSetting("require_passkey_unlock",state.passkeyRequired)
settingsPasskeys(pane)}
}
function settingsNotifications(pane){
getSetting("notify_mentions",true).then(on=>{
pane.innerHTML=`<h2>Notifications</h2><p class="sub">Desktop notifications only fire while this tab is in the background.</p>
<div class="toggle"><div><b>Notify on mentions</b><small>When someone @s you in a channel or sends a DM</small></div><button class="switch${on?" on":""}" id="notif"><i></i></button></div>`
$("#notif").onclick=async()=>{
const next=!on
if(next&&window.Notification&&Notification.permission!=="granted")await Notification.requestPermission()
await setSetting("notify_mentions",next)
settingsNotifications(pane)}
})
}
function settingsPrivacy(pane){
listBlocks().then(blocks=>{
pane.innerHTML=`<h2>Privacy</h2><p class="sub">Blocked players' messages are hidden from you in this browser only.</p>
<div class="field"><label>Block a player</label><input id="blockname" placeholder="Minecraft username"></div>
<button class="btn sec" id="blockbtn" style="width:auto;padding:8px 14px">Block</button>
<div class="hr"></div>
${blocks.length?blocks.map(b=>`<div class="rowitem"><div class="rt">${esc(b.name)}</div><button data-un="${esc(b.name)}" class="btn sec" style="width:auto;padding:6px 10px">Unblock</button></div>`).join(""):`<p class="sub">Nobody's blocked.</p>`}`
$("#blockbtn").onclick=async()=>{
const n=$("#blockname").value.trim()
if(!n)return
await toggleBlock(n)
settingsPrivacy(pane)}
pane.querySelectorAll("[data-un]").forEach(b=>b.onclick=async()=>{await toggleBlock(b.dataset.un);settingsPrivacy(pane)})
})
}
function settingsData(pane){
pane.innerHTML=`<h2>Local data</h2><p class="sub">Messages are cached on this device so Vael opens instantly.</p><div id="usage" class="sub">Checking usage...</div><button class="btn dan" id="clearcache" style="width:auto;padding:9px 16px">Clear local cache</button>`
if(navigator.storage&&navigator.storage.estimate)navigator.storage.estimate().then(e=>{
$("#usage").textContent=`Using about ${(e.usage/1048576).toFixed(1)} MB of ${(e.quota/1048576/1024).toFixed(1)} GB available.`})
$("#clearcache").onclick=async()=>{
await db.messages.clear();await db.outbox.clear();await db.drafts.clear()
toast("Local cache cleared")}
}
function settingsStaff(pane){
pane.innerHTML=`<h2>Staff tools</h2><p class="sub">Moderation actions for VaelKits staff.</p>
<h3 style="font-size:15px;margin-bottom:10px">Mute</h3>
<div class="fields" style="margin-bottom:10px"><div class="fld"><label>Player</label><input id="muten" placeholder="Username"></div><div class="fld"><label>Minutes</label><input id="mutem" value="15" type="number"></div></div>
<button class="btn dan" id="mutebtn" style="width:auto;padding:9px 16px">Mute</button>
<div id="muteslist" class="sub" style="margin-top:14px">Loading active mutes...</div>
<div class="hr"></div>
<h3 style="font-size:15px;margin-bottom:10px">Kick from server</h3>
<div class="fields" style="margin-bottom:10px"><div class="fld"><label>Player</label><input id="kickn" placeholder="Username"></div><div class="fld"><label>Reason</label><input id="kickr" placeholder="Optional"></div></div>
<button class="btn dan" id="kickbtn" style="width:auto;padding:9px 16px">Kick</button>
<div class="hr"></div>
<h3 style="font-size:15px;margin-bottom:10px">Unlink account</h3>
<p class="sub" style="margin-bottom:10px">Forces someone to re-run /vaellink to use Vael again.</p>
<div class="field"><label>Player</label><input id="unlinkn" placeholder="Username"></div>
<button class="btn dan" id="unlinkbtn" style="width:auto;padding:9px 16px">Unlink</button>
<div class="hr"></div>
<h3 style="font-size:15px;margin-bottom:10px">Clear a channel</h3>
<p class="sub" style="margin-bottom:10px">Deletes every message in a channel. Pinned messages are kept.</p>
<div class="field"><label>Channel</label><select id="clearch">${state.channels.map(c=>`<option value="${c.name}">${esc((CHANNEL_META[c.name]||{label:c.name}).label)}</option>`).join("")}</select></div>
<button class="btn dan" id="clearbtn" style="width:auto;padding:9px 16px">Clear channel</button>
<div class="hr"></div>
<div style="display:flex;align-items:center;margin-bottom:10px"><h3 style="font-size:15px;flex:1">Reports</h3><button class="btn sec" id="toggleall" style="width:auto;padding:6px 12px;font-size:13px">Show resolved</button></div>
<div id="reportlist" class="sub">Loading...</div>`
$("#mutebtn").onclick=async()=>{
const n=$("#muten").value.trim()
if(!n)return
try{await muteUser(n,parseInt($("#mutem").value||"15",10));toast("Muted "+n);$("#muten").value="";loadMutes()}
catch(e){toast("Couldn't mute")}}
$("#kickbtn").onclick=async()=>{
const n=$("#kickn").value.trim()
if(!n)return
try{await kickPlayer(n,$("#kickr").value.trim()||undefined);toast("Kicked "+n);$("#kickn").value="";$("#kickr").value=""}
catch(e){toast("Couldn't kick")}}
$("#unlinkbtn").onclick=async()=>{
const n=$("#unlinkn").value.trim()
if(!n)return
if(!confirm("Unlink "+n+"? They'll need to run /vaellink again."))return
try{await unlinkUser(n);toast("Unlinked "+n);$("#unlinkn").value=""}
catch(e){toast("Couldn't unlink")}}
$("#clearbtn").onclick=async()=>{
const ch=$("#clearch").value
if(!confirm("Clear all messages in #"+ch+"? This can't be undone."))return
try{await clearChannel(ch);await db.messages.where("channel").equals(ch).delete();toast("Cleared #"+ch)}
catch(e){toast("Couldn't clear channel")}}
let showAll=false
function loadReports(){
$("#reportlist").textContent="Loading..."
getReports(showAll).then(list=>{
const r=list.slice(-40).reverse()
$("#reportlist").innerHTML=r.length?r.map(x=>`<div class="rowitem"><div class="rt"><b>#${esc(x.channel)}</b>${x.resolved?' <span class="tag ok">Resolved</span>':""}<small>reported by ${esc(x.reporter)} · ${esc(x.reason||"")}</small></div>${x.resolved?"":`<button data-rid="${esc(x.id)}" class="btn sec" style="width:auto;padding:6px 10px">Resolve</button>`}</div>`).join(""):"Nothing here."
$("#reportlist").querySelectorAll("[data-rid]").forEach(b=>b.onclick=async()=>{await resolveReport(b.dataset.rid);loadReports()})
}).catch(()=>{$("#reportlist").textContent="Couldn't load reports."})}
$("#toggleall").onclick=()=>{showAll=!showAll;$("#toggleall").textContent=showAll?"Show unresolved":"Show resolved";loadReports()}
function loadMutes(){
getMutes().then(list=>{
$("#muteslist").innerHTML=list.length?list.map(m=>`<div class="rowitem"><div class="rt"><b>${esc(m.name)}</b><small>${m.remainingMinutes} min left</small></div><button data-un="${esc(m.name)}" class="btn sec" style="width:auto;padding:6px 10px">Unmute</button></div>`).join(""):`<div class="sub">Nobody's muted right now.</div>`
$("#muteslist").querySelectorAll("[data-un]").forEach(b=>b.onclick=async()=>{await unmuteUser(b.dataset.un);loadMutes()})
}).catch(()=>{$("#muteslist").textContent="Couldn't load mutes."})}
loadMutes()
loadReports()
}
