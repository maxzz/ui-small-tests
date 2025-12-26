import { motion, type Variants } from "motion/react";

export function HoverParentToChildDemo() {
    return (
        <motion.div
            initial="rest"
            animate="rest"
            whileHover="hover"
            className="relative max-w-[200px] cursor-pointer"
        >
            <motion.div
                className="absolute top-1/2 left-0 translate-y-1/2 opacity-0"
                variants={slashMotion}
            >
                <svg width="1em" height="1em" viewBox="0 0 27 50"> {/* svg { width: auto; height: 50px; object-fit: scale-down; } */}
                    <path
                        fill="#154FFF"
                        d="M21.177 0L0 50h5.818L26.995 0z"
                        fillRule="evenodd" />
                </svg>
            </motion.div>
            <motion.h1 variants={textMotion}>Hover me!</motion.h1>
        </motion.div>
    );
}

const textMotion: Variants = {
    rest: {
        color: "grey",
        x: 0,
        transition: {
            duration: 2,
            type: "tween",
            ease: "easeIn"
        }
    },
    hover: {
        color: "blue",
        x: 30,
        transition: {
            duration: 0.4,
            type: "tween",
            ease: "easeOut"
        }
    }
};

const slashMotion: Variants = {
    rest: { opacity: 0, transition: { duration: 0.2, type: "tween", ease: "easeOut" } },
    hover: {
        opacity: 1,
        transition: {
            duration: 0.4,
            type: "tween",
            ease: "easeIn"
        }
    }
};
