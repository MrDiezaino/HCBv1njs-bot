const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("megadb");
let prefix_db = new db.crearDB("prefixes")
let inventario = new db.crearDB('inventario');
const token = process.env['token']

// Command Handler
const fs = require("fs");

// Con client.comandos creamos una coleccion donde almacenaremos la información de nuestros comandos.
client.comandos = new Discord.Collection()

// Variable que contiene los nombres de los archivos de la carpeta
let archivos = fs.readdirSync("./comandos").filter((f) => f.endsWith(".js"))

// Recorremos los elementos del Array archivos.
// Básicamente aquí obtendremos las propiedades que tiene el comando en su propia archivo.
for (var i of archivos) {
  let comando = require("./comandos/"+i)
  // Añadimos el comando a la colección, esto nos pedirá una clave y un valor.
  // La clave será el nombre del comando ("comando.nombre") y el valor será básicamente el objeto entero de comando.
  client.comandos.set(comando.nombre, comando)
  console.log(i + " fue cargado correctamente.")
}

client.on("ready", () => {
    console.log(`Bot ${client.user.tag} iniciado.`);
 });


client.on("message", async message => {

    if (message.author.bot) return;

// Si tiene un prefix custom, lo usa. Si no, usa el default que es "!"
let prefix = prefix_db.tiene(`${message.guild.id}`) ? await prefix_db.obtener(`${message.guild.id}`) : "!"

let args = message.content.slice(prefix.length).trim().split(/ +/g)
let command = args.shift().toLowerCase();
// El método get de client.comandos recibe la clave del comando, que básicamente es command
// Mediante el .find, buscamos si el comando se ha llamado usando alguno de sus alias.

let cmd = client.comandos.get(command) || client.comandos.find((c) => c.alias.includes(command))
if (cmd) {
  return cmd.run(client, message, args)
}

});

 client.login(token);