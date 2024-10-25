import BaseRepository from "./base-repository";
import { ChildcareSessionDTO } from "../dto/childcare/childcaresession";
import FormRepository from "./base-repository";

export default class ChildcareSessionRepository extends FormRepository {
  public async addChildcareSession(session: ChildcareSessionDTO) {
    const client = this.getSupabaseClient();

    const addSessionData = {
      _day: session.day,
      _starttime: session.startTime,
      _endtime: session.endTime,
    };

    return await client.rpc("add_childcare_session", addSessionData);
  }

  public override async get(id: number) {
    const client = this.getSupabaseClient();

    return await client
      .from("childcaresession")
      .select("*")
      .eq("childcaresessionid", id);
  }

  public async getAll() {
    const client = this.getSupabaseClient();

    return await client.from("childcaresession").select("*");
  }
}