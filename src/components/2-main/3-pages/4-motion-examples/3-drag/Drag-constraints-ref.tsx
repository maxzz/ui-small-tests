// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Drag-constraints-ref.tsx
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export function DragConstraintsRefDemo() {
    const ref = useRef(null);
    const [count, setCount] = useState(0);
    return (<>
        <div ref={ref} style={containerStyles}>
            <motion.div
                drag
                dragConstraints={ref}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.1 }}
                style={childStyles}
                onClick={() => setCount(count + 1)}
                id="draggable"
            />
        </div>

        <SiblingLayoutAnimation />
    </>);
}

/**
 * This sibling layout animation is designed to fuzz/stress the drag constraints
 * measurements. Remeasuring the constraints during drag would previously mess
 * up the position of the draggable element.
 */
const SiblingLayoutAnimation = () => {
    const [state, setState] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setState(!state), 500);
        return () => clearTimeout(timer);
    }, [state]);

    return (
        <motion.div
            layout
            style={{
                ...childStyles,
                background: "blue",
                position: "relative",
                left: state ? "100px" : "0",
            }}
        />
    );
};

const containerStyles = {
    width: "50%",
    height: 300,
    background: "rgba(255,255,255,0.5)",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const childStyles = {
    width: 200,
    height: 200,
    background: "white",
    borderRadius: 20,
};
