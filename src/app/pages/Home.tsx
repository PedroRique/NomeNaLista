import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import MyButton from '../components/Button';
import { ListCard } from '../components/ListCard';
import type { List } from '../models/List';
import supabase from '../utils/supabase';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const [lists, setLists] = useState<List[]>([]);

    useEffect(() => {
        getLists()
    }, [])

    const getLists = async () => {
        try {
            const response = await supabase.from('lists').select();
            setLists(response.data as List[])
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="p-2">
            <h1 className="text-2xl font-bold mb-2">Nome na Lista</h1>

            <div className='py-2'>

                <h2>Suas listas:</h2>

                <div className='flex flex-col gap-2'>
                    {lists.map((list, i) => (<ListCard key={i} list={list} />))}
                </div>

            </div>


            <MyButton label={'Nova lista'} onClick={() => navigate('/new-list')} />
        </div>
    )
}