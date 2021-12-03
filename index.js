const Discord = require("discord.js");
const { Client, Message, Guild} = require("discord.js");
const intents = new Discord.Intents(32767)
const client = new Client({ intents });
const fs = require("fs");
const db = require("megadb")
const { timeStamp } = require("console");
const { readdirSync } = require('fs');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');



//////---EVENT-HANDLER---//////
{
    for(const file of readdirSync("./eventos")){
        if(file.endsWith(".js")){
            let fileName = file.substring(0, file.length - 3)

            let fileContents = require(`./eventos/${file}`)

            client.on(fileName, fileContents.bind(null, client))
        }
    }
}
    

//////---COMMAND-HANDLER---//////
{
client.commands = new Discord.Collection();



const commandFiles = fs.readdirSync("./comandos").filter(file => file.endsWith(".js"));

for(const file of commandFiles){
    const command = require(`./comandos/${file}`)
    client.commands.set(command.name, command)

}


const modFiles = fs.readdirSync("./comandos/moderacion").filter(file => file.endsWith(".js"));

for(const file of modFiles){
    const command = require(`./comandos/moderacion/${file}`)
    client.commands.set(command.name, command)

}


const rolFiles = fs.readdirSync("./comandos/rol").filter(file => file.endsWith(".js"));

for(const file of rolFiles){
    const command = require(`./comandos/rol/${file}`)
    client.commands.set(command.name, command)

}


const configFiles = fs.readdirSync("./comandos/config").filter(file => file.endsWith(".js"));

for(const file of configFiles){
    const command = require(`./comandos/config/${file}`)
    client.commands.set(command.name, command)

}

}

process.on('unhandledRejection', (e) => console.error(e))


client.login("OTE2MDc4MDgwNzI3MDg1MTM2.Yak6Mg.kE6RHkiArqupeSi5J3Ubyyu4QBE")