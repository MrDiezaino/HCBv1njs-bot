const db = require("megadb");
let prefix_db = new db.crearDB("prefixes")

module.exports = {
  nombre: "changeprefix",
  alias: [],
  descripcion: "Cambiar prefix del bot",
  run: (client, message, args) => {
    // Primero comprobamos si el usuario tiene permisos para hacer esto, en este caso le pedimos "ADMINISTRADOR"
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("No tienes permisos para ejecutar este comando.")
    }

    // Comprobamos si el comando no tiene ningún argumento.
    if(!args[0]) {
      return message.channel.send("Necesitas colocar el prefix que quieres.")
    }

    prefix_db.establecer(`${message.guild.id}`, args[0])
    return message.channel.send("El prefix acaba de ser cambiado a "+ args[0])

  }
}