import http from "http";
import express from "express";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import fs from "fs";
import hls from "hls-server";
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
ffmpeg.setFfmpegPath(ffmpegInstaller.path)


const app = express();
const __dirname = fileURLToPath(new URL(".", import.meta.url));

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));


app.get("/", (req, res) => res.render("home"));
app.get("/api/video", (req, res) => res.status(200).send("you requested /api/video!!"));
app.get("/api/video/hls", (req, res) => res.render("hls_player"));
app.get("/api/video/zoom", (req, res) => res.render("zoom"));

app.get('/actuator/health/readiness',(req,res)=> res.status(200).send());
app.get('/actuator/health/readiness',(req,res)=> res.status(200).send());

app.get('/rest/video/:path/:file', (
  req, res
) => {
  const base64DecodeString = Buffer.from(req.params.path, 'base64').toString('utf8');

  // const basePath = "C:\\dev\\video\\";
  const basePath = "/cleverse_data/video/";
  const filePath = base64DecodeString
  const fileName = req.params.file
  
  const streamPath = path.join(basePath, filePath, fileName)
  
  console.log('filePath :', filePath)
  console.log('fileName :', fileName)
  console.log('streamPath :', streamPath)

  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Range');
  res.set('Access-Control-Expose-Headers', 'Content-Length, Content-Range');
  fs.readFile(streamPath, (err, cont) => {
      console.log(cont)
      if (err) {
          console.log(err);
          res.writeHead(500);
          res.end('Sorry, check with the site admin for error: ' + err.code + ' ..\n');
          res.end();
      } else {
          res.writeHead(200);
          res.end(cont, 'utf-8');
      }
  });
});

app.get('/rest/video/encodeVide',(req,res)=> {
  // const inputPath = '/cleverse_data/video/input/cleverse_mobile.mp4';
  // const outputPath = '/cleverse_data/video/output/mobile/cleverse_mobile.m3u8';
  const inputPath = 'C:\\dev\\video\\input\\cleverse_web.mp4';
const outputPath = 'C:\\dev\\video\\output\\web\\cleverse_mobile.m3u8';
  console.log('start')
  console.log('ffmpegInstaller.path : ' , ffmpegInstaller.path)
  console.log('inputPath : ' , inputPath)
  console.log('outputPath : ' , outputPath)
  
  ffmpeg(inputPath).addOption([
    '-profile:v baseline',
    '-level 3.0',
    '-start_number 0',
    '-hls_time 10',
    '-hls_list_size 0',
    '-f hls'
  ]).output(outputPath).on('end', () => {
    console.log('end');
  })
  .on('error', (err) => {
      console.error('Error during encoding:', err);
    })
  .run();
});

app.get('/actuator/health/readiness',(req,res)=> {
  res.status(200).send();
});
app.get('/actuator/health/readiness',(req,res)=> {
  res.status(200).send();
});





// server를 만들어서 wsServer에 넣는 이유는 http와 ws방식 모두 같은 서버, 같은 포트 사용하기 위해서이다.
const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);
httpServer.listen(8080);



// Web-RTC
wsServer.on("connection", (socket) => {
  socket.on("join_room", (roomName) => {
    socket.join(roomName);
    socket.to(roomName).emit("welcome2");
  });
  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });
  socket.on("answer", (answer, roomName) => {
    socket.to(roomName).emit("answer", answer);
  });
  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("ice", ice);
  });
});



// Socket-Chat
function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = wsServer;
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  console.log("publicRooms : ",publicRooms)
  return publicRooms;
}

function countRoom(roomName) {
  console.log("countRoom : ", wsServer.sockets.adapter.rooms.get(roomName)?.size)
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

wsServer.on("connection", (socket) => {
  socket["nickname"] = "Annonymouse";
  socket.onAny((event) => {
    console.log(`Socket Event:${event}`);
  });
  socket.on("enter_room", (roomName, enterRoom) => {
    socket.join(roomName);
    enterRoom()
    // console.log('socket : ',socket)
    socket.to(roomName).emit("welcome1", socket.nickname, countRoom(roomName));
    wsServer.sockets.emit("room_change", publicRooms());
  });
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1);
    });
  });
  socket.on("disconnect", () => {
    wsServer.sockets.emit("room_change", publicRooms());
  });
  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
    done();
  });
  socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
});



// new hls(server, {
//   provider: {
//     exists: (req, cb) => {
//       const ext = req.url.split(".").pop();

//       if (ext !== "m3u8" && ext !== "ts") {
//         return cb(null, true);
//       }

//       fs.access(__dirname + req.url, fs.constants.F_OK, function (err) {
//         if (err) {
//           console.log("File not exist");
//           return cb(null, false);
//         }
//         cb(null, true);
//       });
//     },
//     getManifestStream: (req, cb) => {
//       const stream = fs.createReadStream(__dirname + req.url);
//       cb(null, stream);
//     },
//     getSegmentStream: (req, cb) => {
//       const stream = fs.createReadStream(__dirname + req.url);
//       cb(null, stream);
//     },
//   },
// });
