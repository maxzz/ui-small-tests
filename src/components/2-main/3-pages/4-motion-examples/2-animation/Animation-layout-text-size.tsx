// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-layout-text-size.tsx
import { motion, useCycle } from "motion/react";

export function AnimationLayoutTextSizeDemo() {
    const [isOn, toggleOn] = useCycle(false, true);

    return (
        <div style={{ color: "white" }} onClick={() => toggleOn()}>
            <motion.p
                layout
                style={{
                    fontSize: isOn ? 100 : 24,
                    fontWeight: "bold",
                    fontFamily: "Helvetica, sans-serif",
                }}
            >
                TEXT
            </motion.p>
        </div>
    );
}
