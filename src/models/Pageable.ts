export class Pageable {
    public page?: number;
    public limit: number = 20;
    public offset: number = 0;
    public last?: boolean;
    public totalElements?: number;
    public totalPages?: number;
    public atDate?: string;

    constructor(self?: Pageable) {
        if (self) {
            this.limit = self.limit;
            this.offset = self.offset;
            this.page = self.page;
            this.totalElements = self.totalElements;
            this.totalPages = self.totalPages;
            this.last = self.last;
            this.atDate = self.atDate;
        }
    }
}