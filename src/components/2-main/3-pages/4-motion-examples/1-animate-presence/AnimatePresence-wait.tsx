// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/AnimatePresence-wait.tsx
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * An example of a single-child AnimatePresence animation
 */

export function AnimatePresenceWaitDemo() {
    const [key, setKey] = useState(0);

    return (
        <div onClick={() => { setKey(key + 1); }}>

            <AnimatePresence initial={false} mode="wait" onExitComplete={() => console.log("rest")}>
                <motion.div
                    key={key}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{
                        ...style,
                        background: `hsla(${key * 15}, 100%, 50%, 1)`,
                    }}
                />
            </AnimatePresence>
        </div>
    );
}

const style = {
    width: 100,
    height: 100,
    background: "red",
    opacity: 1,
};
