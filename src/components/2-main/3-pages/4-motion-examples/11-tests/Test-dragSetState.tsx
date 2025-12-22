// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/_dragSetState.tsx
import { useState } from "react";
import { motion } from "motion/react";

const styleA = {
    width: 300,
    height: 300,
    background: "white",
    borderRadius: "10px",
};

export function TestDragSetStateDemo() {
    const [state, setState] = useState(0);

    const onDrag = () => {
        setState(state + 10);
    };

    return (
        <div className="p-10">
            <p className="mb-4 text-white">Drag triggers state update: {state}</p>
            <motion.div
                drag="x"
                dragConstraints={{ left: -500, right: 500 }}
                dragElastic
                dragMomentum
                dragTransition={{ bounceStiffness: 200, bounceDamping: 40 }}
                onDrag={onDrag}
                style={styleA}
            />
        </div>
    );
}

