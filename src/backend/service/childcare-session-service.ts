import ChildcareSessionRepository from "../repository/childcare-session-repository";
import { ChildcareSessionDTO } from "../dto/childcare/childcaresession";
import DatabaseService from "./database-service";
import { ChildcareSessionMapper } from "../mapper/childcare-mapper"; // Import the correct mapper

export default class ChildcareSessionService extends DatabaseService<
  ChildcareSessionRepository,
  any, // Replace with the correct entity type
  ChildcareSessionDTO
> {
  constructor() {
    super(new ChildcareSessionRepository(), new ChildcareSessionMapper()); // Pass both the repository and mapper
  }

  public async addChildcareSession(session: ChildcareSessionDTO) {
    const response = await this.repository.addChildcareSession(session);
    return this.handleResponse(response, (data) => data);
  }

  public async getAllSessions() {
    return await this.repository.getAll();
  }

  public async getSessionById(id: number) {
    return await this.repository.get(id);
  }
}