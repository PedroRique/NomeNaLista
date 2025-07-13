import { FC } from "react";
import type { List } from "../models/List";

export const ListCard: FC<{ list: List }> = ({ list }) => {
    return (
        <div className="list-container border p-2 rounded-lg">
            <h3>{list.title}</h3>

            {
                list.items ?
                <p>{list.items.length} item(ns)</p> :
                <p>Lista vazia</p>
            }
        </div>
    );
}