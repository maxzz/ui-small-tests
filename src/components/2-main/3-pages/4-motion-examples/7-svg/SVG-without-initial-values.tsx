// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/SVG-without-initial-values.tsx
import { useEffect, useCallback } from "react";
import { motion, useAnimation } from "motion/react";

/**
 * This is an example of SVGs working without explicitly setting initial values.
 */
// https://github.com/motiondivision/motion/issues/216

export function SvgWithoutInitialValuesDemo() {
    const controls = useAnimation();

    const handleAnimationComplete = useCallback(
        () => {
            controls.start(animation);
        }, [controls]
    );

    useEffect(
        () => {
            controls.start(animation);
        }, [controls]
    );

    return (
        <motion.svg viewBox="22 22 44 44" width="44" height="44">
            <motion.circle
                animate={controls}
                onAnimationComplete={handleAnimationComplete}
                r="20.2"
                fill="none"
                stroke="white"
                strokeWidth="3.6"
            />
        </motion.svg>
    );
}

const animation = {
    strokeDasharray: ["1px, 200px", "100px, 200px", "100px, 200px"],
    strokeDashoffset: [0, -15, -125],
    transition: { duration: 1.4, ease: "linear" as const },
    cx: 44,
    cy: 44,
};
