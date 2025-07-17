import { useNavigate } from "react-router-dom";
import type { List } from "../models/List";

export const ListCard: React.FC<{ list: List }> = ({ list }) => {
    const navigate = useNavigate();

    return (
        <div className="list-container border p-2 rounded-lg" onClick={() => navigate(`/list/${list.slug}`)}>
            <h3>{list.title}</h3>

            {
                list.items ?
                    <p>{list.items.length} item(ns)</p> :
                    <p>Lista vazia</p>
            }
        </div>
    );
}