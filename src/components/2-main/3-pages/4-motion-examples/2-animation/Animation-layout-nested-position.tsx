// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-layout-nested-position.tsx
import * as React from "react";
import { motion, useCycle } from "motion/react";

/**
 * This example demonstrates that nested components automatically factor in parent size deltas
 */
export function AnimationLayoutNestedPositionDemo() {
    const [isOpen, toggleIsOpen] = useCycle(true, false);
    const childStyles = isOpen ? openChild : closedChild;
    return (
        <div className="relative w-full h-full bg-slate-100 overflow-hidden">
        <motion.div
            layout
            transition={transition}
            style={isOpen ? openParent : closedParent}
            onClick={() => toggleIsOpen()}
            onLayoutAnimationStart={() => console.log("start")}
            onLayoutAnimationComplete={() => console.log("complete")}
            id="parent"
        >
            <motion.div
                layout
                transition={transition}
                style={childStyles}
                id="child"
            >
                <motion.div
                    layout
                    transition={transition}
                    style={{
                        ...childStyles,
                        height: "30%",
                        backgroundColor: isOpen ? "yellow" : "red",
                        width: isOpen ? "50%" : "100%",
                    }}
                    id="yr"
                ></motion.div>
            </motion.div>
        </motion.div>
        </div>
    );
}

const transition = { duration: 3, ease: "circIn" as const };

const parent: React.CSSProperties = {
    position: "absolute",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const openParent: React.CSSProperties = {
    ...parent,
    width: 400,
    height: 400,
    left: 400,
    top: 0,
    alignItems: "flex-end",
    justifyContent: "flex-end",
};

const closedParent: React.CSSProperties = {
    ...parent,
    width: 200,
    height: 200,
    left: 0,
    top: 0,
    alignItems: "flex-start",
    justifyContent: "flex-start",
};

const child: React.CSSProperties = {
    width: 150,
    height: 150,
    backgroundColor: "blue",
    display: "flex",
};

const openChild: React.CSSProperties = {
    ...child,
    alignItems: "center",
    justifyContent: "center",
};

const closedChild: React.CSSProperties = {
    ...child,
    alignItems: "flex-start",
    justifyContent: "flex-start",
};
