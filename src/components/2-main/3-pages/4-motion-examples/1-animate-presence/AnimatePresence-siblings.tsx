// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/AnimatePresence-siblings.tsx
import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";

/**
 * An example of an AnimatePresence child animating in and out with shared layout
 * ensuring that layout update is shared with the sibling `motion.div layout`
 */

export function AnimatePresenceSiblingsDemo() {
    const [isVisible, setVisible] = useState(true);
    return (
        <LayoutGroup>
            <AnimatePresence initial={false} onExitComplete={() => console.log("rest a")}>
                {isVisible && <ExitComponent id="a" />}
            </AnimatePresence>

            <AnimatePresence initial={false} onExitComplete={() => console.log("rest b")}>
                {isVisible && <ExitComponent id="b" />}
            </AnimatePresence>

            <motion.div
                layout
                style={style}
                id="c"
                onClick={() => setVisible(!isVisible)}
            />
        </LayoutGroup>
    );
}

function ExitComponent({ id }: { id: string; }) {
    return (
        <motion.div
            key={id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={style}
            id={id}
        />
    );
}

const style = {
    width: 100,
    height: 100,
    background: "white",
    opacity: 1,
    borderRadius: 20,
    margin: 20,
};
