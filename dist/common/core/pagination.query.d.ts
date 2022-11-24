import { SortBy } from '../enum/sort-by.enum';
export declare class PaginationQuery {
    page: number;
    limit: number;
    search: string;
    orderBy: string;
    sortBy: SortBy;
}
