// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/_dragConstraintsRef.tsx
import { useRef } from "react";
import { motion } from "motion/react";

export function TestDragConstraintsRefDemo() {
    const ref = useRef(null);

    return (
        <div className="p-10 flex justify-center">
            <motion.div ref={ref} style={dragContainer}>
                <motion.div
                    drag
                    dragConstraints={ref}
                    dragElastic={0.2}
                    style={draggable}
                />
            </motion.div>
        </div>
    );
}

const dragContainer = {
    width: "50%",
    height: "60vh",
    background: "#F30552",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
};

const draggable = {
    width: 100,
    height: 100,
    background: "white",
    borderRadius: "10px",
};
