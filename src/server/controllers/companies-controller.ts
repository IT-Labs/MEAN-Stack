import { OK, BAD_REQUEST } from "http-status-codes";
import {
  Controller,
  Middleware,
  Get,
  Post,
  Put,
  Delete,
} from "@overnightjs/core";
import { Request, Response } from "express";
import { Logger } from "@overnightjs/logger";
import { CompanyService } from "../services/company-service";

@Controller("api/companies")
export class CompaniesController {
  constructor() {
    Logger.Info("CompaniesController Constructor Called");
  }

  @Get(":id")
  private async get(req: Request, res: Response) {
    try {
      let companyService = new CompanyService();
      await companyService.connect();
      let company = await companyService.getById(req.params.id);

      Logger.Info("Get: " + req.params.id);
      return res.status(OK).json(company);
    } catch (err) {
      Logger.Err(err, true);
      return res.status(BAD_REQUEST).json({
        error: err.message,
      });
    }
  }

  @Get("")
  private async getAll(req: Request, res: Response) {
    try {
      let companyService = new CompanyService();
      await companyService.connect();
      let companies = await companyService.getAll();

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
      let companyService = new CompanyService();
      await companyService.connect();
      let obj = await companyService.create(
        req.body["name"],
        req.body["taxNumber"],
        req.body["address"],
        req.body["city"],
        req.body["zipcode"],
        req.body["state"],
        req.body["country"]
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

  @Put(":id")
  private async update(req: Request, res: Response) {
    try {
      let companyService = new CompanyService();
      await companyService.connect();
      let ret = await companyService.update(
        req.params.id,
        req.body["name"],
        req.body["taxNumber"],
        req.body["address"],
        req.body["city"],
        req.body["zipcode"],
        req.body["state"],
        req.body["country"]
      );

      Logger.Info(req.body, true);
      return res.status(OK).json(ret);
    } catch (err) {
      Logger.Err(err, true);
      return res.status(BAD_REQUEST).json({
        error: err.message,
      });
    }
  }

  @Delete(":id")
  private async delete(req: Request, res: Response) {
    try {
      let companyService = new CompanyService();
      await companyService.connect();
      let ret = await companyService.delete(req.params.id);

      Logger.Info("Delete: " + req.params.id, true);
      return res.status(OK).json(ret);
    } catch (err) {
      Logger.Err(err, true);
      return res.status(BAD_REQUEST).json({
        error: err.message,
      });
    }
  }

  @Post(":id/companybank")
  private async insertCompanyBank(req: Request, res: Response) {
    try {
        let companyService = new CompanyService();
        await companyService.connect();
        let ret = await companyService.addCompanyBank(
          req.params.id,
          req.body["bankId"],
          req.body["bankName"],
          req.body["currency"],
          req.body["accountNumber"]
        );
  
        Logger.Info("InsertCompanyBank: " + req.body, true);
        return res.status(OK).json(ret);
      } catch (err) {
        Logger.Err(err, true);
        return res.status(BAD_REQUEST).json({
          error: err.message,
        });
      }
  }

  @Delete(":id/companybank/:bankid")
  private async deleteCompanyBank(req: Request, res: Response) {
    try {
        let companyService = new CompanyService();
        await companyService.connect();
        let ret = await companyService.deleteCompanyBank(req.params.id, req.params.bankid);
  
        Logger.Info("DeleteCompanyBank id:" + req.params.id + ", bankid: " + req.params.bankid, true);
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
