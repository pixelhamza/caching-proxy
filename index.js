const{startServer}=require("./server");
const{Command}=require("commander")

const program=new Command(); 

program.name("cache-proxy")
.description("CLI-based Caching proxy server")
.requiredOption("-p,--port <number>","Port to run proxy on")
.requiredOption("-o","--origin <url>","Origin server URL")
.option("--ttl <seconds>","Cache TTL in seconds","60");

program.parse(); 

const options=program.opts();


startServer({
    port:Number(options.port),
    origin:options.origin,
    ttl:Number(options.ttl),
});


