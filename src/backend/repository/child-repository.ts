import { ChildDTO } from "../dto/childcare/child";
import FormRepository from "./base-repository";

export default class ChildRepository extends FormRepository {
  public async addChild(child: ChildDTO) {
    const client = this.getSupabaseClient();

    const addChildData = {
      _childage: child.childAge,
      _childfirstname: child.childFirstName,
      _childsurname: child.childSurname,
    };

    return await client.rpc("add_child", addChildData);
  }

  public override async get(id: number) {
    const client = this.getSupabaseClient();

    return await client
      .from("child")
      .select("*")
      .eq("childid", id);
  }

  public async getAll() {
    const client = this.getSupabaseClient();

    return await client.from("child").select("*");
  }
}