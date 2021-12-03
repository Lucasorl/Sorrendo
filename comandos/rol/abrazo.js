const Discord = require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "abrazo",
  alias: [],
  description: "Dar un abrazo.",

execute (client, message, args, prefix){
try{

    let abrazado = message.mentions.members.first()

        const embedabrazado = new Discord.MessageEmbed()
        .setDescription(`${message.author.username} da un abrazo a ${abrazado}`)
        .setImage("https://c.tenor.com/pLLBo8ET910AAAAi/love-you.gif")
        .setColor("#a00153")

    
        const embedabrazo = new Discord.MessageEmbed()
        .setImage("https://c.tenor.com/pLLBo8ET910AAAAi/love-you.gif")
        .setColor("#a00153")

    if(!abrazado){
        message.reply({embeds: [embedabrazo]})
    } else {
        message.reply({embeds: [embedabrazado]})
    }


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

