// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-cleanup.tsx
import { useState } from "react";
import { motion } from "motion/react";

export function AnimationCleanupDemo() {
    const [open, setOpen] = useState(true);
    
    return (
        <div>
            {open && (
                <motion.div
                    style={{
                        position: "absolute",
                        backgroundColor: "black",
                        width: "10px",
                        height: "10px",
                    }}
                    animate={{ left: [0, 100, 0] }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        times: [0, 0.5, 1],
                        ease: "easeInOut",
                    }}
                />
            )}

            <button className="bg-white text-black px-2 py-1 rounded mt-20" onClick={() => setOpen(false)}>
                Disable animation
            </button>
        </div>
    );
}
