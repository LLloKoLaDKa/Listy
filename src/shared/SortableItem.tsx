import {useSortable} from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import {PropsWithChildren} from "react";

interface IProps {
    key: React.Key,
    id: number
}

export function SortableItem({id, key, children}: PropsWithChildren<IProps>) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} key={key} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
}