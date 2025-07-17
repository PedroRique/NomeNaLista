import { useState, type FormEvent } from "react";
import MyButton from "../components/Button";
import supabase from "../utils/supabase";
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useNavigate } from "react-router";

type NewListForm = { title: string, description: string, items: string[] };

export const NewListPage = () => {
    const navigate = useNavigate();
    const [newList, setNewList] = useState<NewListForm>({ title: '', description: '', items: [] });

    const handleCreateList = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await supabase.from('lists').insert(newList);
        } catch (error) {
            console.error(error);
        }
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
                        newList.items.map((item, i) => {
                            return (
                                <li key={i} className="flex items-center gap-2">
                                    <span>{i + 1}.</span>
                                    <input
                                        className="border rounded-lg p-2 w-full"
                                        value={item}
                                        onChange={(e) => {
                                            const updatedItems = [...newList.items];
                                            updatedItems[i] = e.target.value;
                                            setNewList({ ...newList, items: updatedItems })
                                        }}
                                    />
                                </li>
                            )
                        })
                    }
                </ol>


                <MyButton label={'Adicionar item'} onClick={() => {
                    const updatedItems = [...newList.items];
                    updatedItems.push('');
                    setNewList({ ...newList, items: updatedItems })
                }} />


                <MyButton label={'Criar lista'} onClick={handleCreateList} />
            </form>
        </div>
    )
}