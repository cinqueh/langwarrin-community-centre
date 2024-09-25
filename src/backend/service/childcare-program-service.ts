import ChildcareProgramRepository from "../repository/childcare-program-repository";
import { ChildcareProgramDTO } from "../dto/childcare/childcareprogram";
import DatabaseService from "./database-service";
import { ChildcareProgramMapper } from "../mapper/childcare-mapper"; // Import the correct mapper

export default class ChildcareProgramService extends DatabaseService<
  ChildcareProgramRepository,
  any, // Replace with the correct entity type
  ChildcareProgramDTO
> {
  constructor() {
    super(new ChildcareProgramRepository(), new ChildcareProgramMapper()); // Pass both the repository and mapper
  }

  public async addChildcareProgram(program: ChildcareProgramDTO) {
    const response = await this.repository.addChildcareProgram(program);
    return this.handleResponse(response, (data) => data);
  }

  public async getAllPrograms() {
    return await this.repository.getAll();
  }

  public async getProgramById(id: number) {
    return await this.repository.get(id);
  }
}