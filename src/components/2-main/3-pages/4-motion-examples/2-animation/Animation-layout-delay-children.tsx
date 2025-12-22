// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-layout-delay-children.tsx
import { motion, useCycle } from "motion/react";
import * as React from "react";

export function AnimationLayoutDelayChildrenDemo() {
    const [isOpen, toggleIsOpen] = useCycle(false, true);

    return (
        <div style={overlay}>
            <h1 style={label}>After</h1>
            <motion.div
                id="parent"
                layout
                initial={false}
                animate={{ borderRadius: isOpen ? 0 : 20 }}
                style={isOpen ? containerOpen : containerClosed}
                onClick={() => toggleIsOpen()}
                transition={{
                    default: { duration: 0.5, type: "spring", bounce: 0 },
                    borderRadius: { duration: 0.4, ease: "linear" },
                }}
            >
                <motion.div
                    id="child"
                    layout
                    style={isOpen ? avatarOpen : avatarClosed}
                    transition={{
                        delay: 0.5,
                        duration: 0.7,
                        type: "spring",
                        bounce: 0.3,
                    }}
                />
            </motion.div>
        </div>
    );
}

const label: React.CSSProperties = {
    color: "white",
    position: "absolute",
    top: 30,
    left: 50,
    lineHeight: "50px",
    fontSize: 36,
    fontFamily: "sans-serif",
};

const container: React.CSSProperties = {
    background: "#363636",
    position: "absolute",
    padding: 20,
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
};

const containerOpen: React.CSSProperties = {
    ...container,
    top: 0,
    right: 0,
    bottom: 0,
    width: 250,
};

const containerClosed: React.CSSProperties = {
    ...container,
    bottom: 50,
    left: "calc(50% - 150px)",
    width: 300,
};

const avatar: React.CSSProperties = {
    borderRadius: "50%",
    background: "#22cc88",
    width: 60,
    height: 60,
};

const avatarOpen: React.CSSProperties = {
    ...avatar,
    width: 180,
    height: 180,
    position: "relative",
    left: 30,
    top: 30,
};

const avatarClosed: React.CSSProperties = {
    ...avatar,
};

const overlay: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "#191919",
};
