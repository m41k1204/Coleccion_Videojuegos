#! /usr/bin/env node

console.log(
    'This script populates some test Developers and games to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Desarrolladora = require("./models/Desarrolladora");
  const Videojuego = require("./models/Videojuego");
  const Plataforma = require("./models/Plataforma");
  
  const lista_desarrolladoras = [];
  const lista_videojuegos = [];
  const lista_plataformas = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createDesarrolladora();
    await createVideojuegos();
    await createPlataforma();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.

  async function desarrolladoraCreate(index, nombre, pais, link) {
    const desarrolladora = new Desarrolladora({ 
      nombre: nombre, 
      pais: pais, 
      link: link
    });
    
    await desarrolladora.save();
    lista_desarrolladoras[index] = desarrolladora;
    console.log(`Desarrolladora agregada: ${nombre}`);
  }
  
  async function videojuegosCreate(index, desarrolladora, nombre, generos, plataforma) {
    
    const videojuego = new Videojuego({
        desarrolladora: desarrolladora, 
        nombre: nombre, 
        generos: generos,
        plataforma: plataforma, 
    });
  
    await videojuego.save();
    lista_videojuegos[index] = videojuego;
    console.log(`Videojuego agregado: ${nombre}`);
  }
  
  async function plataformaCreate(index, nombre ) {

    const plataforma = new Plataforma({
      nombre : nombre,
    });

    await plataforma.save();
    lista_plataformas[index] = plataforma;
    console.log(`Plataforma creada: ${nombre}`)
  
  }


  async function createDesarrolladora() {
    console.log("Agregando Desarrolladoras");
    await Promise.all([
      desarrolladoraCreate(0, "Ubisoft", "Francia", "https://www.ubisoft.com/es-mx/"),
      desarrolladoraCreate(1, "Activision-Blizzard", "Estados Unidos", "https://www.activisionblizzard.com/"),
      desarrolladoraCreate(2, "Relic", "Canada", "https://www.relic.com/"),
      desarrolladoraCreate(3, "Iron Gate Studio", "Suecia", "https://irongatestudio.se/"),
      desarrolladoraCreate(4, "Dice", "Suecia", "https://www.dice.se/"), 
      desarrolladoraCreate(5, "Digital Extrems", "Inglaterra", "https://www.digitalextremes.com/"),
      desarrolladoraCreate(6, "Forgotten Empires", "Estados Unidos", "https://www.forgottenempires.net/"),
      desarrolladoraCreate(7, "Valve","Estados Unidos", "https://www.valvesoftware.com/en/"),
      desarrolladoraCreate(8, "Respawn Ent.", "Estados Unidos", "https://www.respawn.com/"),
      desarrolladoraCreate(9, "Epic Games", "Estados Unidos", "https://store.epicgames.com/en-US/"),
      desarrolladoraCreate(10, "Nintendo", "Japon","https://www.nintendo.com/us/" ),
    ]);
  }
  
  async function createVideojuegos() {
    console.log("Agregando Videojuegos");
    await Promise.all([
      videojuegosCreate(0, lista_desarrolladoras[2], "Company of Heroes 2", ["RTS"], 'Steam'),
      videojuegosCreate(1, lista_desarrolladoras[5], "Warframe", ["Single Player", "Looter Shooter", "Multiplayer"], 'Steam'),
      videojuegosCreate(2, lista_desarrolladoras[6], "Age of Empires 2 Definitive Edition", ["RTS", "Single Player", "Multiplayer"], 'Steam'),
      videojuegosCreate(3, lista_desarrolladoras[7], "Counter Strike 2", ["Shooter", "Multiplayer"], 'Steam'),
      videojuegosCreate(4, lista_desarrolladoras[3], "Vallheim", ["Survival", "Cooperative"], 'Steam'),
      videojuegosCreate(5, lista_desarrolladoras[8], "Jedi Fallen Order", ["Soulslike","Single PLayer"], "Playstation"),
      videojuegosCreate(6, lista_desarrolladoras[9], "Fortnite", ["Multiplayer", "Battle Royale"], "EpicGames"),
      videojuegosCreate(7, lista_desarrolladoras[10], "Nintendo", ["Co-op"], "Nintendo"),
      
    ]);
  }
  

  async function createPlataforma() {
    console.log('Agregando Plataformas');
    await Promise.all([
      plataformaCreate(0, 'Steam'),
      plataformaCreate(1, 'Playstation'),
      plataformaCreate(2, 'Nintendo'), 
      plataformaCreate(3, 'EpicGames')
    ])
  }
 