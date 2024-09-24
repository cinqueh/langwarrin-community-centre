import ChildRepository from "../repository/child-repository";
import { ChildDTO } from "../dto/childcare/child";
import DatabaseService from "./database-service";
import { ChildMapper } from "../mapper/childcare-mapper"; // Import the correct mapper

export default class ChildService extends DatabaseService<
  ChildRepository,
  any, // Replace with the correct entity type
  ChildDTO
> {
  constructor() {
    super(new ChildRepository(), new ChildMapper()); // Pass both the repository and mapper
  }

  public async addChild(child: ChildDTO) {
    const response = await this.repository.addChild(child);
    return this.handleResponse(response, (data) => data);
  }

  public async getAllChildren() {
    return await this.repository.getAll();
  }

  public async getChildById(id: number) {
    return await this.repository.get(id);
  }
}
