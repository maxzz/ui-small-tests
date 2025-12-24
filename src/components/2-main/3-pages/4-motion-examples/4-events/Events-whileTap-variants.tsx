// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Events-whileTap-variants.tsx
import { motion, useMotionValue } from "motion/react";

/**
 * An example of whileTap propagating through components.
 */
export function EventsWhileTapVariantsDemo() {
    const scale = useMotionValue(0.5);
    return (
        <motion.div whileTap="pressed">
            <motion.div
                data-testid="child"
                variants={{ pressed: { scale: 1 } }}
                style={{ scale, ...style }}
            />
        </motion.div>
    );
}

const style = {
    width: 100,
    height: 100,
    background: "white",
};
