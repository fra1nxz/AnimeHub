import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Anime } from "../types/anime";
import { getAnime } from "../api/anime";

const AnimeDetails = () => {
    let params = useParams();

    const [anime, setAnime] = useState<Anime>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expanded, setExpanded] = useState(false);


    useEffect(() => {
        const controller = new AbortController();

        const load = async () => {
            setLoading(true);
            setError(null);

            try {
                if (!params.id) {
                    setError("ID аниме не указан");
                    return;
                }
                const data = await getAnime(params.id, controller.signal);
                setAnime(data);
            } catch (err) {
                if (err instanceof Error && err.name === "AbortError") {
                    return;
                }

                setError(
                    err instanceof Error
                        ? err.message
                        : "Ошибка загрузки"
                );
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        load()

        return () => controller.abort();
    }, [params.id])


    if (loading) {
        return <p>Загружаем аниме...</p>;
    }

    if (error) {
        return <p>Ошибка: {error}</p>;
    }

    if (!anime) {
        return <p>Аниме не найдено.</p>;
    }


    const synopsis = anime.synopsis ?? "Описание отсутствует";


    return (
        <>
            <div className="anime-details__divisor">
                <img
                    className="anime-details__poster"
                    src={anime.images.webp.large_image_url ?? anime.images.webp.image_url ?? ""}
                    alt={anime.title}
                />
                <div className="anime-details__info">
                    <h2>{anime.title}</h2>
                    <p>Genres: {anime.genres.map(({ name }) => name).join(", ")}</p>
                    <div>
                        <p className="rating"><span>Rating:</span> ★ {anime.score ?? "Нет оценки"}</p>
                        <p>Year: {anime.year ?? "Неизвестен"}</p>
                    </div>

                    <p className={"anime-details__synopsis" + (expanded ? "anime-details__synopsis--expanded" : "")}>{synopsis}</p>
                    {synopsis.length > 120 && (
                        <button
                            type="button"
                            className="anime-details__toggle"
                            onClick={() => setExpanded((v) => !v)}
                        >
                            {expanded ? "Свернуть" : "Читать далее"}
                        </button>
                    )}
                    <Link to='/'>
                        <button
                            type="button"
                            className="anime-details__btn"

                        >
                            go back
                        </button>
                    </Link>

                </div>

            </div>

        </>
    );
}

export default AnimeDetails;