export default class NewsInformation {
    name: string;
    imageUrl: string;
    url: string;
    constructor(data: {
        name: string,
        imageUrl: string,
        url: string
    }) {
        this.name = data.name;
        this.imageUrl = data.imageUrl;
        this.url = data.url;
    }
}