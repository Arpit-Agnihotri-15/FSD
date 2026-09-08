import http from "http";

const server = http.createServer(); // turn on the server and the number of times request comes respond 
server.on('request',(req,res)=>{
    res.end("<h1>SIH Internal</h1>");
});

server.listen(5000, ()=>{
    console.log("SIH Server is Running")
});