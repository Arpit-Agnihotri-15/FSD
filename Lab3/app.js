import http from "http";
import * as teams from "./pages/teams.js";
import { parse as parseUrl } from "url";

const PORT = 5000;

const sendJson = (res, statusCode, data) => {
    res.writeHead(statusCode, {
        "Content-Type": "application/json"
    });

    res.end(data === undefined ? "" : JSON.stringify(data));
};

const parseJSONBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = "";

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

const server = http.createServer(async (req, res) => {

    const { pathname, query } = parseUrl(req.url, true);
    const { method } = req;

    console.log("pathname:", pathname);
    console.log("query:", query);
    console.log("Method:", method);

    if (pathname === "/api/v1/teams" && method === "GET") {

        const allTeams = teams.getAllTeams();

        return sendJson(res, 200, allTeams);
    }

    else if (pathname === "/api/v1/teams" && method === "POST") {

        const newTeam = await parseJSONBody(req);

        const team = teams.addTeam(newTeam);

        return sendJson(res, 201, team);
    }

    else {

        res.statusCode = 404;
        res.end("Not Found");
    }
});

server.listen(PORT, () => {
    console.log("SIH Server is Running");
});