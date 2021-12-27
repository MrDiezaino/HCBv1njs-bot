const db = require("megadb");
let inventario = new db.crearDB('inventario');

module.exports = {
  nombre: "start",
  alias: [],
  descripcion: "Crea tu perfil y inventario",
  run: (client, message, args) => {

    // Si el jugador no está ya registrado...
    if(!inventario.tiene(message.author.id)) {
      inventario.establecer(message.author.id+'.datos.dinero', 1000)
      inventario.establecer(message.author.id+'.datos.exp', 1)
      message.channel.send("Bienvenido, tu perfil está listo para jugar")
    } else { // Si ya está registrado en la base de datos...
      message.channel.send("Ya tienes un perfil de jugador")
    }

  }
}