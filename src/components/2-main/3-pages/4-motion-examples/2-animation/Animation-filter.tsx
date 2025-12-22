// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-filter.tsx
import { motion } from "motion/react";

/**
 * An example of animating the filter property.
 */

const style = {
    width: 100,
    height: 100,
    background: "white",
    opacity: 1,
};

export function AnimationFilterDemo() {
    return (
        <motion.div
            animate={{ filter: "brightness(0.5)" }}
            transition={{ duration: 2 }}
            style={style}
        />
    );
}

