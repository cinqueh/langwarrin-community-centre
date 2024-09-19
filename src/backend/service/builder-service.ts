import Mapper from "../mapper/mapper";

const BUILDER_CONTENT_API_URL = 'https://cdn.builder.io/api/v2/content';

export interface BuilderOptions {

}

interface BuilderComponent {
    name: string;
    options: BuilderOptions;
}
  
interface BuilderBlock {
    component?: BuilderComponent;
}
  
interface BuilderPage {
    data?: {
        blocks?: BuilderBlock[];
    };
}


export default class BuilderService {

    private getContentUrl(contentType: string): string {
        const now = new Date().toISOString();
        return `${BUILDER_CONTENT_API_URL}/${contentType}?apiKey=${process.env.NEXT_PUBLIC_BUILDER_API_KEY}&time=${now}`
    }

    public async getAllPages(): Promise<BuilderPage[]> {
        
        const url = this.getContentUrl("page");

        console.log(url);

        const res = await fetch(url);
        const data = await res.json();

        return data.results;
    }

    public async getAllComponents(componentName: string): Promise<BuilderBlock[]> {
        const componentInstances: BuilderBlock[] = [];
        const pages: BuilderPage[] = await this.getAllPages();
      
        pages.forEach(page => {
          if (page?.data?.blocks) {
            page.data.blocks.forEach(block => {
              if (block?.component?.name === componentName) {
                componentInstances.push(block);
              }
            });
          }
        });
      
        return componentInstances;
    }

    public async getAllOptionsMapped<T>(componentName: string, mapper: Mapper<BuilderOptions, T>) {
        try {
            return (await this.getAllComponents(componentName))
              .filter(item => item?.component?.options)
              .map(item => {
                  const options = item?.component?.options as BuilderOptions;
                  return mapper.mapTo(options);
            });
        }
        catch {
            return [];
        }
    }

}