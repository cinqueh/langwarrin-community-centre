export default class ProgramInformation {
    name: string;
    imageUrl: string;
    category: string;
    bookable: boolean;
    constructor(data: {
        name: string,
        imageUrl: string,
        category: string,
        bookable: boolean
    }) {
        this.name = data.name;
        this.imageUrl = data.imageUrl;
        this.category = data.category;
        this.bookable = data.bookable;
    }
}