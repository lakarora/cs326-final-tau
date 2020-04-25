'use strict';

import { Server } from './server-routing';
const theServer = new Server();
theServer.listen(process.env.PORT);