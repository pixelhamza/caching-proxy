const http = require("http");
const axios = require("axios");

function startServer({ port, origin, ttl }) {
    const cache = new Map();

    const server = http.createServer(async (req, res) => {
        const key = `${req.method}:${req.url}`;
        const now = Date.now();

        // cache hit
        if (req.method === "GET" && cache.has(key)) {
            const cached = cache.get(key);

            if (now < cached.expiresAt) {
                const body = JSON.stringify(cached.data);

                res.writeHead(200, {
                    "X-Cache": "HIT",
                });

                return res.end(body);
            }

            cache.delete(key);
        }

        // miss
        try {
            const response = await axios({
                method: req.method,
                url: origin + req.url,
            });

            let body; 
            if(typeof response.data==="string"){
                body=response.data;
            }
            else{
                body=JSON.stringify(response.data);
            }

            if (req.method === "GET") {
                cache.set(key, {
                    data: response.data,
                    expiresAt: now + ttl * 1000,
                });
            }

            res.writeHead(response.status, {
                "X-Cache": "MISS",
            });

            res.end(body);

        } catch (error) {
            if (res.headersSent) return;

            res.writeHead(502, {
                "X-Cache": "ERROR",
            });

            res.end("Something went wrong");
        }
    });

    server.listen(port, () => {
        console.log(`Caching proxy running on port ${port}`);
        console.log(`Forwarding requests to origin ${origin}`);
        console.log(`TTL: ${ttl}`);
    });
}

module.exports = { startServer };
