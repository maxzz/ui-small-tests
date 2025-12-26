// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-animate.tsx
import { useEffect, useState } from "react";
import { motion } from "motion/react";

/**
 * An example of the tween transition type
 */
export function AnimationAnimateDemo() {
    const [state, setState] = useState(false);

    useEffect(() => {
        setTimeout(() => { setState((prev) => !prev); }, 300);
    }, []);

    return (
        <motion.div
            animate={{ x: state ? 0 : 100 }}
            transition={{ duration: 1 }}
            style={style}
        />
    );
}

const style = {
    width: 100,
    height: 100,
    background: "red",
};
