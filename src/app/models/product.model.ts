export interface Category {
    id: string;
    name: string;
}

export interface Product {
    id: string;
    title: string;
    price: number;
    images: string[];
    description: string;
    category: Category;
}

// Omit<> - lo que hace es que omita algunas variables de una interface
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
    categoryId: number;
}

// Partial<> - Coloca a todos los atributos como atributos opcionales
export interface UpdateProductDTO extends Partial<CreateProductDTO> { }
