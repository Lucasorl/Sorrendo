const Discord = require('discord.js');
const db = require("megadb")
const linksch = new db.crearDB("linksch")
const modroles = new db.crearDB("modroles")


module.exports = async (client, message, guild) => {

    let prefix = ";"

    if(message.author.bot) return

    if(message.content === "Marcos"){
      message.reply("**Precaución, peligro por fracasado!**")
    }


    //--MENTION--//

    if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))){
      if(message.guild.id === "912382336476262460"){
        message.channel.send("Hola, soy **Sorrendo**, mi prefijo es \`;\`")
      } else{
        message.channel.send("Hola, soy <nombre>. Para ver mis comandos al completo, usa `;help`")
      }}
  


    //--DEFINICIONES--//
    if(!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command)


    //--COMANDO--//
    try{
        if(cmd){
            cmd.execute(client, message, args, prefix)
        } else {
            const embednoexiste = new Discord.MessageEmbed()
            .setDescription("<a:no:883357207582896168> **Ese comando no existe.**")
            .setColor("RED")
            .setTimestamp()

            message.channel.send({embeds: [embednoexiste]})
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



    //--ANTI-LINKS--//

    if(!linksch.tiene(message.guild.id, message.channel.id)){

        const embedlinksno = new Discord.MessageEmbed()
        .setDescription("<a:no:868149064255041586> **No puedes enviar links aquí.** <a:no:868149064255041586>")
        .setTimestamp()

  
      if(message.content.startsWith("discord.gg")){
        if(message.member.hasPermission("MANAGE_MESSAGES")){ 
         return;
        }
        
        message.delete()
        message.channel.send(embedlinksno)
      }
   
      if(message.content.startsWith("http")){
        if(message.member.hasPermission("MANAGE_MESSAGES")){ 
         return;
        }
        
        message.delete()
        message.channel.send(embedlinksno)
      }
     
      if(message.content.startsWith("https")){
        if(message.member.hasPermission("MANAGE_MESSAGES")){ 
         return;
        }
        
        message.delete()
        message.channel.send(embedlinksno)
      }
   
      if(message.content.startsWith("www.")){
        if(message.member.hasPermission("MANAGE_MESSAGES")){ 
         return;
        }
       
        message.delete()
        message.channel.send(embedlinksno)
      }

    }
}
