function b64u(buf){
return btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")
}
function unb64u(s){
s=s.replace(/-/g,"+").replace(/_/g,"/")
while(s.length%4)s+="="
const bin=atob(s)
const buf=new Uint8Array(bin.length)
for(let i=0;i<bin.length;i++)buf[i]=bin.charCodeAt(i)
return buf.buffer
}
function derEcdsaToRaw(der){
const d=new Uint8Array(der)
let i=2
const rlen=d[i+1]
let r=d.slice(i+2,i+2+rlen)
i=i+2+rlen
const slen=d[i+1]
let s=d.slice(i+2,i+2+slen)
r=stripLeadingZero(r,32)
s=stripLeadingZero(s,32)
const out=new Uint8Array(64)
out.set(r,32-r.length)
out.set(s,64-s.length)
return out.buffer
}
function stripLeadingZero(arr,len){
let a=arr
while(a.length>len)a=a.slice(1)
while(a.length<len){const b=new Uint8Array(len);b.set(a,len-a.length);a=b}
return a
}
async function passkeySupported(){
return !!(window.PublicKeyCredential&&navigator.credentials)
}
async function registerPasskey(accountLabel){
const challenge=crypto.getRandomValues(new Uint8Array(32))
const userId=crypto.getRandomValues(new Uint8Array(16))
const cred=await navigator.credentials.create({publicKey:{
challenge,
rp:{name:"Vael"},
user:{id:userId,name:accountLabel,displayName:accountLabel},
pubKeyCredParams:[{alg:-7,type:"public-key"},{alg:-257,type:"public-key"}],
authenticatorSelection:{residentKey:"preferred",userVerification:"preferred"},
timeout:60000
}})
if(!cred)throw new Error("Passkey creation was cancelled")
const pk=cred.response.getPublicKey?cred.response.getPublicKey():null
if(!pk)throw new Error("This browser did not return a public key")
const alg=cred.response.getPublicKeyAlgorithm?cred.response.getPublicKeyAlgorithm():-7
const isEc=alg===-7
const key=await crypto.subtle.importKey("spki",pk,isEc?{name:"ECDSA",namedCurve:"P-256"}:{name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},true,["verify"])
const jwk=await crypto.subtle.exportKey("jwk",key)
return{credentialId:b64u(cred.rawId),alg,jwk}
}
async function verifyPasskey(record){
const challenge=crypto.getRandomValues(new Uint8Array(32))
const assertion=await navigator.credentials.get({publicKey:{
challenge,
allowCredentials:[{id:unb64u(record.credentialId),type:"public-key"}],
userVerification:"preferred",
timeout:60000
}})
if(!assertion)throw new Error("Passkey check was cancelled")
const isEc=record.alg===-7
const key=await crypto.subtle.importKey("jwk",record.jwk,isEc?{name:"ECDSA",namedCurve:"P-256"}:{name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},false,["verify"])
const clientDataHash=await crypto.subtle.digest("SHA-256",assertion.response.clientDataJSON)
const signedData=new Uint8Array(assertion.response.authenticatorData.byteLength+clientDataHash.byteLength)
signedData.set(new Uint8Array(assertion.response.authenticatorData),0)
signedData.set(new Uint8Array(clientDataHash),assertion.response.authenticatorData.byteLength)
let sig=assertion.response.signature
if(isEc)sig=derEcdsaToRaw(sig)
const ok=await crypto.subtle.verify(isEc?{name:"ECDSA",hash:"SHA-256"}:{name:"RSASSA-PKCS1-v1_5"},key,sig,signedData)
return ok
}
