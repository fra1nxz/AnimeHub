
import type { AnimeApiResponse, GetAnimeApiResponse } from "../types/anime";

export const getTopAnime = async () => {
    const response = await fetch(
        "https://api.tenrai.org/v1/top/anime"
    );

    if (!response.ok) {
        throw new Error("Не удалось загрузить аниме");
    }

    const result: AnimeApiResponse = await response.json();

    return result.data;
};


export const getAnime = async (id: string) => {
    const response = await fetch(
        `https://api.tenrai.org/v1/anime/${id}`
    )

    if (!response.ok) {
        throw new Error("Не удалось загрузить аниме");
    }

    const result: GetAnimeApiResponse = await response.json();

    return result.data;
}