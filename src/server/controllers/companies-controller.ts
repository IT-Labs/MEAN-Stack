import { OK, BAD_REQUEST } from 'http-status-codes';
import {
  Controller,
  Middleware,
  Get,
  Post,
  Put,
  Delete,
} from '@overnightjs/core';
import { Request, Response } from 'express';
import { Logger } from '@overnightjs/logger';
import { CompanyService } from '../services/company-service';
import { companySchema } from '../validators/company-schema';

@Controller('api/companies')
export class CompaniesController {
  companyService = new CompanyService();

  constructor() {
    Logger.Info('CompaniesController Constructor Called');
    this.companyService.connect();
  }

  @Get(':id')
  private async get(req: Request, res: Response) {
    try {
      const company = await this.companyService.getById(req.params.id);

      Logger.Info('Get: ' + req.params.id);
      return res.status(OK).json(company);
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
      const companies = await this.companyService.getAll();
      Logger.Info(req.query, true);
      return res.status(OK).json(companies);
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
      const company = req.body;
      await companySchema.validateAsync(company);
      const obj = await this.companyService.create(company);
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
      const company = req.body;
      await companySchema.validateAsync(company);
      const ret = await this.companyService.update(req.params.id,company);
      Logger.Info(req.body, true);
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
      const ret = await this.companyService.delete(req.params.id);

      Logger.Info('Delete: ' + req.params.id, true);
      return res.status(OK).json(ret);
    } catch (err) {
      Logger.Err(err, true);
      return res.status(BAD_REQUEST).json({
        error: err.message,
      });
    }
  }

  @Post(':id/companybank')
  private async insertCompanyBank(req: Request, res: Response) {
    try {
      const account = req.body;
      const ret = await this.companyService.addCompanyBank(req.params.id, account);

      Logger.Info('InsertCompanyBank: ' + req.body, true);
      return res.status(OK).json(ret);
    } catch (err) {
      Logger.Err(err, true);
      return res.status(BAD_REQUEST).json({
        error: err.message,
      });
    }
  }

  @Delete(':id/companybank/:bankid')
  private async deleteCompanyBank(req: Request, res: Response) {
    try {
      const ret = await this.companyService.deleteCompanyBank(
        req.params.id,
        req.params.bankId
      );

      Logger.Info(
        'DeleteCompanyBank id:' +
          req.params.id +
          ', bankid: ' +
          req.params.bankId,
        true
      );
      return res.status(OK).json(ret);
    } catch (err) {
      Logger.Err(err, true);
      return res.status(BAD_REQUEST).json({
        error: err.message,
      });
    }
  }
}

export default CompaniesController;
