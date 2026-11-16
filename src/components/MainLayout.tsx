import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import type { Anime } from "../types/anime";



const MainLayout = () => {

    const [activeFilter, setActiveFilter] = useState<string>("all");
    const [favorites, setFavorites] = useState<Anime[]>(() => {
        try {
            const savedFavorites = localStorage.getItem("favorites");
            if (savedFavorites === null) {
                return []
            }
            return JSON.parse(savedFavorites) as Anime[];
        } catch {
            return [];
        }
    });



    const toggleFavorites = (anime: Anime) => {
        setFavorites((prev) => {
            const isFavorite = prev.some(
                (item) => item.mal_id === anime.mal_id
            );

            if (isFavorite) {
                return prev.filter(
                    (item) => item.mal_id !== anime.mal_id
                );
            }

            return [...prev, anime];
        });

    }

    useEffect(() => {
        try {
        localStorage.setItem("favorites", JSON.stringify(favorites))
            
        } catch (error) {
            console.log(error);
            
        }
    }, [favorites])


    return (
        <div className="main-layout">
            <Navbar />

            <div className="layout-content">
                <Sidebar filter={activeFilter} setFilter={setActiveFilter} />

                <main className="main-content">
                    <Outlet context={[activeFilter, setActiveFilter, favorites, toggleFavorites]} />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;