// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/useAnimation.tsx
import { useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "motion/react";

/**
 * An example of firing an animation onMount using the useAnimation hook
 */

const style = {
    width: 100,
    height: 100,
    background: "white",
    opacity: 1,
    borderRadius: 20,
};

export function HooksUseAnimationDemo() {
    const controls = useAnimation();
    const variants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    };
    const x = useMotionValue(0);
    
    useEffect(() => {
        controls.start("visible");

        const timeout = setTimeout(() => x.set(100), 2000);
        return () => clearTimeout(timeout);
    });

    return (
        <div className="p-10 bg-blue-500 h-full">
            <motion.div animate={controls} initial="hidden">
                <motion.div variants={variants} drag style={{ ...style, x }} />
            </motion.div>
        </div>
    );
}

