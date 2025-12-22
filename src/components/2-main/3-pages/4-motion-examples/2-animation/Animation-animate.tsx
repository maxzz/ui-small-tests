// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-animate.tsx
import { motion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * An example of the tween transition type
 */

const style = {
    width: 100,
    height: 100,
    background: "white",
};

export function AnimationAnimateDemo() {
    const [state, setState] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setState(true);
        }, 300);
    }, [state]);

    return (
        <motion.div
            animate={{ x: state ? 0 : 100 }}
            transition={{ duration: 1 }}
            style={style}
        />
    );
}

