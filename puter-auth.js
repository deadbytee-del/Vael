async function puterReady(){
if(!window.puter)throw new Error("Puter.js failed to load. Check your connection and reload.")
}
async function isPuterSignedIn(){
await puterReady()
return puter.auth.isSignedIn()
}
async function puterSignIn(){
await puterReady()
await puter.auth.signIn()
return puter.auth.getUser()
}
async function puterSignOut(){
await puterReady()
puter.auth.signOut()
}
async function puterUser(){
await puterReady()
if(!puter.auth.isSignedIn())return null
return puter.auth.getUser()
}
async function kvGet(key,fallback){
await puterReady()
const v=await puter.kv.get(key)
if(v===null||v===undefined)return fallback
try{return JSON.parse(v)}catch(e){return fallback}
}
async function kvSet(key,value){
await puterReady()
return puter.kv.set(key,JSON.stringify(value))
}
async function kvDel(key){
await puterReady()
return puter.kv.del?puter.kv.del(key):puter.kv.delete(key)
}
async function getProfile(){
return kvGet("vael_profile",{displayName:"",bio:""})
}
async function saveProfile(p){
return kvSet("vael_profile",p)
}
async function getAvatar(){
return kvGet("vael_avatar",null)
}
async function saveAvatarFromFile(file){
const dataUrl=await resizeToDataUrl(file,128,128,0.82)
await kvSet("vael_avatar",dataUrl)
return dataUrl
}
function resizeToDataUrl(file,w,h,quality){
return new Promise((resolve,reject)=>{
const img=new Image()
const reader=new FileReader()
reader.onerror=()=>reject(new Error("Could not read that image"))
reader.onload=()=>{
img.onerror=()=>reject(new Error("Could not decode that image"))
img.onload=()=>{
const canvas=document.createElement("canvas")
canvas.width=w;canvas.height=h
const ctx=canvas.getContext("2d")
const scale=Math.max(w/img.width,h/img.height)
const sw=w/scale,sh=h/scale
const sx=(img.width-sw)/2,sy=(img.height-sh)/2
ctx.drawImage(img,sx,sy,sw,sh,0,0,w,h)
resolve(canvas.toDataURL("image/jpeg",quality))
}
img.src=reader.result
}
reader.readAsDataURL(file)
})
}
async function getLink(){
return kvGet("vael_link",null)
}
async function saveLink(link){
return kvSet("vael_link",link)
}
async function clearLink(){
return kvDel("vael_link")
}
async function getPasskeyRecord(){
return kvGet("vael_passkey",null)
}
async function savePasskeyRecord(rec){
return kvSet("vael_passkey",rec)
}
async function clearPasskeyRecord(){
return kvDel("vael_passkey")
}
