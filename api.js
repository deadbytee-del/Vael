async function apiBase(){
return DEFAULT_API_BASE
}
class ApiError extends Error{
constructor(code,status){super(code);this.code=code;this.status=status}
}
async function apiFetch(path,opts){
const base=await apiBase()
if(!base)throw new ApiError("no_server_configured",0)
const link=await getLink()
const headers=Object.assign({},opts&&opts.headers)
if(link&&link.token)headers["X-Vael-Key"]=link.token
if(opts&&opts.body)headers["Content-Type"]="application/json"
let res
try{
res=await fetch(base+path,Object.assign({},opts,{headers}))
}catch(e){throw new ApiError("network_error",0)}
let data=null
try{data=await res.json()}catch(e){}
if(!res.ok)throw new ApiError((data&&data.error)||"error_"+res.status,res.status)
return data
}
async function getStatus(){return apiFetch("/api/status")}
async function getPlayers(){return apiFetch("/api/players")}
async function getMembers(){return apiFetch("/api/members")}
async function getVaelKitsProfile(name){return apiFetch("/api/vaelkits/"+encodeURIComponent(name))}
async function getChannels(){return apiFetch("/api/channels")}
async function getMessages(channel,since,limit){
const q=new URLSearchParams()
if(since)q.set("since",since)
if(limit)q.set("limit",limit)
const qs=q.toString()
return apiFetch("/api/channels/"+encodeURIComponent(channel)+"/messages"+(qs?"?"+qs:""))
}
async function postMessage(channel,content,replyTo,attachment){
return apiFetch("/api/channels/"+encodeURIComponent(channel)+"/messages",{method:"POST",body:JSON.stringify({content,replyTo:replyTo||null,attachment:attachment||null})})
}
async function deleteMessage(channel,id){
return apiFetch("/api/channels/"+encodeURIComponent(channel)+"/messages/"+encodeURIComponent(id),{method:"DELETE"})
}
async function reactMessage(channel,id,emoji){
return apiFetch("/api/channels/"+encodeURIComponent(channel)+"/messages/"+encodeURIComponent(id)+"/react",{method:"POST",body:JSON.stringify({emoji})})
}
async function listDms(){return apiFetch("/api/dms")}
async function startDm(withName){return apiFetch("/api/dms/start",{method:"POST",body:JSON.stringify({with:withName})})}
async function redeemLink(code){return apiFetch("/api/link/redeem",{method:"POST",body:JSON.stringify({code})})}
async function reportMessage(channel,id,reason){return apiFetch("/api/reports",{method:"POST",body:JSON.stringify({channel,messageId:id,reason})})}
async function muteUser(name,minutes){return apiFetch("/api/mute",{method:"POST",body:JSON.stringify({name,minutes})})}
async function getMutes(){return apiFetch("/api/mutes")}
async function unmuteUser(name){return apiFetch("/api/unmute",{method:"POST",body:JSON.stringify({name})})}
async function kickPlayer(name,reason){return apiFetch("/api/kick",{method:"POST",body:JSON.stringify({name,reason})})}
async function unlinkUser(name){return apiFetch("/api/unlink",{method:"POST",body:JSON.stringify({name})})}
async function clearChannel(channel){return apiFetch("/api/channels/"+encodeURIComponent(channel)+"/messages",{method:"DELETE"})}
async function pinMessage(channel,id){return apiFetch("/api/channels/"+encodeURIComponent(channel)+"/messages/"+encodeURIComponent(id)+"/pin",{method:"POST"})}
async function unpinMessage(channel,id){return apiFetch("/api/channels/"+encodeURIComponent(channel)+"/messages/"+encodeURIComponent(id)+"/pin",{method:"DELETE"})}
async function getPins(channel){return apiFetch("/api/channels/"+encodeURIComponent(channel)+"/pins")}
async function resolveReport(id){return apiFetch("/api/reports/"+encodeURIComponent(id)+"/resolve",{method:"POST"})}
function fileToBase64(file){
return new Promise((resolve,reject)=>{
const r=new FileReader()
r.onload=()=>resolve(r.result.split(",")[1])
r.onerror=reject
r.readAsDataURL(file)
})}
async function uploadImage(file){
const data=await fileToBase64(file)
return apiFetch("/api/upload",{method:"POST",body:JSON.stringify({type:file.type,data})})
}
async function getAltClusters(){return apiFetch("/api/altcheck")}
async function getReports(all){return apiFetch("/api/reports"+(all?"?all=1":""))}
