import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Logger } from '@overnightjs/logger';

@Controller('api/companies')
export class CompaniesController {

    constructor() {
        Logger.Info("CompaniesController Constructor Called");
    }

    @Get(':id')
    private get(req: Request, res: Response) {
        Logger.Info("Get: " + req.params.id);
        return res.status(OK).json({
            message: `getById_called: ${req.params.id}`,
        });
    }

    @Get('')
    private getAll(req: Request, res: Response) {
        Logger.Info(req.query, true);
        return res.status(OK).json({
            message: 'get_all_called',
        });
    }

    @Post()
    private insert(req: Request, res: Response) {
        Logger.Info("Post: " + req.body, true);
        return res.status(OK).json({
            message: 'post_called',
        });
    }

    @Put(':id')
    private update(req: Request, res: Response) {
        Logger.Info("Put, Id: " + req.params.id + ", body: " + req.body);
        return res.status(OK).json({
            message: 'put_called',
        });
    }

    @Delete(':id')
    private delete(req: Request, res: Response) {
        Logger.Info("Delete: " + req.params, true);
        return res.status(OK).json({
            message: 'delete_called',
        });
    }

    @Get(/ane/) // Rexes supported. Matches /lane, /cane, etc.
    public getAne(req: Request, res: Response): any {
        return res.status(OK).json({
            message: '/ane/',
        });
    }

    @Get('practice/async')
    private async getWithAsync(req: Request, res: Response) {
        try {
            const asyncMsg = await this.asyncMethod(req);
            return res.status(OK).json({
                message: asyncMsg,
            });
        } catch (err) {
            Logger.Err(err, true);
            return res.status(BAD_REQUEST).json({
                error: err.message,
            });
        }
    }

    private asyncMethod(req: Request): Promise<string> {
        return new Promise((resolve) => {
            resolve(req.originalUrl + ' called');
        });
    }
}

export default CompaniesController;