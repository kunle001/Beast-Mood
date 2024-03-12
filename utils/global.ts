import Joi from "joi";
import { Genre } from "../models/animies.model";

export class ValidationSchema {
    private mediumTextRq(required?: boolean): Joi.Schema {
        return required ? Joi.string().min(5).max(30).required() :
            Joi.string().min(5).max(30)
    }

    private largeTextRq(required?: boolean): Joi.Schema {
        return required ? Joi.string().min(10).max(100).required() :
            Joi.string().min(10).max(100)
    }

    public createEpisode(): Joi.ObjectSchema<any> {
        console.log("Got to validation")
        return Joi.object({
            title: this.mediumTextRq(true),
            url: this.mediumTextRq(true),
            image: this.mediumTextRq(true),
            description: this.largeTextRq()
        })
    }

    public updateEpisode(): Joi.ObjectSchema<any> {
        return Joi.object({
            title: this.mediumTextRq(),
            url: this.mediumTextRq(),
            image: this.mediumTextRq(),
            description: this.largeTextRq()
        })
    }

    public createAnimie(): Joi.ObjectSchema<any> {
        return Joi.object({
            title: this.mediumTextRq(true), 
            description: this.largeTextRq(true), 
            image : this.mediumTextRq,
            genre: Joi.string().valid(Genre).required()
        })
    }

}
