// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/WAAPI-opacity.tsx
import { useState } from "react";
import { motion } from "motion/react";

const style = {
    width: 100,
    height: 100,
    background: "white",
};

export function WaapiOpacityDemo() {
    const [opacity, setOpacity] = useState(1);

    return (
        <div className="p-10 bg-slate-800 h-full">
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity }}
                onClick={() => setOpacity(opacity === 1 ? 0 : 1)}
                transition={{ duration: 0.5 }}
                style={style}
            />
             <p className="mt-4 text-sm text-white/70">Click the box to toggle opacity</p>
        </div>
    );
}

