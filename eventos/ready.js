const Discord = require('discord.js');

module.exports = async (client) => {

    const array = [
        {
          name: ";help",
          type: "PLAYING"
        },
        {
          name: "KLK",
          type: "LISTENING"
        },
        {
          name: "Mejores bots de la historia",
          type: "COMPETING"
        },
        {
          name: "Cosas robóticas",
          type: "STREAMING"
        }
      ]
    
    
      
      setInterval(() => {
        function presence() {
          client.user.setPresence({
            status: "",
            activity: array[Math.floor(Math.random() * array.length)]
          }); 
        }
    
        presence();
      }, 10000)
    
      console.log("Klk")
      
}
