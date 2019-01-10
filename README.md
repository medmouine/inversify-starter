#### Requirements


    npm install --global tsc-watch npm ntypescript typescript gulp-cli
    
It also requires a version of Node >=8.12.0
##### Run with command lines
    
    1. Clone git repository 
    2. npm install
    3. npm run build:<profile>
    4. node dist/index.js
    
##### Run with docker
    
    1. Clone git repository 
    2. docker build -t app:local .
    3. docker run -e ACTIVE_PROFILE=<profile> -p 5000:5000 -p 5001:5001 _[--network="host"]_ app:local
    