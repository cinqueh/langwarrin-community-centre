export default class ProgramInformation {
    name: string;
    imageUrl: string;
    category: string;
    bookable: boolean;
    url: string;
    constructor(data: {
        name: string,
        imageUrl: string,
        category: string,
        bookable: boolean,
        url: string
    }) {
        this.name = data.name;
        this.imageUrl = data.imageUrl;
        this.category = data.category;
        this.bookable = data.bookable;
        this.url = data.url;
    }
}