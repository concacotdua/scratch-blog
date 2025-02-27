export type Post = {
    id: string;
    title: string;
    content: string;
    created_at: string;
    image_thumbnail: string;
};

export type PostListType = {
    title: string;
    content: string;
    author: {
        name: string,
        email: string,
    },
    published: boolean;
    created_at: string;
    updated_at: string;
    published_at: string | null;
    image_thumbnail: string;
};
