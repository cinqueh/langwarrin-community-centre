import BaseRepository from "./base-repository";
import { ChildDTO } from "../dto/childcare/child";

export default class ChildRepository extends BaseRepository {
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