// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/_dragPropagation.tsx
import { motion } from "motion/react";

const styleA = {
    width: 300,
    height: 300,
    background: "blue",
};
const styleB = {
    width: 100,
    height: 100,
    background: "red",
};

export function TestDragPropagationDemo() {
    return (
        <div className="p-10">
            <motion.div drag style={styleA}>
                <motion.div drag style={styleB} />
            </motion.div>
        </div>
    );
}

