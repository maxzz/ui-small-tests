// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-spring-css.tsx
// Note: Simplified version without spring() CSS utility as it's not available in motion/react
import { motion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * An example of the spring transition type
 */

const style = {
    width: 100,
    height: 100,
    background: "white",
};

export function AnimationSpringCssDemo() {
    const [state, setState] = useState(false);

    const [duration, setDuration] = useState(1);
    const [bounce, setBounce] = useState(0.2);

    useEffect(() => {
        setTimeout(() => {
            setState(true);
        }, 300);
    }, [state]);

    return (
        <div className="p-4">
            <motion.div
                animate={{
                    transform: state ? "translateX(200px)" : "translateX(0)",
                }}
                transition={{
                    duration,
                    bounce,
                    type: "spring",
                }}
                style={style}
            />
            <div className="mt-4 space-y-2">
                <div>
                    <label className="block text-sm">
                        Bounce: {bounce.toFixed(2)}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={bounce}
                        onChange={(e) => setBounce(Number(e.target.value))}
                        className="w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm">
                        Duration: {duration.toFixed(1)}s
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full"
                    />
                </div>
                <button
                    onClick={() => setState(!state)}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Toggle
                </button>
            </div>
        </div>
    );
}
