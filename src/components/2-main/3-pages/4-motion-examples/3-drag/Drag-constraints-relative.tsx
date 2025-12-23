// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Drag-constraints-relative.tsx
import { motion } from "motion/react";

export function DragConstraintsRelativeDemo() {
    return (
        <motion.div
            drag
            dragElastic
            dragConstraints={{ top: -100, left: -100, right: 300, bottom: 300 }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.1 }}
            style={styleA}
        />
    );
}

const styleA = {
    width: 100,
    height: 100,
    background: "white",
    borderRadius: 20,
};
