// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/_dragConstraints.tsx
import { motion } from "motion/react";

export function TestDragConstraintsDemo() {
    return (
        <div className="p-10">
            <motion.div
                drag
                dragConstraints={{ left: 0, right: 400 }}
                style={styleA}
            />
        </div>
    );
}

const styleA = {
    width: 300,
    height: 300,
    background: "white",
    borderRadius: "10px",
};
