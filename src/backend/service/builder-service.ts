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
    children?: BuilderBlock[];
}
  
export interface BuilderPage {
    data?: {
        url?: string;
        blocks?: BuilderBlock[];
    };
}


export default class BuilderService {

    public async getAllPages(): Promise<BuilderPage[]> {
        let allPages: BuilderPage[] = [];
        let hasMore = true;
        let offset = 0;
        const limit = 100; // Set a limit to how many pages are fetched per request
    
        while (hasMore) {
            const url = `${BUILDER_CONTENT_API_URL}/page?apiKey=${process.env.NEXT_PUBLIC_BUILDER_API_KEY}&limit=${limit}&offset=${offset}`;
            const res = await fetch(url);
            const data = await res.json();
    
            allPages = allPages.concat(data.results);
    
            // If the results length is less than the limit, no more pages to fetch
            if (data.results.length < limit) {
                hasMore = false;
            }
    
            // Increment the offset for the next batch of pages
            offset += limit;
        }
    
        return allPages;
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

    public getFirstComponent(page: BuilderPage, componentName: string): BuilderComponent | undefined {
        const searchBlocks = (blocks: BuilderBlock[]): BuilderBlock | undefined => {
            for (const block of blocks) {
                console.log(block?.component?.name);
    
                // If the block matches the component name, return it
                if (block?.component?.name === componentName) {
                    return block;
                }
    
                // If the block has children, recursively search the children
                if (block?.children && block.children.length > 0) {
                    const foundBlock = searchBlocks(block.children);
                    if (foundBlock) {
                        return foundBlock; // Return the matching block found in children
                    }
                }
            }
            return undefined; // If no matching block is found
        };
    
        // Start the search from the top-level blocks
        if (page?.data?.blocks) {
            return searchBlocks(page.data.blocks)?.component;
        }
        
        return undefined; // If no blocks exist
    }

    public getOptionsFromComponent<T extends BuilderOptions>(component: BuilderComponent): T {
        return component?.options as T;
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