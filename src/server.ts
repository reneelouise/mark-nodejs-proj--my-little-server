import express from "express";
import ponyData from "../data/ponies.json";
import { seasonOneEpisodes } from "./episodes";
import { pickRandom } from "./random";




const app = express();
const serverStartDate = new Date();
let serverHitCount = 0;
let historyArray: string[] = [];

app.get("/", (req, res) => {
  historyArray.push("/");
  res.send(
    "This is the default path - and it isn't very interesting, sorry. \nTry visiting localhost:4000/creation-time, localhost:4000/current-time"
  );
});

app.get("/creation-time", (req, res) => {
  historyArray.push("/creation-time");
  res.json({
    message: `The server was started at ${serverStartDate.toTimeString()}`,
    utc: serverStartDate.toUTCString(),
    countedAsHit: false,
  });
});

app.get("/current-time", (req, res) => {
  historyArray.push("/current-time");
  const dateOfRequestHandling = new Date();
    res.json({
    message: `The current date is ${dateOfRequestHandling.toTimeString()}`,
    utc: dateOfRequestHandling.toUTCString(),
    countedAsHit: false,
  });
});

app.get("/hits", (req, res) => {
  historyArray.push("/hits");
  serverHitCount += 1;
  res.json({
    note: "We've registered your hit!",
    currentTotal: serverHitCount,
    countedAsHit: true,
  });
});

app.get("/hits-stealth", (req, res) => {
  historyArray.push("/hits-stealth");
  res.json({
    note: "Oooh, you ninja. We didn't count that hit.",
    currentTotal: serverHitCount,
    countedAsHit: false,
  });
});

app.get("/ponies", (req, res) => {
  historyArray.push("/ponies");
  res.json({
    message: "Loaded dummy JSON data:",
    data: ponyData,
    countedAsHit: false,
  });
});

app.get("/season-one", (req, res) => {
  historyArray.push("/season-one");
  res.json({
    countedAsHit: false,
    data: seasonOneEpisodes,
  });
});

app.get("/season-one/random", (req, res) => {
  historyArray.push("/season-one/random");
  const randomEpisode = pickRandom(seasonOneEpisodes);
  res.json({
    countedAsHit: false,
    data: randomEpisode,
  });
});


//added endpoints

//hello-world

app.get("/hello-world", (req, res) => {
  historyArray.push("/hello-world");
  res.send({
    "english": "Hello world!",
    "esperanto": "Saluton mondo!",
    "hawaiian": "Aloha Honua",
    "turkish": "Merhaba Dünya!"
  })
});


//ponies/random
/* 
loop through ponies.json members array
create a variable called Ponies
set that equal to the array of ponies
select a random object from the array, by setting the array index to
Math.floor(Math.random()*array.length)




*/

app.get("/ponies/random", (req, res) => {

  historyArray.push("/ponies/random");
  const randomPony = pickRandom(ponyData.members);

  res.send(
    randomPony   
   
  )
});


//history

/* 
create a history route
create an empty array called routes
if a valid site has been visited, then push that site into the route array

*/

app.get("/history", (req, res) =>{

  res.json({"routes": historyArray})
});







// using 4000 by convention, but could be changed
const PORT_NUMBER = 5050;

app.listen(PORT_NUMBER, () => {
  console.log(
    `If you can see this message in the console, this means that you successfully started the server! \n\nYou can see 
    what comes back by visiting localhost:${PORT_NUMBER} in your browser. \n\nChanges will not be processed unless you restart your server (close and restart). \n\nThe server is currently listening for requests - press Ctrl + C to quit.`
  );
});
