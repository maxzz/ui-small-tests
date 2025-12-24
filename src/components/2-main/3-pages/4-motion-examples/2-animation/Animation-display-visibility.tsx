// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-display-visibility.tsx
import { useState } from "react";
import { MotionConfig, motion } from "motion/react";

/**
 * An example of the tween transition type
 */
export function AnimationDisplayVisibilityDemo() {
    const [state, setState] = useState(true);

    return (
        <MotionConfig transition={{ duration: 1 }}>
            <motion.div
                initial={{ display: "block" }}
                animate={{
                    display: state ? "block" : "none",
                    visibility: state ? "visible" : "hidden",
                    opacity: state ? 1 : 0.2,
                }}
                onUpdate={(latest: any) => console.log(latest)}
                style={style}
            />
            
            <button className="bg-white text-black px-2 py-1 rounded mt-4" onClick={() => setState(!state)}>
                Toggle
            </button>
        </MotionConfig>
    );
}

const style = {
    width: 100,
    height: 100,
    background: "white",
};
