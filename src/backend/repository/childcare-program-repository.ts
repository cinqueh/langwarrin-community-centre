import BaseRepository from "./base-repository";
import { ChildcareProgramDTO } from "../dto/childcare/childcareprogram";

export default class ChildcareProgramRepository extends BaseRepository {
  public async addChildcareProgram(program: ChildcareProgramDTO) {
    const client = this.getSupabaseClient();

    const addProgramData = {
      _programname: program.programName,
      _childcaresessionid: program.childcareSessionId,
    };

    return await client.rpc("add_childcare_program", addProgramData);
  }

  public override async get(id: number) {
    const client = this.getSupabaseClient();

    return await client
      .from("childcareprogram")
      .select("*")
      .eq("childcareprogramid", id);
  }

  public async getAll() {
    const client = this.getSupabaseClient();

    return await client.from("childcareprogram").select("*");
  }
}