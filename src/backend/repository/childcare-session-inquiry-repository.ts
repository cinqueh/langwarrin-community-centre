import BaseRepository from "./base-repository";
import { ChildcareInquirySessionDTO } from "../dto/inquiry";
import FormRepository from "./base-repository";

export default class ChildcareInquirySessionRepository extends FormRepository {
  public async addChildcareInquirySession(session: ChildcareInquirySessionDTO) {
    const client = this.getSupabaseClient();

    const addSessionData = {
      _inquiryid: session.inquiryId,
      _childid: session.childId,
      _childcaresessionid: session.childcareSessionId,
    };

    return await client.rpc("add_childcare_inquiry_session", addSessionData);
  }

  public override async get(id: number) {
    const client = this.getSupabaseClient();

    return await client
      .from("childcareinquirysession")
      .select("*")
      .eq("inquiryid", id);
  }

  public async getAll() {
    const client = this.getSupabaseClient();

    return await client.from("childcareinquirysession").select("*");
  }
}