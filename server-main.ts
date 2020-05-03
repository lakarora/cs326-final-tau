'use strict';

import { Server } from './server-routing';
import { Database } from './../cs326-final-tau/mongo-database';

const database = new Database();
const theServer = new Server(database);
theServer.listen(process.env.PORT);