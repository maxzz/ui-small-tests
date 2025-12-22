// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/useReducedMotion.tsx
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

const style = {
    width: 100,
    height: 100,
    background: "red",
    opacity: 1,
};

export function HooksUseReducedMotionDemo() {
    const [isVisible, setIsVisible] = useState(false);
    const shouldReduceMotion = useReducedMotion();
    const transition = shouldReduceMotion ? { type: false } : { duration: 1 };
    const variants = {
        visible: { opacity: 1, transition },
        hidden: { opacity: 0, transition },
    };

    useEffect(() => {
        const timeout = setTimeout(() => setIsVisible(!isVisible), 1500);
        return () => clearTimeout(timeout);
    }, [isVisible]);

    return (
        <motion.div animate={isVisible ? "visible" : "hidden"} initial={false}>
            <motion.div variants={variants as any} style={style} />
        </motion.div>
    );
}
