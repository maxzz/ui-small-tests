// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/MotionConfig-nonce.tsx
import { useState } from "react";
import { motion, MotionConfig, AnimatePresence } from "motion/react";

/**
 * An example of a nonce prop on MotionConfig
 */
export function MotionConfigNonceDemo() {
    const [toggle, setToggle] = useState(false);

    return (
        <div className="p-10">
            <MotionConfig nonce="abc123">
                <AnimatePresence mode="popLayout">
                    {toggle ? (
                        <motion.div
                            key="a"
                            initial={{ opacity: 0, }}
                            animate={{ opacity: 1, }}
                            exit={{ opacity: 0, }}
                            transition={{ duration: 1, }}
                            style={styleA}
                        >
                            A
                        </motion.div>
                    ) : (
                        <motion.div
                            key="b"
                            initial={{ opacity: 0, }}
                            animate={{ opacity: 1, }}
                            exit={{ opacity: 0, }}
                            transition={{ duration: 1, }}
                            style={styleB}
                        >
                            B
                        </motion.div>
                    )}
                </AnimatePresence>
                <button className="mt-4 px-2 py-1 bg-white rounded" onClick={() => setToggle((prev) => !prev)}>Switch</button>
            </MotionConfig>
        </div>
    );
}

const styleA = {
    width: 100,
    height: 100,
    background: "white",
    borderRadius: 20,
};

const styleB = {
    width: 100,
    height: 100,
    background: "blue",
    borderRadius: 20,
};
