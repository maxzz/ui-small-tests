// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Events-whileHover-unit-conversion.tsx
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

export function EventsWhileHoverUnitConversionDemo() {
    return (
        <div className="p-10">
            <motion.div
                variants={container}
                initial="hidden"
                whileHover="visible"
                style={style}
            />
        </div>
    );
}
