import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get, Post, Put, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import { Companies } from '../models/companies';
import * as mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import { ObjectID } from 'mongodb';

@Controller('api/companies')
class CompaniesController {
  uri =
    'mongodb+srv://testuser:o98wHwKDlGeW7QaK@testcluster-qhjws.mongodb.net/test?retryWrites=true&w=majority';
  client = new MongoClient(this.uri, { useUnifiedTopology: true });

  @Get()
  private getAll(req: Request, res: Response) {
    this.client.connect((err) => {
      if (err) {
        res.send(err);
        return;
      }
      const db = this.client.db('mean_stack');
      db.collection('companies')
        .find({})
        .toArray((collectionError, result) => {
          if (collectionError) {
            res.send(collectionError);
            return;
          }
          res.send(result);
        });
    });
  }

  @Get(':id')
  private getById(req: Request, res: Response) {
    this.client.connect((err) => {
      if (err) {
        res.send(err);
        return;
      }
      const db = this.client.db('mean_stack');
      db.collection('companies').findOne(
        { _id: ObjectID.createFromHexString(req.params.id) },
        (collectionError, result) => {
          if (collectionError) {
            res.send(collectionError);
            return;
          }
          res.send(result);
        }
      );
    });
  }

  @Post()
  private create(req: Request, res: Response) {
    const company = new Companies();
    company.name = req.body.name;
    company.taxNumber = req.body.taxNumber;
    company.address = req.body.address;
    company.city = req.body.city;
    company.zipCode = req.body.zipCode;
    company.state = req.body.state;
    company.country = req.body.country;
    company.created = new Date();

    this.client.connect((err) => {
      if (err) {
        res.send(err);
        return;
      }
      const db = this.client.db('mean_stack');
      db.collection('companies').insertOne(
        company,
        (collectionError, result) => {
          if (collectionError) {
            res.send(collectionError);
            return;
          }
          res.send(result);
        }
      );
    });
  }

  @Put(':id')
  private update(req: Request, res: Response) {
    const company = new Companies();
    company.name = req.body.name;
    company.taxNumber = req.body.taxNumber;
    company.address = req.body.address;
    company.city = req.body.city;
    company.zipCode = req.body.zipCode;
    company.state = req.body.state;
    company.country = req.body.country;
    company.created = new Date();

    this.client.connect((err) => {
      if (err) {
        res.send(err);
        return;
      }
      const db = this.client.db('mean_stack');
      db.collection('companies').updateOne(
        { _id: ObjectID.createFromHexString(req.params.id) },
        { $set: company },
        (collectionError, result) => {
          if (collectionError) {
            res.send(collectionError);
            return;
          }
          res.send(result);
        }
      );
    });
  }

  @Delete(':id')
  private deleteById(req: Request, res: Response) {
    this.client.connect((err) => {
      if (err) {
        res.send(err);
        return;
      }
      const db = this.client.db('mean_stack');
      db.collection('companies').deleteOne(
        { _id: ObjectID.createFromHexString(req.params.id) },
        (collectionError, result) => {
          if (collectionError) {
            res.send(collectionError);
            return;
          }
          res.send(result);
        }
      );
    });
  }
}

export default CompaniesController;
