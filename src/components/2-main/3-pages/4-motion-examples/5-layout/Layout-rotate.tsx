// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Layout-rotate.tsx
import { useState } from "react";
import { motion } from "motion/react";

/**
 * This demonstrates the rotation support used by Framer
 */
export function LayoutRotateDemo() {
    const [isOn, setIsOn] = useState(false);

    return (
        <motion.div
            layout
            id="parent"
            initial={false}
            animate={{ rotate: isOn ? 45 : 10, borderRadius: isOn ? 0 : 50, }}
            transition={{ duration: 1 }}
            style={isOn ? bigParentStyles : smallParentStyles}
            onClick={() => setIsOn(!isOn)}
        >
            <motion.div
                layout
                id="child"
                initial={false}
                animate={{ rotate: isOn ? 0 : 45, borderRadius: isOn ? 20 : 0, }}
                transition={{ duration: 1 }}
                style={isOn ? bigChildStyles : smallChildStyles}
            />
        </motion.div>
    );
}

const parentStyles = {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};
const bigParentStyles = { ...parentStyles, width: 400, height: 400, justifyContent: "flex-start", alignItems: "flex-start", };
const smallParentStyles = { ...parentStyles, width: 100, height: 100, };

const childStyles = {
    backgroundColor: "red",
};
const bigChildStyles = { ...childStyles, width: 100, height: 100, };
const smallChildStyles = { ...childStyles, width: 50, height: 50, };

