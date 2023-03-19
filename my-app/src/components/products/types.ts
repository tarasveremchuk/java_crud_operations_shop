export interface IProductCreate {
    name: string;
    price: number;
    category_id: number;
    description: string;
    files: Array<File>;
};

export interface IProductUpdate {
    name: string,
    price: number,
    description: string,
    category_id: string,
    files: Array<File>,
    removeFiles: string[]
}

export interface IProductItem {
    id: number,
    name: string,
    price: number,
    category_id: string,
    files: string[],
    description: string
}