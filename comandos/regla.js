const Discord = require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "regla",
  alias: [""],
  description: "",

execute (client, message, args, prefix){
try{

    message.reply("**Insultos o spam al MD es motivo de warn.**")
  

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

