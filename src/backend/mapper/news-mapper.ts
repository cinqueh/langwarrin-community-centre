import NewsInformation from "../dto/news";
import BuilderService, { BuilderOptions, BuilderPage } from "../service/builder-service";
import Mapper from "./mapper";

interface TitleOptions extends BuilderOptions {
    title: string;
}

interface ImageOptions extends BuilderOptions {
    imageUrl: string;
}

export default class NewsMapper implements Mapper<BuilderPage, NewsInformation | undefined> {

    private builderService: BuilderService;

    public constructor() {
        this.builderService = new BuilderService();
    }

    public mapTo(page: BuilderPage): NewsInformation | undefined {

        // search for title and image components
        const titleCard = this.builderService.getFirstComponentOfTypes(page, 
            ["Title Card", 
                "Title Card With Back Button", 
                "Green Title Card",
                "Program Title Card"
            ]);
        const imageCard = this.builderService.getFirstComponentOfTypes(page, 
            ["Program Image Card (with padding)", 
                "Image Card without padding", 
                "Program Image Card",
            ]);

        // verify the page is valid
        if (!titleCard || !imageCard || !page.data?.url) {
            return undefined;
        }

        const title = this.builderService.getOptionsFromComponent<TitleOptions>(titleCard)?.title;
        const imageUrl = this.builderService.getOptionsFromComponent<ImageOptions>(imageCard)?.imageUrl;

        return new NewsInformation({
            name: title,
            imageUrl: imageUrl,
            url: page.data?.url
        });
    }
}