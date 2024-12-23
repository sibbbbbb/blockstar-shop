// Los mismos datos simulados usados en `[id].tsx`
interface Item {
    id: number;
    name: string;
    stock: number;
    price: number;
}

export const items: Item[] = [
    { id: 1, name: 'Remera', stock: 15, price: 15000 },
    { id: 2, name: 'Short', stock: 5, price: 7000 },
    { id: 3, name: 'Gorra', stock: 15, price: 7500 },
];
