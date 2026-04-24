import { Schema, SchemaDefinition, SchemaOptions } from "mongoose";

export const baseSchema = <T>(
  schema: SchemaDefinition<T>,
  options: SchemaOptions = {},
) =>
  new Schema(
    { ...schema },
    {
      timestamps: true,
      toJSON: {
        virtuals: true,
        versionKey: false,
        transform(_doc, ret: any) {
          ret.id = ret._id?.toString();
          delete ret._id;
        },
      },
      ...options,
    },
  );
