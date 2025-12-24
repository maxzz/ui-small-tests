// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Shared-layout-lightbox-crossfade.tsx
import { CSSProperties, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * This demonstrates children with layoutId animating
 * back to their origin components
 */

// const transition = { type: "spring", stiffness: 500, damping: 30 }

export function SharedLayoutLightboxCrossfadeDemo() {
    const [index, setIndex] = useState<false | number>(false);
    return (
        <div style={background}>
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
        <ul style={container}>
            {items.map(
                (color, i) => (
                    <motion.li
                        layoutId={color}
                        style={{ ...item, backgroundColor: color, borderRadius: 0 }}
                        //transition={{ duration: 5 }}
                        key={color}
                        id={i === 0 ? "list-red" : undefined}
                        onClick={() => setIndex(i)}
                    >
                        <motion.div style={child} layoutId={`child-${color}`} />
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
            style={overlay}
            id="overlay"
            onClick={() => setIndex(false)}
        />
        <div style={singleImageContainer}>
            <motion.div
                id="color"
                layoutId={color}
                transition={{ duration: 2 }}
                style={{ ...singleImage, backgroundColor: "#fff", borderRadius: 50, }}
            >
                <motion.div
                    layoutId={`child-${color}`}
                    transition={{ duration: 2 }}
                    style={{ ...child, backgroundColor: "black" }}
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

// Styles

const background: CSSProperties = {
    position: "absolute",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ccc",
};

const container: CSSProperties = {
    backgroundColor: "#eeeeee",
    borderRadius: "25px",
    width: "600px",
    height: "600px",
    margin: "0",
    padding: "0 20px 20px 0",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center", // Fixed from 'space-between'
    listStyle: "none",
};

const item: CSSProperties = {
    padding: "20px",
    cursor: "pointer",
    margin: "20px 0 0 20px",
    flex: "1 1 90px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const overlay: CSSProperties = {
    background: "rgba(0,0,0,0.6)",
    position: "fixed",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0",
};

const singleImageContainer: CSSProperties = {
    position: "absolute",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none",
};

const singleImage: CSSProperties = {
    width: "500px",
    height: "300px",
    padding: 50,
};

const child: CSSProperties = {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    opacity: 0.5,
};
