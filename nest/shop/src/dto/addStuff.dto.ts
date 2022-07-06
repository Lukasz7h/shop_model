export interface AddStuffDto
{
    productName: string,
    productDescription: string,

    productGroup: string;
    productSeason: string,

    productBodyPart: string,
    productPrice: number,

    productSpecification: Array<{
        name: string,
        value: string
    }>
}