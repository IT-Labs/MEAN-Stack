import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get, Post, Put, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import { Companies } from '../models/companies'
import * as mongoose from 'mongoose';


@Controller('api/companies')
class CompaniesController{

    constructor(){
        mongoose.connect('mongodb+srv://testuser:o98wHwKDlGeW7QaK@testcluster-qhjws.mongodb.net/mean_stack?retryWrites=true&w=majority');
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useUnifiedTopology', true);
    }

    @Get()
    private getAll(req: Request, res: Response) {
        // this is get all companies endpoint
        const CompanyModel = new Companies().getModelForClass(Companies);
            (async () => {
                await CompanyModel.find((err,result) =>{
                    if(err){
                        res.send(err);
                        return;
                    }
                    res.send(result);
                });
          })();
    }

    @Get(':id')
    private getById(req: Request, res: Response) {
        const CompanyModel = new Companies().getModelForClass(Companies);
            (async () => {
                await CompanyModel.findById({_id: req.params.id}, (err,result) => {
                    if(err){
                        res.send(err);
                        return;
                    }
                    res.send(result);
                });
          })();
    }

    @Post()
    private create(req: Request, res: Response){
        const CompanyModel = new Companies().getModelForClass(Companies);
        (async () => {
            const company = new CompanyModel({
                name: req.body.name,
                taxNumber: req.body.taxNumber,
                address: req.body.address,
                city: req.body.city,
                zipCode: req.body.zipCode,
                state: req.body.state,
                country: req.body.country
        });
        company.save((err,result) => {
            if(err){
                res.send(err);
                return;
            }
            res.send(result);
        });
      })();
    }

    @Put(':id')
    private update(req: Request, res: Response){
        const CompanyModel = new Companies().getModelForClass(Companies);
        (async () => {
            const company = new CompanyModel({
                name: req.body.name,
                taxNumber: req.body.taxNumber,
                address: req.body.address,
                city: req.body.city,
                zipCode: req.body.zipCode,
                state: req.body.state,
                country: req.body.country
        });
        CompanyModel.findByIdAndUpdate(req.params.id, company, (err, result) => {
            if(err){
                res.send(err);
                return;
            }
            res.send(result)
        });
      })();
    }

    @Delete(':id')
    private deleteById(req: Request, res: Response){
        const CompanyModel = new Companies().getModelForClass(Companies);
        (async () => {
        CompanyModel.deleteOne({_id : req.params.id}, (err: string) => {
            if(err){
                res.send(err);
                return;
            }
            res.send('Deleted company with id: ' + req.params.id);
        });
      })();
    }
}

export default CompaniesController;
