import { useState, useEffect } from "react";
import type { Anime } from "../types/anime";
import { getTopAnime } from "../api/anime";
import AnimeCard from "./AnimeCard";
import { useOutletContext, useNavigate } from "react-router-dom";

const AnimeList = () => {

    const navigate = useNavigate()

    const [anime, setAnime] = useState<Anime[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState<string>("");
    const [activeFilter, setActiveFilter, favorites, toggleFavorites] = useOutletContext<[string, (filter: string) => void, Anime[], (anime: Anime) => void]>();


    const filteredAnime = anime.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase())

        const matchesFilter =
            activeFilter === 'all' ||
            (activeFilter === "popular" && item.score !== null && item.score >= 8) ||
            (activeFilter === "new" && item.year !== null && item.year >= 2022) ||
            (activeFilter === "classic" && item.year !== null && item.year < 2010);

        return matchesSearch && matchesFilter;
    })

    const handleClick = (id: number) => {
        navigate(`/anime/${id}`);
    }


    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await getTopAnime();
                setAnime(data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Ошибка загрузки"
                );
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    if (loading) {
        return <p>Загружаем аниме...</p>;
    }

    if (error) {
        return <p>Ошибка: {error}</p>;
    }

    if (anime.length === 0) {
        return <p>Аниме не найдено.</p>;
    }




    return (
        <>

            <input
                className="anime-list__input"
                type="text"
                placeholder="Введите аниме..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {filteredAnime.length === 0 ? (
                <p>По вашему запросу ничего не найдено.</p>
            ) : (
                <div className="catalog">
                    {filteredAnime.map((item) => (
                        <AnimeCard
                            key={item.mal_id}
                            anime={item}
                            clickAnime={handleClick}
                            toggleFavorites={toggleFavorites}
                            isFavorite={favorites.some((fav) => fav.mal_id === item.mal_id)}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default AnimeList;
