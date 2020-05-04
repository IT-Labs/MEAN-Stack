import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import TestController from './controllers/test-controller';
import CompaniesController from './controllers/companies-controller';


class MeanStackServer extends Server {
    
    private readonly SERVER_START_MSG = 'Server started on port: ';
    private readonly DEV_MSG = 'Express Server is running in development mode. ' +
    'No front-end content is being served.';

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        super.addControllers(new TestController());
        super.addControllers(new CompaniesController());

        // Point to front-end code
        if (process.env.NODE_ENV !== 'production') {
            console.log('Starting server in development mode');
            const msg = this.DEV_MSG + process.env.EXPRESS_PORT;
            this.app.get('*', (req, res) => res.send(msg));
        }
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_START_MSG + port);
        });
    }
}

export default MeanStackServer;