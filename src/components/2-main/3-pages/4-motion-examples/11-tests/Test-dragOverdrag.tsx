// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/_dragOverdrag.tsx
import { motion } from "motion/react";
import { useState } from "react";

const styleA = {
    width: 100,
    height: 100,
    background: "white",
    borderRadius: "10px",
};

export function TestDragOverdragDemo() {
    const variants = {
        default: { scaleX: 1, scaleY: 1 },
        squishX: { scaleX: 0.5, scaleY: 1.3 },
        squishY: { scaleX: 1.3, scaleY: 0.5 },
    };

    const [squish, setSquish] = useState("default");

    const onLock = (axis: "x" | "y" | null) => {
        if (axis === "x") {
            setSquish("squishY");
        } else {
            setSquish("squishX");
        }
    };

    return (
        <div className="p-10">
            <motion.div
                drag
                dragDirectionLock={true}
                onDirectionLock={onLock}
                onDragEnd={() => setSquish("default")}
                initial={{ scale: 1 }}
                variants={variants}
                animate={squish}
                style={styleA}
            />
        </div>
    );
}

