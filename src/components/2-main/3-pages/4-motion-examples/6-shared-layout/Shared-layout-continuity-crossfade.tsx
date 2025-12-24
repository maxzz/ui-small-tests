// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Shared-layout-continuity-crossfade.tsx
import { motion, useCycle, AnimatePresence } from "motion/react";

/**
 * An example of a component resuming animation and layout state using Shared layout and layoutId
 */
export function SharedLayoutContinuityCrossfadeDemo() {
    return (
        <div className="absolute inset-0 bg-white flex items-center justify-center">
            <Component />
        </div>
    );
}

function Component() {
    const [count, cycleCount] = useCycle(0, 1, 2, 3);

    return (
        <AnimatePresence>
            <motion.div
                layoutId="box"
                initial={false}
                animate={animate[count]}
                transition={{ duration: 3 }}
                style={{
                    position: "absolute",
                    ...styles[count],
                }}
                id={`shape-${count}`}
                key={`shape-${count}`}
                onClick={() => cycleCount()}
            />
        </AnimatePresence>
    );
}

const animate = [
    { backgroundColor: "#09f", borderRadius: 10, opacity: 1, },
    { backgroundColor: "#90f", borderRadius: 100, opacity: 0.5, },
    { backgroundColor: "#f09", borderRadius: 0, opacity: 1, },
    { backgroundColor: "#9f0", borderRadius: 50, opacity: 0.5, },
];

const styles = [
    { width: 100, height: 100, top: 100, },
    { width: 200, height: 200, left: 100, },
    { width: 100, height: 100, left: "calc(100vw - 100px)", },
    { width: 200, height: 200, },
];
