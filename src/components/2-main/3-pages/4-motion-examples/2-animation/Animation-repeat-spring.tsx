// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-repeat-spring.tsx
import { motion } from "motion/react";

/**
 * An example of the Motion keyframes syntax.
 */
export function AnimationRepeatSpringDemo() {
    return (
        <motion.div
            initial={{ x: -300 }}
            animate={{ x: 300 }}
            transition={{ type: "spring", delay: 1, repeat: 2, repeatDelay: 1, repeatType: "reverse", }}
            style={style}
        />
    );
}

const style = {
    width: 100,
    height: 100,
    background: "white",
    x: 0,
    borderRadius: 20,
};
