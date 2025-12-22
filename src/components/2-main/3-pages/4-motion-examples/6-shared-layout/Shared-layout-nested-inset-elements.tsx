// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Shared-layout-nested-inset-elements.tsx
import { motion, useCycle, AnimatePresence } from "motion/react";
import * as React from "react";

const container: React.CSSProperties = {
    width: 150,
    height: 150,
    position: "absolute",
    inset: 0,
};

export function SharedLayoutNestedInsetElementsDemo() {
    const [isOn, toggleOn] = useCycle(false, true);

    return (
        <div
            onClick={() => toggleOn()}
            style={{
                position: "relative",
                margin: 20,
                width: 500,
                height: 500,
            }}
        >
            <AnimatePresence>
                <motion.div
                    key={isOn ? "a" : "b"}
                    layoutId="a"
                    style={{
                        ...container,
                        background: "white",
                        top: isOn ? undefined : 50,
                        left: isOn ? undefined : 50,
                        bottom: isOn ? 50 : undefined,
                        right: isOn ? 50 : undefined,
                        borderRadius: "50%",
                    }}
                    transition={{ duration: 2 }}
                >
                    <motion.div
                        layoutId="b"
                        style={{
                            ...container,
                            background: isOn ? "#f00" : "#0f0",
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                        }}
                        transition={{ duration: 2 }}
                    >
                        <motion.div
                            layoutId="c"
                            style={{
                                ...container,
                                background: isOn ? "#0f0" : "#f00",
                                width: 80,
                                height: 80,
                                borderRadius: "50%",
                            }}
                            transition={{ duration: 2 }}
                        />
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
