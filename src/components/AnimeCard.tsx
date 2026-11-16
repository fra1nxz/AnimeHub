import { FaHeart } from "react-icons/fa";
import type { Anime } from "../types/anime";
import { Link } from "react-router-dom";

interface AnimeCardProps {
    anime: Anime;
    clickAnime: (id: number) => void;
    toggleFavorites: (anime: Anime) => void;
    isFavorite: boolean

}

const AnimeCard = ({ anime, clickAnime, toggleFavorites, isFavorite }: AnimeCardProps) => {
    return (
        <article className="anime-card">
            <Link to={`/anime/${anime.mal_id}`}>
                <img
                    className="anime-poster"
                    src={anime.images.webp.large_image_url ?? anime.images.webp.image_url ?? ""}
                    alt={anime.title}
                />
                <h2>{anime.title ? anime.title.length > 20 ? `${anime.title.slice(0, 25)}...` : anime.title : ""}</h2>
                <p>{anime.genres.map(({ name }) => name).join(", ")}</p>
                <p className="rating">★ {anime.score ?? "Нет оценки"}</p>
                <p>{anime.year ?? "Неизвестен"}</p>
            </Link>

            <button type="button" onClick={() => toggleFavorites(anime)}>
                <FaHeart color={isFavorite ? "red" : ""} size={20} />
                Лaйк
            </button>
        </article>
    );
}

export default AnimeCard;