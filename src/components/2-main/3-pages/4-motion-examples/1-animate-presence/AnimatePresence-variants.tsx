// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/AnimatePresence-variants.tsx
import { useEffect, useState } from "react";
import { AnimatePresence, motion, stagger } from "motion/react";

/**
 * An example of AnimatePresence with exit defined as a variant through a tree.
 */

export function AnimatePresenceVariantsDemo() {
    const [isVisible, setVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => { setVisible(!isVisible); }, 3000);
    });

    return (
        <AnimatePresence initial={false} onExitComplete={() => console.log("rest")}>
            {isVisible && (
                <motion.ul
                    key="a"
                    initial={"closed"}
                    exit={"closed"}
                    animate="open"
                    variants={listVariants}
                    transition={{ duration: 1 }}
                    style={style}
                >
                    <motion.li variants={itemVariants} style={item}>
                        Test
                    </motion.li>
                    <motion.li variants={itemVariants} style={item}>
                        Test
                    </motion.li>
                    <motion.li variants={itemVariants} style={item}>
                        Test
                    </motion.li>
                </motion.ul>
            )}
        </AnimatePresence>
    );
}

// Variants

const listVariants = {
    open: {
        opacity: 1,
        transition: { delayChildren: stagger(1), when: "beforeChildren" },
    },
    closed: {
        opacity: 0,
        transition: {
            when: "afterChildren",
            delayChildren: stagger(0.3, { from: "last" }),
        },
    },
};

const itemVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
};

// Item styles

const item = {
    width: 100,
    height: 100,
    background: "red",
};

const style = {
    width: 200,
    height: 200,
    background: "white",
    opacity: 1,
};