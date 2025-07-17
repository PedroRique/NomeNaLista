import { XCircleIcon } from "@heroicons/react/24/solid"

type NewListItemProps = {
    itemIndex: number,
    itemValue: string,
    handleUpdateItem: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void,
    handleRemoveItem: (i: number) => void
}

export const NewListItem: React.FC<NewListItemProps> = ({ itemIndex, itemValue, handleUpdateItem, handleRemoveItem }) => {
    return (
        <li className="flex items-center gap-2">
            <span>{itemIndex + 1}.</span>
            <input
                className="border rounded-lg p-2 w-full"
                value={itemValue}
                onChange={(e) => handleUpdateItem(e, itemIndex)}
            />
            <XCircleIcon className="size-6 mr-2" onClick={() => handleRemoveItem(itemIndex)} />
        </li>
    )
}