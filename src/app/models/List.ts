export type List = {
    id: number;
    title: string;
    created_at: string;
    description: string;
    items: string[];
    slug: string;
}

export type NewListForm = Omit<List, 'id' | 'created_at'>;