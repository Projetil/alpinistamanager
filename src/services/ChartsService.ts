/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import { HttpStatusCode } from "axios";
import { api } from "./api";
import { ICount, ICriticity, IHeader } from "../../types/ICharts";


const ChartsService = {
    GetHeader: async () => {
        try {
            const res = await api.get("/All/Header")

            return res.data as IHeader
        }
        catch(error: any){
            switch (error.statusCode) {
                case HttpStatusCode.BadRequest:
                  throw new ValidationError(error.body.erros);
                case HttpStatusCode.NotFound:
                  throw new NotFoundError();
                default:
                  throw new UnexpectedError();
              }
        }
    },
    GetCriticity: async () => {
        try {
            const res = await api.get("/All/Criticity")

            return res.data as ICriticity[]
        }
        catch(error: any){
            switch (error.statusCode) {
                case HttpStatusCode.BadRequest:
                  throw new ValidationError(error.body.erros);
                case HttpStatusCode.NotFound:
                  throw new NotFoundError();
                default:
                  throw new UnexpectedError();
              }
        }
    },
    GetRiskCount: async () => {
        try {
            const res = await api.get("/All/Count")

            return res.data as ICount[]
        }
        catch(error: any){
            switch (error.statusCode) {
                case HttpStatusCode.BadRequest:
                  throw new ValidationError(error.body.erros);
                case HttpStatusCode.NotFound:
                  throw new NotFoundError();
                default:
                  throw new UnexpectedError();
              }
        }
    },
}

export default ChartsService