import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { List } from "../models/List";
import { fetchListBySlug } from "../services/listService";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export const ListPage: React.FC = () => {
    const navigate = useNavigate();
    const { slug } = useParams();

    const [list, setList] = useState<List>();

    const getList = async () => {
        if (slug) {
            const listResponse = await fetchListBySlug(slug)
            if (listResponse) setList(listResponse);
        }
    }

    useEffect((() => {
        getList();
    }), [slug])

    return (
        <div className="p-2">
            {list &&
                <div className="">
                    <h1 className="text-2xl font-bold mb-2 flex items-center"><ArrowLeftIcon className="size-6 mr-2" onClick={() => navigate(-1)} /> {list.title}</h1>

                    <div className="mt-4 flex flex-col gap-2">
                        <p className="p-2 bg-gray-100 rounded-lg">{list.description}</p>

                        <h3>Items da lista:</h3>
                        <ol type="1" className="">
                            {list.items.map((listItem, i) => {
                                return (
                                    <li key={i} className="ml-2">{i + 1}. {listItem}</li>
                                )
                            })}
                        </ol>

                        <p className="italic text-sm text-gray-500">Criada em: {new Date(list.created_at).toLocaleString()}</p>
                    </div>
                </div>
            }
        </div>
    )
}