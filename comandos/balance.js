const db = require("megadb");
let inventario = new db.crearDB('inventario');
let prefix_db = new db.crearDB("prefixes")

module.exports = {
  // Propiedades del Comando
  nombre: "balance",
  alias: ["b"],
  descripcion: "Muestra la cantidad de dinero que tienes",
  // Declaramos el run como async, para poder usar el await y obtener las promises de la BD, en caso contrario no podríamos hacer que el bot respondiera con ellas en los mensajes.
  run: async(client, message, args) => {

    // Si el jugador no está ya registrado...
    if(!inventario.tiene(message.author.id)) {
      let prefix = await prefix_db.obtener(message.guild.id)
      message.channel.send(`Aún no tienes un perfil creado... Empieza usando ${prefix}start`)
    } else {
      let dinero = await inventario.obtener('333369339086372865-datos-dinero', "-")
      message.channel.send(`Tienes ${dinero}$`)
    }
  }

}