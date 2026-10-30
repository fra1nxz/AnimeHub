const Sidebar = ({ filter, setFilter }: { filter: string; setFilter: (filter: string) => void }) => {
    const genresAnime = [
        {
            filter: "all",
            name: "Все аниме",
        },
        {
            filter: "new",
            name: "Новинки",
        },
        {
            filter: "classic",
            name: "Классика",
        },

    ]
    return (
        <nav className="sidebar">
            <ul className="sidebar-list">
                {genresAnime.map((item) => (
                    <li onClick={() => setFilter(item.filter)} key={item.name} className="sidebar-item">{item.name}</li>
                ))}
            </ul>
        </nav>
    );
}

export default Sidebar;