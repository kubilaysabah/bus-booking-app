import * as z from "zod"; 

declare module "zod" {
  export interface ZodIssue {
    code: string;
    expected: string;
    message: string;
    path: string[];
  }
}


declare global {
  export type FormState<T> = {
    [K in keyof T]?: {
      errors: string[] | undefined;
    };
  } & {
    success?: boolean;
    error?: string;
  } | undefined | null;
}
