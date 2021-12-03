const Discord = require("discord.js");
const { Client, MessageEmbed } = require("discord.js");
const db = require("megadb")
const warns = new db.crearDB("warns")
  
module.exports = {
  name: "warns",
  alias: ["advertencias"],

async execute (client, message, args){
try{

  const embedperms = new Discord.MessageEmbed()
  .setDescription("<a:no:883357207582896168> **No tienes permisos para ejecutar este comando.** <a:no:883357207582896168>")
  .setTimestamp()
  .setColor("RED")

  const embedpersona = new Discord.MessageEmbed()
  .setDescription("**No has indicado una persona.**")
  .setTimestamp()
  .setColor("RED")

  
  var perms = message.member.permissions.has("KICK_MEMBERS")
  if(!perms) return message.channel.send({ embeds: [embedperms] })

  let persona = message.mentions.members.first()

  const embednowarns = new Discord.MessageEmbed()
  .setDescription(`<a:perf:883357207473844264> **${persona} no tiene warns.**`)
  .setTimestamp()
  .setColor("GREEN")


  let cantidad = await warns.obtener(`${message.guild.id}.${persona.id}`)
  if(!persona) return message.channel.send({ embeds: [embedpersona] })

  const embedwarns = new Discord.MessageEmbed()
  .setDescription(`${persona} tiene **${cantidad}** warns.`)
  .setColor("WHITE")

  if(!warns.tiene(`${message.guild.id}.${persona.id}`)){
    message.channel.send({ embeds: [embednowarns] })
  } else {
      
    message.channel.send({ embeds: [embedwarns] })

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

