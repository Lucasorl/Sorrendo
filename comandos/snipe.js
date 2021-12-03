const Discord = require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "snipe",
  alias: [],

execute (client, message, args){
try{

    let channel = message.mentions.channels.first() || message.channel;

    let msg = client.snipes.get(channel.id)
      
      const embednomsg = new Discord.MessageEmbed()
      .setDescription("**No hay ningún mensaje borrado en este canal.**")
      .setTimestamp()
      .setColor("WHITE")

    if(!msg){
        
      message.channel.send({ embeds: [embednomsg] })

    } else {
        const embedborrado = new Discord.MessageEmbed()

        .setTitle("Mensaje borrado:")
        .setAuthor(`Mensaje escrito por ${msg.delete.tag}`, msg.delete.displayAvatarURL())
        .addField("**Canal:**", `<#${msg.canal.id}>`)
        .setDescription(msg.content)
        .setColor("WHITE")

        message.channel.send({ embeds: [embedborrado] })
        
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

