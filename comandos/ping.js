module.exports = {
  // Propiedades del Comando
  nombre: "ping",
  alias: ["p"],
  descripcion: "Este comando te muestra el Ping",
  run: (client, message, args) => {
    return message.channel.send("Pong "+message.author.id)
  }
}