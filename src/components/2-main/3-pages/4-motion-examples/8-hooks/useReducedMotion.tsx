// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/useReducedMotion.tsx
import { useState, useEffect } from "react";
import { motion, type Transition, useReducedMotion, type Variants } from "motion/react";

export function HooksUseReducedMotionDemo() {
    const [isVisible, setIsVisible] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const transition: Transition = shouldReduceMotion ? { type: false } : { duration: 1 };
    const variants: Variants = {
        visible: { opacity: 1, transition },
        hidden: { opacity: 0, transition },
    };

    useEffect(
        () => {
            const timeout = setTimeout(() => setIsVisible(!isVisible), 1500);
            return () => clearTimeout(timeout);
        }, [isVisible]
    );

    return (
        <motion.div
            initial={false}
            animate={isVisible ? "visible" : "hidden"}
        >
            <motion.div
                variants={variants}
                style={style}
            />
        </motion.div>
    );
}

const style = {
    width: 100,
    height: 100,
    background: "red",
    opacity: 1,
};
