// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Shared-layout-lists.tsx
import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup, Transition } from "motion/react";

/**
 * This is a stress test of snapshotting ability as components animate between the two lists.
 */
export function SharedLayoutListsDemo() {
    // const [listA, setListA] = useState([0, 1, 2, 3, 4, 5, 6])
    // const [listB, setListB] = useState([7, 8, 9, 10, 11, 12])

    //const [lists, setLists] = useState([[0], [1]])
    const [lists, setLists] = useState([
        [3, 1, 2],
        [7, 8, 9],
    ]);

    return (
        <LayoutGroup>
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <div style={styles.container}>
                    <List
                        list={lists[0]}
                        onItemClick={(id) => moveItem(id, 1, lists, setLists)}
                        backgroundColor="#ff3366"
                    />

                    <List
                        list={lists[1]}
                        onItemClick={(id) => moveItem(id, 0, lists, setLists)}
                        backgroundColor="#0099ff"
                    />
                </div>
            </div>
        </LayoutGroup>
    );
}

interface ListProps {
    list: number[];
    onItemClick: (id: number) => void;
    backgroundColor: string;
}

const transition: Transition = { type: "spring", duration: 2, };

function List({ list, onItemClick, backgroundColor }: ListProps) {
    return (
        <motion.ul
            layout
            drag
            transition={transition}
            style={styles.list as any}
        >
            <AnimatePresence>
                {list.map(
                    (id) => (
                        <motion.li
                            layoutId={id.toString()}
                            transition={transition}
                            style={{ ...styles.item, backgroundColor, z: 2 } as any}
                            key={id}
                            id={"list-" + id}
                            onClick={() => onItemClick(id)}
                        />
                    )
                )}
            </AnimatePresence>
        </motion.ul>
    );
}

function moveItem(id: number, targetListId: number, [a, b]: number[][], setLists: (lists: number[][]) => void): void {
    const targetList = targetListId === 0 ? a : b;
    const originList = targetListId === 0 ? b : a;

    const newOriginList = [...originList];
    const originIndex = newOriginList.indexOf(id);
    newOriginList.splice(originIndex, 1);

    const newTargetList = [...targetList];
    newTargetList.splice(0, 0, id);

    setLists(
        targetListId === 0
            ? [newTargetList, newOriginList]
            : [newOriginList, newTargetList]
    );
}

// Styles

const styles = {
    container: {
        width: "70%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-end",
    },
    list: {
        width: 350,
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#444444",
        display: "flex",
        listStyle: "none",
        flexDirection: "column",
    },

    item: {
        height: 50,
        width: 330,
        borderRadius: 5,
        margin: 10,
        zIndex: 1,
        z: 1,
        position: "relative",
    },
};
