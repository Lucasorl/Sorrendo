const Discord = require("discord.js");
const { Client, MessageEmbed } = require("discord.js");
const db = require("megadb")
const muterol = new db.crearDB("muterol")

module.exports = {
  name: "muterol",
  alias: [],

async execute (client, message, args){

try{

    const roldb = await muterol.obtener(message.guild.id)
    const rolesta = message.guild.roles.resolve(roldb)

    let opciones = args[0]

        const embednoopcion = new Discord.MessageEmbed()
        .setDescription("**No has indicado una opción.**")
        .addField("**Sintaxis:**", `\`\`\`;${this.name} <set / unset> <@rol>\`\`\``)
        .setTimestamp()
        .setColor("RED")

    if(!opciones) return message.channel.send({ embeds: [embednoopcion] })

    if(opciones !== "set"){
        if(opciones !== "unset"){
                
                const embedopcionerror = new Discord.MessageEmbed()
                .setDescription("**Esa no es una opción válida para este comando.**")
                .addField("**Sintaxis:**", `\`\`\`;${this.name} <set / unset> <@rol>\`\`\``)
                .setTimestamp()
                .setColor("RED")

            return message.channel.send({ embeds: [embedopcionerror] })
        }
    }


    //PERMS//
    let perms = message.member.permissions.has("MANAGE_SERVER")
    
        const embedperms = new Discord.MessageEmbed()
        .setDescription("<a:no:868149064255041586> **No tienes permiso para ejecutar este comando.** <a:no:868149064255041586>")
        .setTimestamp()
        .setColor("RED")

    if(!perms) return message.channel.send({ embeds: [embedperms] })


    //ROL//
    let rol = message.mentions.roles.first()

        const embedrol = new Discord.MessageEmbed()
        .setDescription("**Debes mencionar un rol.**")
        .addField("**Sintaxis:**", `\`\`\`;${this.name} <set / unset> <@rol>\`\`\``)
        .setColor("RED")
        .setTimestamp()

    
    if(!rol){
        if(opciones !== "unset"){
            return message.channel.send({ embeds: [embedrol] })
        }
    } 




    if(opciones === "set"){

        

        //GUARDAR//
            const embedyaesta = new Discord.MessageEmbed()
            .setDescription("**Ya hay un rol registrado, para añadir otro debes eliminar el actual.**")
            .addField("**Rol registrado:**", `${rolesta} (\`${roldb}\`)`)
            .addField("**Eliminar el existente:**", `\`\`\`;${this.name} unset\`\`\``)
            .setColor("RED")
            .setTimestamp()

        if(muterol.tiene(message.guild.id)) return message.channel.send({ embeds: [embedyaesta] })

        muterol.establecer(message.guild.id, rol.id).then(() => {
            
            const embedhecho = new Discord.MessageEmbed()
            .setTitle("Rol registrado.")
            .setDescription(`<a:perf:883357207473844264> Se ha establecido ${rol} como el rol de muteo en este servidor.`)
            .setTimestamp()
            .setColor("GREEN")

        message.channel.send({ embeds: [embedhecho] })
        })

            

    } else {

        if(opciones === "unset"){

        

            //ELIMINAR//
                const embedyaesta = new Discord.MessageEmbed()
                .setDescription("**No hay un rol de muteo registrado.**")
                .addField("**Para registrar uno:**", `;${this.name} set <#canal>`)
                .setColor("RED")
                .setTimestamp()

            if(!muterol.tiene(message.guild.id)) return message.channel.send({ embeds: [embedyaesta] })

            muterol.eliminar(message.guild.id)

                const embedhecho = new Discord.MessageEmbed()
                .setTitle("Rol eliminado.")
                .setDescription(`<a:perf:883357207473844264> Se ha eliminado ${rolesta} de rol de  muteo.`)
                .setTimestamp()
                .setColor("GREEN")

            message.channel.send({ embeds: [embedhecho] })
        }

    } 

  

} catch(e) {
    
    const embedmal = new Discord.MessageEmbed()
    .setDescription("<a:no:883357207582896168> **Ha ocurrido un error.** <a:no:883357207582896168>")
    .addField("**Error:**", `\`\`\`${e}\`\`\``)
    .setTimestamp()
    .setColor("RED")
            
    return message.channel.send({embeds: [embedmal]})
    
    }


}
}

