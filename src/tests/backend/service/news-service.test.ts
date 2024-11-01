import NewsService from "../../../backend/service/news-service";
import BuilderService from "../../../backend/service/builder-service";
import NewsMapper from "../../../backend/mapper/news-mapper";
import NewsInformation from "../../../backend/dto/news";

// Mock getAllPages and mapTo without modifying NewsService
jest.mock("../../../backend/service/builder-service");
jest.mock("../../../backend/mapper/news-mapper");

describe("NewsService", () => {
  let newsService: NewsService;

  beforeEach(() => {
    // Re-initialize NewsService in each test
    newsService = new NewsService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return mapped news information for pages with '/news/' in their URL", async () => {
    // Define mock data
    const mockPages = [
      { data: { url: "/news/article-1" } },
      { data: { url: "/news/article-2" } },
      { data: { url: "/other/category" } }, // Should be filtered out
    ];

    const mockNewsInformation = [
      new NewsInformation({ name: "Article 1", imageUrl: "image1.jpg", url: "/news/article-1" }),
      new NewsInformation({ name: "Article 2", imageUrl: "image2.jpg", url: "/news/article-2" })
    ];

    // Set up mock implementations with spies on the real instances created in NewsService
    const getAllPagesMock = jest.spyOn(BuilderService.prototype, "getAllPages").mockResolvedValue(mockPages);
    const mapToMock = jest.spyOn(NewsMapper.prototype, "mapTo")
      .mockReturnValueOnce(mockNewsInformation[0])
      .mockReturnValueOnce(mockNewsInformation[1])
      .mockReturnValueOnce(undefined); // Return undefined for non-news page

    // Call the method under test
    const result = await newsService.getNews();

    // Verify results
    expect(result).toEqual(mockNewsInformation);
    expect(getAllPagesMock).toHaveBeenCalledTimes(1);
    expect(mapToMock).toHaveBeenCalledTimes(3); // Once for each page
    expect(mapToMock).toHaveBeenCalledWith(mockPages[0]);
    expect(mapToMock).toHaveBeenCalledWith(mockPages[1]);
    expect(mapToMock).toHaveBeenCalledWith(mockPages[2]);
  });

  it("should return an empty array if there are no pages with '/news/' in their URL", async () => {
    // Mock getAllPages to return pages without `/news/` in the URL
    jest.spyOn(BuilderService.prototype, "getAllPages").mockResolvedValue([
      { data: { url: "/other/category" } },
    ]);

    const mapToMock = jest.spyOn(NewsMapper.prototype, "mapTo").mockReturnValue(undefined); // No mapping for non-news pages

    // Call the method under test
    const result = await newsService.getNews();

    // Verify results
    expect(result).toEqual([]);
    expect(mapToMock).not.toHaveBeenCalled(); // No calls to mapTo since there are no matching news pages
  });
});
