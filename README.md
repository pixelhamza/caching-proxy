# CACHING PROXY SERVER
This Project demonstrates a simple implementation of a cache proxy server designed in Javascript. 
This project runs an HTTP proxy server which caches the frequently passed request in the local memory using a HashMap.
This results in faster response time from the server for frequent requests

![image_alt](https://github.com/pixelhamza/caching-proxy/blob/f61d28632d3d560708fb368a68720e8de25f43e3/photo.jpg) 


## FUNCTIONALITIES
1. **In-Memory Cache** : Proxy uses an in-memory cache which i.e data is stored locally in the user's memory/ram.
2. **Proxy Server**:An HTTP server makes request on behalf of the user to the origin server and caches the response.
3. **Time to live**: the data in cache is stored in cache for a limited period of time preventing memory overload.
## LIMITATIONS 
1. This server uses a minimalistic design and hence is currenty not suitable for large data
2. Lack of storage: as the program uses in-memory cache ,it prevents us from handling large datasets due to memory limitatons

## Usage
1. Clone the repository 
```bash
git clone https://github.com/pixelhamza/caching-proxy
cd caching-proxy
```
2. Install dependencies using 
```bash
npm install
```
3. Start the server( make sure you are in the folder where the project is cloned) 
```bash
node parser.js -p <proxy> -o <origin_url> --ttl <time_in_seconds>
```
**Example**
```bash
node parser.js -p 3000 -o http://localhost:4000 --ttl 300
```
4. Send a GET Request
```bash
curl -i http://localhost:3000/test
```
5. Expected outputs
- On first request
  ```
  X-Cache: MISS
  ```
- On second request
  ```
  X-Cache: HIT
  ```

## CC
https://roadmap.sh/projects/caching-server
