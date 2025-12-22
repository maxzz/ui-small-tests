// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-keyframes.tsx
import { motion, useCycle } from "motion/react";

/**
 * An example of the Motion keyframes syntax.
 */

const style = {
    width: 100,
    height: 100,
    background: "white",
    x: 0,
    borderRadius: 20,
};

export function AnimationKeyframesDemo() {
    const [animate, cycle] = useCycle("a", "b");
    return (
        <motion.div
            initial={false}
            animate={animate}
            variants={{
                a: { x: [0, 200] },
                b: { x: [0, 200] },
            }}
            onClick={() => cycle()}
            transition={{
                duration: 2,
                ease: ["circOut", "circOut", "circOut"],
                times: [0, 0.1, 0.9, 1],
            }}
            style={style}
        />
    );
}

