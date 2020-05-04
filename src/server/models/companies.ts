import { prop, Typegoose } from 'typegoose';

export class Companies extends Typegoose{
  public id?: string;
  @prop()
  public name?: string;
  @prop()
  public taxNumber?: number;
  @prop()
  public address?: string;
  @prop()
  public city?: string;
  @prop()
  public zipCode?: string;
  @prop()
  public state?: string;
  @prop()
  public country?: string;
  @prop({default: new Date()})
  public created?: Date;
}

