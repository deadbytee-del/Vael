const db=new Dexie("vael")
db.version(1).stores({
messages:"[channel+id],channel,ts",
outbox:"++localId,channel,ts",
drafts:"channel",
settings:"key",
blocks:"name",
profileCache:"name",
memberCache:"name"
})
async function cacheMessages(channel,arr){
if(!arr.length)return
await db.messages.bulkPut(arr.map(m=>({...m,channel})))
}
async function getCachedMessages(channel,limit){
return db.messages.where("channel").equals(channel).sortBy("ts").then(a=>a.slice(-limit))
}
async function latestTs(channel){
const rows=await db.messages.where("channel").equals(channel).sortBy("ts")
return rows.length?rows[rows.length-1].ts:0
}
async function setSetting(key,value){await db.settings.put({key,value})}
async function getSetting(key,fallback){const r=await db.settings.get(key);return r?r.value:fallback}
async function queueOutbox(channel,content,replyTo){
return db.outbox.add({channel,content,replyTo:replyTo||null,ts:Date.now()})
}
async function dropOutbox(localId){return db.outbox.delete(localId)}
async function listOutbox(channel){return db.outbox.where("channel").equals(channel).toArray()}
async function setDraft(channel,text){
if(!text){await db.drafts.delete(channel);return}
await db.drafts.put({channel,text})
}
async function getDraft(channel){const r=await db.drafts.get(channel);return r?r.text:""}
async function isBlocked(name){const r=await db.blocks.get(name.toLowerCase());return !!r}
async function toggleBlock(name){
const low=name.toLowerCase()
const r=await db.blocks.get(low)
if(r){await db.blocks.delete(low);return false}
await db.blocks.put({name:low})
return true}
async function listBlocks(){return db.blocks.toArray()}
async function cacheMembers(names){
await db.memberCache.clear()
await db.memberCache.bulkPut(names.map(name=>({name})))
}
async function getCachedMembers(){
return (await db.memberCache.toArray()).map(r=>r.name)
}
async function pruneLocalMessages(maxAgeDays){
const cutoff=Date.now()-maxAgeDays*86400000
const old=await db.messages.where("ts").below(cutoff).toArray()
const ids=old.filter(m=>!m.pinned).map(m=>[m.channel,m.id])
if(ids.length)await db.messages.bulkDelete(ids)
return ids.length
}
