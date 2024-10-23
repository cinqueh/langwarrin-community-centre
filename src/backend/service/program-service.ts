import BuilderService from "./builder-service";
import ProgramMapper from "../mapper/program-mapper";
import ProgramInformation from "../dto/program";

export default class ProgramService {
  public async getPrograms(): Promise<ProgramInformation[]> {
    const builderService = new BuilderService();
    const mapper = new ProgramMapper();

    // get only program pages (excluding /programs and /programs/program-enrolment)
    const programPages = (await builderService.getAllPages())
                            .filter(
                                program => {
                                    const url = program.data?.url;
                                    return url && /^\/programs\/(?!program-enrolment)/.test(url);
                                }
                            );

    // map each page to the program information
    return programPages
                .map(page => mapper.mapTo(page))
                .filter(mapped => mapped) as ProgramInformation[];
  }
}