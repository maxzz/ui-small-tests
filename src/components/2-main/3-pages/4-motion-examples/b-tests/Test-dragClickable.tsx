// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/_dragClickable.tsx
import { motion } from "motion/react";

export function TestDragClickableDemo() {
    
    function onClick() {
        alert("click");
    }

    return (
        <div className="p-10">
            <motion.div drag style={style}>
                <p>
                    Drag me
                </p>

                <button onClick={onClick}>
                    Click me
                </button>
            </motion.div>
        </div>
    );
}

const style = {
    display: "inline-block",
    padding: 20,
    background: "#eee",
};
