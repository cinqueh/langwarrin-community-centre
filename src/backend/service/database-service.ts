import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { DatabaseError, DataValidationError } from "../util/errors";
import BaseRepository from "../repository/base-repository";
import Mapper from "../mapper/mapper";

export default abstract class DatabaseService<Repository extends BaseRepository, MapFrom, MapTo> {
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

    protected validateData<T>(
        data: T,
        doValidate: (data: T) => boolean
    ) {
        if (!doValidate(data)) {
            const message = `Data validation error. Data is of invalid form: ${data}`;
            throw new DataValidationError(message);
        }
    }

    protected repository: Repository;
    protected mapper: Mapper<MapFrom, MapTo>;

    protected constructor(repository: Repository, mapper: Mapper<MapFrom, MapTo>) {
        this.repository = repository;
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