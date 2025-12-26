// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-animate.tsx
import { useEffect, useState } from "react";
import { motion } from "motion/react";

/**
 * An example of the tween transition type
 */
export function AnimationAnimateDemo() {
    const [state, setState] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => { setState((prev) => !prev); }, 300);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <motion.div
            animate={{ x: state ? 0 : 100 }}
            transition={{ duration: 1 }}
            className="size-24 bg-red-500 rounded-full"
        />
    );
}
