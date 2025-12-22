// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Events-whileFocus-variants.tsx
import { motion } from "motion/react";

/**
 * An example of using whileHover to convert between different value types
 */

const style = {
    width: 100,
    height: 100,
    background: "white",
};

const container = {
    hidden: { width: 10 },
    visible: {
        width: "100%",
    },
};

export function EventsWhileFocusVariantsDemo() {
    return (
        <div className="p-10">
            <p className="mb-4 text-white">Tab to focus the box</p>
            <motion.div
                tabIndex={0}
                variants={container}
                initial="hidden"
                whileFocus="visible"
                style={style}
            />
        </div>
    );
}
