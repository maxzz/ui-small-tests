// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Shared-layout-lightbox-crossfade.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * This demonstrates children with layoutId animating back to their origin components
 */
export function SharedLayoutLightboxCrossfadeDemo() {
    const [index, setIndex] = useState<false | number>(false);
    return (
        <div className="relative p-4 bg-gray-500 flex items-center justify-center">
            <Gallery items={colorsArray} setIndex={setIndex} />

            <AnimatePresence>
                {index !== false && (
                    <SingleImage color={colorsArray[index]} setIndex={setIndex} />
                )}
            </AnimatePresence>
        </div>
    );
}

function Gallery({ items, setIndex }: { items: string[], setIndex: any; }) {
    return (
        <ul className="m-0 p-[0_20px_20px_0] w-150 h-150 bg-gray-200 rounded-2xl list-none flex items-center justify-between flex-wrap">
            {items.map(
                (color, i) => (
                    <motion.li
                        layoutId={color}
                        className="p-[20px] m-[20px_0_0_20px] flex items-center justify-center flex-[1_1_90px] cursor-pointer"
                        style={{ backgroundColor: color, borderRadius: 0 }}
                        //transition={{ duration: 5 }} // const transition = { type: "spring", stiffness: 500, damping: 30 }
                        key={color}
                        id={i === 0 ? "list-red" : undefined}
                        onClick={() => setIndex(i)}
                    >
                        <motion.div className="w-[50px] h-[50px] rounded-[25px] bg-white opacity-50" layoutId={`child-${color}`} />
                    </motion.li>
                )
            )}
        </ul>
    );
}

function SingleImage({ color, setIndex }: { color: string, setIndex: any; }) {
    return (<>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="fixed inset-0 bg-[rgba(0,0,0,0.6)]"
            id="overlay"
            onClick={() => setIndex(false)}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
                id="color"
                layoutId={color}
                transition={{ duration: 2 }}
                className="p-[50px] w-[500px] h-[300px]"
            >
                <motion.div
                    layoutId={`child-${color}`}
                    transition={{ duration: 2 }}
                    className="w-[50px] h-[50px] rounded-[25px] bg-white opacity-50"
                    style={{ backgroundColor: "black" }}
                    id="child"
                />
            </motion.div>
        </div>
    </>);
}

// Utilities

const numColors = 3; // 4 * 4
const makeColor = (hue: number) => `hsl(${hue}, 100%, 50%)`;

const colorsArray = Array.from(Array(numColors)).map(
    (_, i) => makeColor(Math.round((360 / numColors) * i))
);
