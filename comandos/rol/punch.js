const Discord = require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "punch",
  alias: [],
  description: "Golpea",

execute (client, message, args, prefix){
try{

  

} catch(e) {

  console.error(e);

    const embedmal = new Discord.MessageEmbed()
    .setDescription("<a:no:883357207582896168> **Ha ocurrido un error.** <a:no:883357207582896168>")
    .addField("**Error:**", `\`\`\`${e}\`\`\``)
    .setTimestamp()
    .setColor("RED")
        
  return message.channel.send({embeds: [embedmal]})

}
    

}
}

