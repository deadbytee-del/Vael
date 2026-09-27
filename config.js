const DEFAULT_API_BASE="https://vaelkits.minekeep.dev:2053"
const SERVER_IP="play.vaelkits.net"
const CHANNEL_META={
general:{label:"General",desc:"Talk about anything VaelKits.",icon:"chat",group:"Community"},
"off-topic":{label:"Off Topic",desc:"Memes, banter, anything not VaelKits.",icon:"smile",group:"Community"},
trading:{label:"Trading",desc:"Buy, sell, and trade with other players.",icon:"trade",group:"Community"},
help:{label:"Help",desc:"Stuck on something? Ask here.",icon:"help",group:"Support"},
"bug-reports":{label:"Bug Reports",desc:"Found something broken? Report it here.",icon:"bug",group:"Support"},
suggestions:{label:"Suggestions",desc:"Ideas for kits, the shop, the arena.",icon:"idea",group:"Support"},
announcements:{label:"Announcements",desc:"Updates from the staff team.",icon:"megaphone",group:"Server"},
staff:{label:"Staff",desc:"Staff-only discussion.",icon:"shield",group:"Server"}
}
const CHANNEL_GROUP_ORDER=["Community","Support","Server"]
