// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/AnimatePresence-layout-animations-siblings.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";

/**
 * An example of an AnimatePresence child animating in and out with shared layout
 * ensuring that layout update is shared with the sibling `motion.div layout`
 */

export function AnimatePresenceLayoutAnimationsSiblingsDemo() {
    const [isVisible, setVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => { setVisible(!isVisible); }, 3000);
    });

    return (
        <LayoutGroup>
            <AnimatePresence initial={false} onExitComplete={() => console.log("rest")}>
                {isVisible && <ExitComponent />}
            </AnimatePresence>
            <motion.div layout style={style} id="a" />
        </LayoutGroup>
    );
}

function ExitComponent() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={style}
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
