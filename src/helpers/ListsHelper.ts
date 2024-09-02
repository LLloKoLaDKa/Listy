import List from "models/store/List.ts";

const sort = (a: number, b: number) => a - b;
const sortDesc = (a: number, b: number) => b - a;

export const sortByIndexDesc = (l1: List, l2: List) => sortDesc(l1.index, l2.index)
export const sortByPinIndexDesc = (l1: List, l2: List) => {
    if (!l1.pinIndex && !l2.pinIndex) return 0;
    if(!l1.pinIndex) return 1;
    if(!l2.pinIndex) return -1;

    return sortDesc(l1.pinIndex, l2.pinIndex)
}
export const sortByIndex = (l1: List, l2: List) => sort(l1.index, l2.index)