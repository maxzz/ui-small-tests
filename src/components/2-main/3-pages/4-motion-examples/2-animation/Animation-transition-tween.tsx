// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-transition-tween.tsx
import { useState } from "react";
import { motion } from "motion/react";

/**
 * An example of the tween transition type
 */
export function AnimationTransitionTweenDemo() {
    const [count, setCount] = useState(0);
    const transition = {
        type: "spring" as const,
        duration: 0.4,
        dampingRatio: 0.4,
    };

    return (
        <motion.div
            initial={false}
            animate={count === 0 || count % 3 ? { x: count * 100 } : undefined}
            whileHover={{ x: 100, opacity: 0.5 }}
            transition={transition}
            style={style}
            onTap={() => setCount(count + 1)}
        />
    );
}

const style = {
    width: 100,
    height: 100,
    background: "white",
};
