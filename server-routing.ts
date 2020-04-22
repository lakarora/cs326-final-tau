let http = require('http');
let url = require('url');
let express = require('express');

export class Server {
    private server = express();
    private port = 8080;
    private router = express.Router();

    // Leave out database part for now
    constructor() {
        this.router.use((request, response, next) => {
            response.header('Content-Type','application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
        next();
        });

        // Serve static pages from a particular path.
        this.server.use('/', express.static('./static'));
        // Handle POST data as JSON
        this.server.use(express.json());
        this.router.post('/login/', this.loginHandler.bind(this));
        this.server.use('/', this.router);
    }
    
    private getServer() {
        return this.server;
    }
    private async loginHandler(request, response) : Promise<void> {

        // Leaving dummy code for now
        response.write(JSON.stringify(
            {
                'result': 'loggedIn'
            }
        ));
        response.end();
    }

    public listen(port) : void {
        return this.server.listen(port);
    }
}