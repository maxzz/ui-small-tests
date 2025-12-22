// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-between-value-types-x.tsx
import { motion, useCycle } from "motion/react";

/**
 * An example of animating between different value types
 */

export function AnimationBetweenValueTypesXDemo() {
    const [x, cycleX] = useCycle(0, "calc(3 * var(--width))");

    return (
        <motion.div
            initial={false}
            animate={{ x }}
            transition={{ duration: 5, ease: () => 0.5 }}
            style={{
                width: 100,
                height: 100,
                background: "white",
                // @ts-expect-error - Custom property
                "--width": "100px",
            }}
            onClick={() => cycleX()}
        />
    );
}
