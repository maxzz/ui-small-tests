// Source: https://codesandbox.io/p/sandbox/heuristic-wozniak-2z01b
// https://stackoverflow.com/questions/57125263/animate-children-when-hover-at-parent-with-framer-motion 'Animate children when hover at parent with Framer-motion'
import { motion, type Variants } from "motion/react";

export function HoverParentToChildDemo() {
    return (
        <motion.div
            initial="rest"
            animate="rest"
            whileHover="hover"
            className="relative p-4 text-sm text-foreground bg-sky-100 cursor-pointer"
        >
            <motion.div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0" variants={slashVariants}>
                <svg className="1w-auto h-10 fill-blue-700" viewBox="0 0 27 50" style={{ objectFit: "scale-down" }}>
                    <path d="M21.177 0L0 50h5.818L26.995 0z" />
                </svg>
            </motion.div>

            <motion.h1 variants={textVariants}>
                Hover me!
            </motion.h1>
        </motion.div>
    );
}

const slashVariants: Variants = {
    rest: {
        opacity: 0,
        transition: { duration: 0.2, ease: "easeOut", },
    },
    hover: {
        opacity: 1,
        transition: { duration: 1, },
    }
};

const textVariants: Variants = {
    rest: {
        color: "black",
        x: 0,
        transition: { duration: 0.2, ease: "easeIn", },
    },
    hover: {
        color: "blue",
        x: 50,
        transition: { duration: 0.4, ease: "easeOut", },
    }
};
