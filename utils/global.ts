import Joi from "joi";
import { Genre } from "../models/animies.model";

export class ValidationSchema {
  private mediumTextRq(required?: boolean): Joi.Schema {
    return required
      ? Joi.string().min(5).max(30).required()
      : Joi.string().min(5).max(30);
  }

  private largeTextRq(required?: boolean): Joi.Schema {
    return required
      ? Joi.string().min(10).max(100).required()
      : Joi.string().min(10).max(100);
  }

  public createEpisode(): Joi.ObjectSchema<any> {
    return Joi.object({
      title: this.mediumTextRq(true),
      animie: this.mediumTextRq(true),
      url: this.largeTextRq(true),
      image: this.largeTextRq(true),
      description: this.largeTextRq(),
      episode_number: Joi.number().required(),
      season: Joi.number().required(),
    });
  }

  public updateEpisode(): Joi.ObjectSchema<any> {
    return Joi.object({
      title: this.mediumTextRq(),
      url: this.largeTextRq(),
      image: this.largeTextRq(),
      description: this.largeTextRq(),
    });
  }

  public createAnimie(): Joi.ObjectSchema<any> {
    return Joi.object({
      title: this.mediumTextRq(true),
      description: this.largeTextRq(true),
      image: this.largeTextRq(),
      genre: Joi.string()
        .valid(...Object.values(Genre))
        .required(),
    });
  }

  public updateAnime(): Joi.ObjectSchema<any> {
    return Joi.object({
      title: this.mediumTextRq(),
      description: this.largeTextRq(),
      image: this.mediumTextRq(),
      genre: Joi.string().valid(...Object.values(Genre)),
    });
  }
}
