// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Shared-layout-lightbox.tsx
import { type CSSProperties, useState } from "react";
import {
    motion,
    AnimatePresence,
    useIsPresent,
    type Transition,
} from "motion/react";

/**
 * This demonstrates children with layoutId animating
 * back to their origin components
 */

const params = new URLSearchParams(window.location.search);
const instant = params.get("instant") || false;
const partialEase = params.get("partial-ease") || false;
let transition: Transition = instant ? { type: false } : { duration: 3 };
if (partialEase) {
    transition = {
        duration: 0.15,
        ease: () => 0.1,
    };
}

function Gallery({ items, setIndex }: any) {
    return (
        <ul style={container}>
            {items.map((color: string, i: number) => (
                <motion.li
                    key={color}
                    onClick={() => setIndex(i)}
                    style={{ ...item, backgroundColor: color, borderRadius: 0 }}
                    layoutId={color}
                    transition={transition}
                    id={i === 0 ? `item-parent` : undefined}
                >
                    <motion.div
                        style={child}
                        id={i === 0 ? `item-child` : undefined}
                        layoutId={`child-${color}`}
                        transition={transition}
                    />
                </motion.li>
            ))}
        </ul>
    );
}

function SingleImage({ color, setIndex }: any) {
    const isPresent = useIsPresent();

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    ...overlay,
                    pointerEvents: isPresent ? "auto" : "none",
                }}
                id="overlay"
                transition={transition}
                onClick={() => setIndex(false)}
            />
            <div style={singleImageContainer}>
                <motion.div
                    id="parent"
                    layoutId={color}
                    style={{
                        ...singleImage,
                        backgroundColor: "#fff",
                        borderRadius: 50,
                    }}
                    transition={transition}
                >
                    <motion.div
                        style={{ ...child, backgroundColor: "black" }}
                        id="child"
                        layoutId={`child-${color}`}
                        transition={transition}
                    />
                </motion.div>
            </div>
        </>
    );
}

export function SharedLayoutLightboxDemo() {
    const [index, setIndex] = useState<false | number>(false);

    if (partialEase) {
        if (index === 0) {
            // @ts-ignore
            transition.ease = () => 0.1;
        } else {
            // @ts-ignore
            transition.ease = (t: number) => (t === 1 ? 1 : 0.9);
        }
    }

    return (
        <div style={background}>
            <Gallery items={colors} setIndex={setIndex} />
            <AnimatePresence>
                {index !== false && (
                    <SingleImage color={colors[index]} setIndex={setIndex} />
                )}
            </AnimatePresence>
        </div>
    );
}

const numColors = 3; // 4 * 4
const makeColor = (hue: number) => `hsl(${hue}, 100%, 50%)`;
const colors = Array.from(Array(numColors)).map((_, i) =>
    makeColor(Math.round((360 / numColors) * i))
);

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
    alignItems: "stretch", // Changed from space-between which is invalid for alignItems
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

