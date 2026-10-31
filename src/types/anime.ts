export type AnimeGenre = {
    mal_id: number;
    name: string;
}

export type AnimeImage = {
    image_url: string | null;
    large_image_url: string | null;
}

export type Anime = {
    mal_id: number;
    title: string;
    images: {
        webp: AnimeImage
    };
    score: number | null;
    year: number | null;
    genres: AnimeGenre[];
    synopsis: string | null;
}

export type AnimeApiResponse = {
    data: Anime[];
}

export type GetAnimeApiResponse = {
    data: Anime;
}

export type AnimeOutletContext = [
    string,
    (filter: string) => void,
    Anime[],
    (anime: Anime) => void
];