import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get, Post, Put, Delete } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Logger } from '@overnightjs/logger';
import { BankService } from '../services/bank-service';
import { bankSchema } from '../validators/bank-schema'

@Controller('api/banks')
export class BanksController {
  bankService = new BankService();

  constructor(){
    this.bankService.connect();
  }

  @Get(':id')
  private async get(req: Request, res: Response) {
    try {
      const bank = await this.bankService.getById(req.params.id);
      Logger.Info('Get: ' + req.params.id);
      return res.status(OK).json(bank);
    } catch (err) {
      Logger.Err(err, true);
      return res.status(BAD_REQUEST).json({
        error: err.message,
      });
    }
  }

  @Get('')
  private async getAll(req: Request, res: Response) {
    try {
      const banks = await this.bankService.getAll();

      Logger.Info(req.query, true);
      return res.status(OK).json(banks);
    } catch (err) {
      Logger.Err(err, true);
      return res.status(BAD_REQUEST).json({
        error: err.message,
      });
    }
  }

  @Post()
  private async insert(req: Request, res: Response) {
    try {
      const bank = req.body;
      await bankSchema.validateAsync(bank);
      const obj = await this.bankService.create(
        req.body.name,
        req.body.swiftCode
      );

      Logger.Info(req.body, true);
      return res.status(OK).json({ id: obj.insertedId });
    } catch (err) {
      Logger.Err(err, true);
      return res.status(BAD_REQUEST).json({
        error: err.message,
      });
    }
  }

  @Put(':id')
  private async update(req: Request, res: Response) {
    try {
      const bank = req.body;
      await bankSchema.validateAsync(bank);
      const ret = await this.bankService.update(
        req.params.id,
        req.body.name,
        req.body.swiftCode
      );

      Logger.Info('Body: ' + req.body, true);
      return res.status(OK).json(ret);
    } catch (err) {
      Logger.Err(err, true);
      return res.status(BAD_REQUEST).json({
        error: err.message,
      });
    }
  }

  @Delete(':id')
  private async delete(req: Request, res: Response) {
    try {
      const ret = await this.bankService.delete(req.params.id);

      Logger.Info('Delete: ' + req.params.id, true);
      return res.status(OK).json(ret);
    } catch (err) {
      Logger.Err(err, true);
      return res.status(BAD_REQUEST).json({
        error: err.message,
      });
    }
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

export default BanksController;
