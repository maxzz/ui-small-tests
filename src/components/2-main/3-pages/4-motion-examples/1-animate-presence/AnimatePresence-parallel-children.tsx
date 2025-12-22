// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/AnimatePresence-parallel-children.tsx
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

/**
 * An example of three top-level AnimatePresence children controlling the exit of a single
 * component (in this case, the Fragment)
 */

const style = {
    width: 100,
    height: 100,
    background: "red",
    opacity: 1,
};

export function AnimatePresenceParallelChildrenDemo() {
    const [isVisible, setVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setVisible(!isVisible);
        }, 3000);
    });

    return (
        <AnimatePresence initial={false} onExitComplete={() => console.log("rest")}>
            {isVisible && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        style={style}
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                        style={{ ...style, background: "green" }}
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2 }}
                        style={{ ...style, background: "blue" }}
                    />
                </>
            )}
        </AnimatePresence>
    );
}

