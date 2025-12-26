// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-between-value-types-x.tsx
import { motion, useCycle } from "motion/react";

/**
 * An example of animating between different value types
 */
export function AnimationBetweenValueTypesXDemo() {
    const [x, cycleX] = useCycle<string | number>(0, "calc(3 * var(--width))");

    return (
        <div className="px-4">
            <div className="mb-4">Click to cycle back and forth X: {x}</div>
            <motion.div
                initial={false}
                animate={{ x }}
                transition={{ duration: .5, ease: () => 0.5 }}
                style={{
                    width: 100,
                    height: 100,
                    "--width": "50px",
                }}
                className="1size-24 rounded-2xl bg-sky-700"
                onClick={() => cycleX()}
            />
        </div>
    );
}
