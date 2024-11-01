import BuilderService from "./builder-service";
import NewsInformation from "../dto/news";
import NewsMapper from "../mapper/news-mapper";

export default class NewsService {
  public async getNews(): Promise<NewsInformation[]> {
    const builderService = new BuilderService();
    const mapper = new NewsMapper();

    // get only news pages
    const programPages = (await builderService.getAllPages())
                            .filter(
                                program => {
                                    const url = program.data?.url;
                                    return url && /^\/news\//.test(url);
                                }
                            );

    // map each page to the program information
    return programPages
                .map(page => mapper.mapTo(page))
                .filter(mapped => mapped) as NewsInformation[];
  }
}