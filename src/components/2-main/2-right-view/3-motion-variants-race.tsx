import { useState } from "react"; //https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/variants-race.tsx //GH: 'repo:motiondivision/motion Variants'
import { motion } from "motion/react";

export function MotionVariantsRace() {
    const [isHover, setIsHover] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [variant, setVariant] = useState("a");

    const variants = [variant];
    if (isHover) variants.push(variant + "-hover");

    //! Uncommenting the next line makes it work.
    // if (isPressed) variants.push(variant + "-pressed")
    console.log(variants);
    return (
        <motion.div
            animate={variants}
            onHoverStart={() => setIsHover(true)}
            onHoverEnd={() => setIsHover(false)}
            // onTapStart={() => setIsPressed(true)}
            // onTap={() => setIsPressed(false)}
            onTapCancel={() => setIsPressed(false)}
            className="border border-green-500 rounded"
        >
            <motion.div
                onTap={() => setVariant("b")}
                style={{
                    width: 300,
                    height: 300,
                    backgroundColor: "var(--color-yellow-100)",
                }}
                variants={{
                    b: {
                        backgroundColor: "var(--color-cyan-100)",
                    },
                }}
                className="border border-green-500 rounded"
            >
                <motion.div
                    id="inner"
                    style={{
                        width: 100,
                        height: 100,
                        backgroundColor: "var(--color-yellow-100)",
                    }}
                    variants={{
                        // This state lingers too long.
                        "a-hover": {
                            backgroundColor: "var(--color-orange-500)",
                        },
                        b: {
                            backgroundColor: "var(--color-cyan-100)",
                        },
                        "b-hover": {
                            backgroundColor: "var(--color-emerald-500)",
                        },
                    }}
                    className="border border-green-500 rounded" />
            </motion.div>
        </motion.div>
    );
}
