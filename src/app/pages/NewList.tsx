import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import slugify from "slugify";
import MyButton from "../components/Button";
import { NewListItem } from '../components/NewListItem';
import type { NewListForm } from '../models/List';
import supabase from "../utils/supabase";

type NewListPageParams = { list?: NewListForm };

export const NewListPage: React.FC<NewListPageParams> = ({ list = { title: '', description: '', items: [''], slug: '' } }) => {
    const navigate = useNavigate();
    const [newList, setNewList] = useState<NewListForm>(list);

    const handleCreateList = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const finalList = { ...newList, slug: slugify(newList.title) };
            await supabase.from('lists').insert(finalList);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddItem = () => {
        const updatedItems = [...newList.items];
        updatedItems.push('');
        setNewList({ ...newList, items: updatedItems })
    }

    const handleRemoveItem = (itemIndex: number) => {
        const updatedItems = [...newList.items].filter((_, liIdx) => liIdx !== itemIndex);
        setNewList({ ...newList, items: updatedItems })
    }

    const handleUpdateItem = (e: React.ChangeEvent<HTMLInputElement>, itemIndex: number) => {
        const updatedItems = [...newList.items];
        updatedItems[itemIndex] = e.target.value;
        setNewList({ ...newList, items: updatedItems })
    }

    return (
        <div className="new-list-container p-2">
            <h1 className="text-2xl font-bold mb-2 flex items-center"><ArrowLeftIcon className="size-6 mr-2" onClick={() => navigate(-1)} /> Nova Lista</h1>

            <form onSubmit={handleCreateList} className="flex flex-col gap-2 items-start">
                <input
                    value={newList.title}
                    type="text"
                    placeholder="Título da lista"
                    onChange={(e) => setNewList({ ...newList, title: e.target.value })}
                    required
                    className="border rounded-lg p-2 w-full"
                />

                <textarea
                    value={newList.description}
                    name="description"
                    placeholder="Descrição da sua lista"
                    onChange={(e) => setNewList({ ...newList, description: e.target.value })}
                    className="border rounded-lg p-2 w-full">
                </textarea>

                <h3>Items da lista:</h3>

                <ol className="flex flex-col gap-2 w-full">
                    {
                        newList.items.map((item, i) =>
                            <NewListItem
                                key={i}
                                itemIndex={i}
                                itemValue={item}
                                handleRemoveItem={handleRemoveItem}
                                handleUpdateItem={handleUpdateItem}
                            />)
                    }
                </ol>

                <MyButton label={'Adicionar item'} onClick={handleAddItem} />

                <MyButton label={'Criar lista'} onClick={handleCreateList} />
            </form>
        </div>
    )
}