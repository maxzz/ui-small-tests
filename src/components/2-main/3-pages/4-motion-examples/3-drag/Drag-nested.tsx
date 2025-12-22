// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Drag-nested.tsx
import { motion } from "motion/react";

const scroll = {
    width: 200,
    height: 600,
    background: "rgba(255,255,255,0.5)",
    borderRadius: 20,
    padding: 20,
};

const carousel = {
    width: 600,
    height: 200,
    background: "white",
    borderRadius: 10,
};

export function DragNestedDemo() {
    return (
        <motion.div drag="y" style={scroll}>
            <motion.div drag="x" style={carousel} />
        </motion.div>
    );
}

