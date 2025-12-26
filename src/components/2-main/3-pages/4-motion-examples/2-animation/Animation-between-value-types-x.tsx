// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-between-value-types-x.tsx
import { motion, useCycle } from "motion/react";

/**
 * An example of animating between different value types
 */
export function AnimationBetweenValueTypesXDemo() {
    const [x, cycleX] = useCycle<string | number>(0, "calc(3 * var(--width))");
    const [y, cycleY] = useCycle<string | number>(0, "50px", "100px", "calc(3 * var(--width))");

    return (
        <div className="p-4 bg-sky-100 text-xs">
            <div>Cycles between number and string.</div>
            <div>Click to cycle back and forth X1: {x}</div>
            <div className="mb-4">Click to cycle back and forth X2: {y}</div>

            <motion.div
                initial={false}
                animate={{ x }}
                transition={{ duration: .5, ease: () => 0.5 }}
                style={{
                    "--width": "50px",
                }}
                className="m-4 size-24 rounded-2xl bg-sky-200 text-xl flex items-center justify-center"
                onClick={() => cycleX()}
            >
                X1
            </motion.div>

            <motion.div
                initial={false}
                animate={{ x: y }}
                transition={{ duration: .5, ease: () => 0.5 }}
                style={{
                    "--width": "50px",
                }}
                className="m-4 size-24 rounded-2xl bg-sky-200 text-xl flex items-center justify-center"
                onClick={() => cycleY()}
            >
                X2
            </motion.div>
        </div>
    );
}
