import http from "http";
import * as teams from "./pages/teams.js";

const PORT = 5000;

const sendJson = (res, statusCode, data) => {
    res.writeHead(statusCode, {"content-type": "application/json"});
    res.end(data === 'undefined' ? '' : JSON.stringify(data));
};

const parseJSONBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (error) {
                reject(error);
            }
        });
    });
};

//console.log("Teams:", teams.getAllTeams());
const server = http.createServer((req, res) => {
    //if (req.url === "/" && req.method === "GET") {
    //    const allTeams = teams.getAllTeams();
    //    res.writeHead(200, { "Content-Type": "application/json" });
    //    res.end(JSON.stringify(allTeams));
    //} else 
    //    res.statusCode = 404;
    //    res.end("Not Found");
    //}
});

server.listen(PORT, () => {
    console.log("SIH Server is Running");
});