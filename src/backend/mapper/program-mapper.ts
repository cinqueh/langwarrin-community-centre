import ProgramInformation from "../dto/program";
import BuilderService, { BuilderOptions, BuilderPage } from "../service/builder-service";
import Mapper from "./mapper";

interface ProgramTitleOptions extends BuilderOptions {
    title: string;
    category: string;
}

interface GeneralTitleOptions extends BuilderOptions {
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

        const programTitleCard = this.builderService.getFirstComponent(page, "Program Title Card");

        // search for Program Image Card, fallback to Program Image Card with padding
        let imageCard = this.builderService.getFirstComponent(page, "Image card with space");
        if (!imageCard) {
            imageCard = this.builderService.getFirstComponent(page, "Image Card with space");
        }

        // verify the page url exists
        if (!page.data?.url) {
            return undefined;
        }

        let title;
        let category = "";
        let image = "";

        if (programTitleCard) {
            const titleCard = this.builderService.getOptionsFromComponent<ProgramTitleOptions>(programTitleCard);
            title = titleCard?.title;
            category = titleCard?.category;
        }
        else if (titleCard) {
            title = this.builderService.getOptionsFromComponent<GeneralTitleOptions>(titleCard)?.title;
        }
        else {
            return undefined;
        }

        if (imageCard) {
            image = this.builderService.getOptionsFromComponent<ProgramImageOptions>(imageCard)?.imageUrl;
        }
        const bookable = !!this.builderService.getFirstComponent(page, "Information Card With Button");

        return new ProgramInformation({
            name: title,
            imageUrl: image,
            category: category,
            bookable: bookable,
            url: page.data?.url
        });
    }
}