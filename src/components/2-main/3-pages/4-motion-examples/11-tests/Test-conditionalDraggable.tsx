// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/_conditionalDraggable.tsx
import { motion } from "motion/react";
import { useState } from "react";

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

export function TestConditionalDraggableDemo() {
    const [drag, setDragEnabled] = useState(true);
    const onTap = () => setDragEnabled(!drag);
    return (
        <div className="p-10">
            <p className="mb-4 text-white">Tap red box to toggle green/yellow box drag</p>
            <motion.div
                drag={drag}
                style={{ ...styleA, background: drag ? "green" : "yellow" }}
            />
            <motion.div onTap={onTap} style={styleB} />
        </div>
    );
}

