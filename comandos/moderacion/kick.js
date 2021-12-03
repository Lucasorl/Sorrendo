const Discord = require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  alias: ["kick"],

execute (client, message, args){
try{

   //PERMS//
   var perms = message.member.permissions.has("KICK_MEMBERS")

      const embedperms = new Discord.MessageEmbed()
      .setDescription("<a:no:883357207582896168> No tienes permiso para ejecutar este comando. <a:no:883357207582896168>")
      .setTimestamp()
      .setColor("RED")

   if(!perms) return message.channel.send({ embeds: [embedperms] })


   //USER//
   let user = message.mentions.members.first()

      const embednouser = new Discord.MessageEmbed()
      .setDescription("**No has indicado un usuario para ls expulsión.**")
      .setTimestamp()
      .setColor("RED")

   if(!user) return message.channel.send({ embeds: [embednouser] })


   //TÚ USER//
      const embedmismo = new Discord.MessageEmbed()
      .setDescription("<a:no:883357207582896168> **No te puedes kickear a ti mismo.**")
      .setTimestamp()
      .setColor("RED")

   if(user === message.author) return message.channel.send({ embeds: [embedmismo] })


   //YO USER//
      const embedyomismo = new Discord.MessageEmbed()
      .setDescription("<a:no:883357207582896168> **No te puedes kickear a ti mismo.**")
      .setTimestamp()
      .setColor("RED")

   if(user.id === client.user.id) return message.channel.send({ embeds: [embedyomismo] })
   

   //RAZÓN//
   var razon = args.slice(1).join(" ")
   if(!razon){
    razon = "No especificado"
   }


   //KICKEAO//
   message.guild.member(user).kick(razon);

      const embedkick = new Discord.MessageEmbed()
      .setAuthor(`${message.author}`)
      .setTitle(`${user} ha sido expulsado.`)
      .setDescription(`${message.author} ha expulsado a **${user}** por **${razon}**`)
      .setFooter(`Parece que no se ha portado muy bien... >:v`)
      .setColor("#833001")

   message.channel.send({ embeds: [embedkick] })
  
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
