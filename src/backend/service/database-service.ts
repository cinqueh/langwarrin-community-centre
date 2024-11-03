import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { DatabaseError, DataValidationError } from "../util/errors";
import FormRepository, { BaseRepository } from "../repository/base-repository";
import Mapper from "../mapper/mapper";
import xss from "xss";

export abstract class DatabaseService<Repository extends BaseRepository> {
    protected handleResponse<T, Q>(
        response: PostgrestSingleResponse<T>,
        onSuccess: (data: T) => Q            
    ): Q {
        if (!response.error) {
          return onSuccess(response.data as T);
        } else {
          console.error(response.error);
          throw new DatabaseError(response.error.message);
        }
    }

    protected sanitizeData<T>(data: T): T {
        for (const key in data) {
            if (typeof data[key] === "string") {
                data[key] = xss(data[key] as string) as T[typeof key];
            } else if (typeof data[key] === "object" && data[key] !== null) {
                // Recursively sanitize nested objects
                this.sanitizeData(data[key]);
            }
        }
        return data;
    }

    protected validateData<T>(
        data: T,
        doValidate: (data: T) => boolean
    ): T {
        // Sanitize all string properties, including nested ones
        const sanitizedData = this.sanitizeData(data);
    
        if (!doValidate(sanitizedData)) {
            const message = `Data validation error. Data is of invalid form: 
            ${JSON.stringify(sanitizedData)}`;
            throw new DataValidationError(message);
        }
    
        return sanitizedData;
    }

    protected repository: Repository;

    protected constructor(repository: Repository) {
        this.repository = repository;
    }
}

export default abstract class FormService<Repository extends FormRepository, MapFrom, MapTo>
    extends DatabaseService<Repository> {

    protected mapper: Mapper<MapFrom, MapTo>;

    protected constructor(repository: Repository, mapper: Mapper<MapFrom, MapTo>) {
        super(repository);
        this.mapper = mapper;
    }

    public async get(id: number): Promise<MapTo | undefined> {
        const response = await this.repository.get(id);

        return this.handleResponse(response, 
            (inquiries) => inquiries.length == 0 ? undefined : this.mapper.mapTo(inquiries[0]));
    }

    public async getAll(): Promise<MapTo[]> {
        const response = await this.repository.getAll();

        return this.handleResponse(response as PostgrestSingleResponse<MapFrom[]>, 
            (data) => data.map(member => 
                this.mapper.mapTo(member)
            )
        );
    }
}