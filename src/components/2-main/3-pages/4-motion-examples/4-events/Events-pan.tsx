// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Events-pan.tsx
import { motion } from "motion/react";

const styleA = {
    width: 300,
    height: 300,
    background: "blue",
};

export function EventsPanDemo() {
    return (
        <div className="p-10">
            <p className="mb-4 text-white">Pan the blue box (check console logs)</p>
            <motion.div
                onPanSessionStart={() => console.log("session start")}
                onPanStart={() => console.log("pan start")}
                onPan={() => console.log("pan")}
                onPanEnd={() => console.log("pan end")}
                style={styleA}
            />
        </div>
    );
}
