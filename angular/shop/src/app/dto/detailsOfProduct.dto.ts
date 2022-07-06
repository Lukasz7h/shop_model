export interface DetailsOfProductDto
{
    id: number;
    name: string;

    price: number;
    group: string;

    season: string;
    bodyPart: string;

    review?: number;
    reviewAmount?: number;

    photos: [];
    detail: {
        id: number;
        description: string;

        specification: Array<{name: string, value: string}>;
    };

    getFiles?: boolean;
    filesCount?: number;
}