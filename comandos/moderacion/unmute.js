const Discord = require("discord.js");
const { Client, MessageEmbed } = require("discord.js");
const db = require("megadb")
const muterol = new db.crearDB("muterol")
const ms = require("ms")

module.exports = {
  name: "unmute",
  alias: [],

async execute (client, message, args){
try{

    //PERMS//
    let perms = message.member.permissions.has("BAN_MEMBERS")
    
      const embedperms = new Discord.MessageEmbed()
      .setDescription("<a:no:883357207582896168> **No tienes permiso para ejecutar este comando.** <a:no:883357207582896168>")
      .setTimestamp()
      .setColor("RED")

    if(!perms) return message.reply({ embeds: [embedperms] })


    //MIS PERMS//
    let permsyo = message.guild.me.permissions.has("MANAGE_ROLES")

      const embedpermsyo = new Discord.MessageEmbed()
      .setDescription("<a:no:883357207582896168> **No tengo permiso para realizar esta acción.** <a:no:883357207582896168>")
      .setTimestamp()
      .setColor("RED")

    if(!permsyo) return message.reply(({ embeds: [embedpermsyo] }))


    //USER//
    let persona = message.mentions.members.first()

      const embednouser = new Discord.MessageEmbed()
      .setDescription("**No has indicado un usuario para el unmute.**")
      .addField("**Sintaxis:**", `\`;${this.name} <@miembro>\``)
      .setTimestamp()
      .setColor("RED")

    if(!persona) return message.reply({ embeds: [embednouser] })


        const embednomuterol = new Discord.MessageEmbed()
        .setDescription("**Este servidor no tiene un rol de muteo establecido.**")
        .addField("**Para establecer un rol de mute:**", `\`\`\`;muterol set <@rol>\`\`\``)
        .setTimestamp()
        .setColor("RED")

    
    //A MUTEAR//

    if(!muterol.tiene(message.guild.id)) return message.reply({embeds: [embednomuterol]})

    let muteroll = await muterol.obtener(message.guild.id)


    await persona.roles.remove(muteroll)
    
        const embedhecho = new Discord.MessageEmbed()
        .setDescription(`<a:perf:883357207473844264> **Se ha desmuteado a ${persona} con éxito.**`)
        .setTimestamp()
        .setColor("GREEN")

    message.reply({embeds: [embedhecho]})

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

