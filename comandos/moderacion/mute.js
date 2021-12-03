const Discord = require("discord.js");
const { Client, MessageEmbed } = require("discord.js");
const db = require("megadb")
const muterol = new db.crearDB("muterol")
const ms = require("ms")

module.exports = {
  name: "mute",
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
    let permsyo = message.guild.me.permissions.has("BAN_MEMBERS")

      const embedpermsyo = new Discord.MessageEmbed()
      .setDescription("<a:no:883357207582896168> **No tengo permiso para realizar esta acción.** <a:no:883357207582896168>")
      .setTimestamp()
      .setColor("RED")

    if(!permsyo) return message.reply(({ embeds: [embedpermsyo] }))


    //USER//
    let persona = message.mentions.members.first()

      const embednouser = new Discord.MessageEmbed()
      .setDescription("**No has indicado un usuario para el mute.**")
      .addField("**Sintaxis:**", `\`;${this.name} <@miembro> <tiempo d/h/m/s> <razón>\``)
      .setTimestamp()
      .setColor("RED")

    if(!persona) return message.reply({ embeds: [embednouser] })


    //TÚ USER//
      const embedtuuser = new Discord.MessageEmbed()
      .setDescription("**No te puedes mutear a ti mismo.**")
      .setTimestamp()
      .setColor("RED")

    if(persona === message.author) return message.reply({ embeds: [embedtuuser] })


    //YO USER//
      const embedyouser = new Discord.MessageEmbed()
      .setDescription("**No me puedo automutear.**")
      .setTimestamp()
      .setColor("RED")

    if(persona.id === client.user.id) return message.reply({ embeds: [embedtuuser] })


    //TIEMPO//
    let tiempo = args[1]
      
      const embednotiempo = new Discord.MessageEmbed()
      .setDescription("**Debes especificar un tiempo.**")
      .addField("**Sintaxis:**", `\`;${this.name} <@miembro> <tiempo d/h/m/s> <razón>\``)
      .setTimestamp()
      .setColor("RED")

    if(!tiempo) return message.reply({ embeds: [embednotiempo] })

    let timer = ms(tiempo)


    //MOTIVO//
    let motivo = args.slice(2).join(" ")

      const embednomotivo = new Discord.MessageEmbed()
      .setDescription("**Debes especificar un motivo.**")
      .addField("**Sintaxis:**", `\`;${this.name} <@miembro> <tiempo d/h/m/s> <razón>\``)
      .setTimestamp()
      .setColor("RED")

    if(!motivo) return message.reply({ embeds: [embednomotivo] })


        const embednomuterol = new Discord.MessageEmbed()
        .setDescription("**Este servidor no tiene un rol de muteo establecido.**")
        .addField("**Para establecer un rol de mute:**", `\`\`\`;muterol set <@rol>\`\`\``)
        .setTimestamp()
        .setColor("RED")

    


    //A MUTEAR//

    if(!muterol.tiene(message.guild.id)) return message.reply({embeds: [embednomuterol]})

    let muteroll = await muterol.obtener(message.guild.id)


    await persona.roles.add(muteroll)
    
        const embedhecho = new Discord.MessageEmbed()
        .setDescription(`<:muted:899647197807788042> **Se ha muteado a ${persona} con éxito.**`)
        .addField("**Motivo:**", motivo)
        .addField("**Tiempo:**", tiempo)
        .addField("**Moderador:**", message.author.tag)
        .setTimestamp()
        .setColor("#833001")

    message.reply({embeds: [embedhecho]})


    setTimeout(async function () {
        await persona.roles.remove(muteroll);
    
          const embedfin = new Discord.MessageEmbed()
          .setDescription(`**Se ha acabado el tiempo de muteo de ${persona}.**`)
          .setTimestamp()
          .setColor("GREEN");
    
        message.reply({ embeds: [embedfin] });
    
    
    }, timer)

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

