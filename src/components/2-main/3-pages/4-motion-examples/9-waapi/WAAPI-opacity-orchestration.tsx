// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/WAAPI-opacity-orchestration.tsx
import { useState } from "react";
import { motion, type Variants } from "motion/react";

export function WaapiOpacityOrchestrationDemo() {
    const [opacity, setOpacity] = useState(1);

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={parentVariants}
            whileHover="hover"
            style={style}
        >
            <motion.div
                onClick={() => setOpacity(opacity === 1 ? 0 : 1)}
                transition={{ duration: 0.5 }}
                style={{ width: 50, height: 50, background: "red" }}
                variants={childVariants}
            />
        </motion.div>
    );
}

// Variants

const parentVariants: Variants = {
    show: { transition: { staggerChildren: 0.1, delayChildren: 1.8, }, },
    hover: { transition: { staggerChildren: 0.03, delayChildren: 0.1, staggerDirection: -1, }, },
};

const childVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
    hover: { opacity: 0, transition: { repeat: 1, repeatType: "reverse", }, },
};

// Styles

const style = {
    width: 100,
    height: 100,
    background: "white",
};
