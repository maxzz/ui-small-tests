// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Layout-Projection-scale-correction-shadow.tsx
import { useState } from "react";
import { motion } from "motion/react";

/**
 * This demonstrates the scale correction of box shadow
 */

const big = {
    width: 400,
    height: 400,
    backgroundColor: "white",
};

const small = {
    width: 200,
    height: 200,
    backgroundColor: "white",
    boxShadow: "10px 15px 5px red",
};

export function LayoutProjectionScaleCorrectionShadowDemo() {
    const [isOn, setIsOn] = useState(false);

    return (
        <div className="flex items-center justify-center h-full">
        <motion.div
            layout
            initial={{ borderRadius: 20, boxShadow: "10px 10px 20px #000" }}
            transition={{
                boxShadow: {
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                },
                default: { duration: 2 },
            }}
            style={!isOn ? big : small}
            onClick={() => setIsOn(!isOn)}
        />
        </div>
    );
}
