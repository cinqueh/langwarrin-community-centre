import ProgramInformation from "../dto/program";
import BuilderService, { BuilderOptions, BuilderPage } from "../service/builder-service";
import Mapper from "./mapper";

interface ProgramTitleOptions extends BuilderOptions {
    title: string;
}

interface ProgramImageOptions extends BuilderOptions {
    imageUrl: string;
}

export default class ProgramMapper implements Mapper<BuilderPage, ProgramInformation | undefined> {

    private builderService: BuilderService;

    public constructor() {
        this.builderService = new BuilderService();
    }

    public mapTo(page: BuilderPage): ProgramInformation | undefined {

        const titleCard = this.builderService.getFirstComponent(page, "Title Card With Back Button");
        const imageCard = this.builderService.getFirstComponent(page, "Program Image Card");

        if (!titleCard || !imageCard) {
            return undefined;
        }

        const title = this.builderService.getOptionsFromComponent<ProgramTitleOptions>(titleCard)?.title;
        const image = this.builderService.getOptionsFromComponent<ProgramImageOptions>(imageCard)?.imageUrl;
        const category = "";
        const bookable = !!this.builderService.getFirstComponent(page, "Information Card With Button");

        return new ProgramInformation({
            name: title,
            imageUrl: image,
            category: category,
            bookable: bookable,
        });

    }
}