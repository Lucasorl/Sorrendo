const Discord = require("discord.js");
const { Client, MessageEmbed } = require("discord.js");
const db = require("megadb")
const warns = new db.crearDB("warns")

module.exports = {
  name: "warn",
  alias: ["advertencia"],

execute (client, message, args){
try{

    //PERMS//
    var perms = message.member.permissions.has("KICK_MEMBERS")

      const embednoperm = new Discord.MessageEmbed()
      .setDescription("<a:no:883357207582896168> No tienes permiso para ejecutar este comando. <a:no:883357207582896168>")
      .setTimestamp()
      .setColor("RED")

    if(!perms) return message.channel.send({ embeds: [embednoperm] })


    //USER//
    let persona = message.mentions.users.first()

      const embednouser = new Discord.MessageEmbed()
      .setDescription("**No has indicado un usuario para ls expulsión.**")
      .setTimestamp()
      .setColor("RED")

    if(!persona) return message.channel.send({ embeds: [embednouser] })


    //TÚ USER//
      const embedtuuser = new Discord.MessageEmbed()
      .setDescription("**No te puedes warnear a ti mismo.**")
      .setTimestamp()
      .setColor("RED")

    if(persona === message.author) return message.channel.send({ embeds: [embedtuuser] })


    //YO USER//
      const embedyouser = new Discord.MessageEmbed()
      .setDescription("**No me puedo warnear a mí mismo.**")
      .setTimestamp()
      .setColor("RED")

    if(persona.id === client.user.id) return message.channel.send({ embeds: [embedyouser] })


    //RAZÓN//
    var razón = args.slice(1).join(" ")

      const embedrazon = new Discord.MessageEmbed()
      .setDescription("**Escribe una razón para el warn.**")
      .setColor("RED")
      .setTimestamp()

    if(!razón) return message.channel.send({ embeds: [embedrazon] })


    //WARNS//
    if(!warns.tiene(`${message.guild.id}.${persona.id}`))
    warns.establecer(`${message.guild.id}.${persona.id}`, 0)

    warns.sumar(`${message.guild.id}.${persona.id}`, 1)

    message.channel.send(`⚠️ \`${persona.username}\` ha sido warneado por \`${razón}\`.`)

    persona.send(`⚠️ Has sido warneado en **${message.guild.name}** por **${razón}**`)
  
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

