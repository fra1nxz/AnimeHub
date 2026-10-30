import { useNavigate, useOutletContext } from "react-router-dom";
import type { Anime } from "../types/anime";
import AnimeCard from "./AnimeCard";


import './../index.css'

const Favorites = () => {
    let navigate = useNavigate()
    const [, , favorites, toggleFavorites] =
        useOutletContext<
            [string, (filter: string) => void, Anime[], (anime: Anime) => void]
        >();

    const handleClick = (id: number) => {
        navigate(`/anime/${id}`);
    }

    return (
        <>
            <div className="catalog">
                {favorites.length === 0 ? "В избранном пока ничего нет" : (favorites.map((anime) => (
                    <AnimeCard
                        key={anime.mal_id}
                        anime={anime}
                        toggleFavorites={toggleFavorites}
                        isFavorite={favorites.some((fav) => fav.mal_id === anime.mal_id)}
                        clickAnime={handleClick}

                    />
                )))}
            </div>
        </>
    );
}

export default Favorites;