// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/_layoutDragTransform.tsx
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const transition = {
    default: { duration: 2, ease: "easeInOut" },
    scale: { duration: 0.2 },
};

export function TestLayoutDragTransformDemo() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsOpen(!isOpen), 2000);
        return () => clearTimeout(timer);
    }, [isOpen]);

    return (
        <div className="p-10">
            <motion.div
                layout
                // @ts-expect-error - ease string
                transition={transition}
                initial={{ borderRadius: 10 }}
                style={{
                    background: "white",
                    padding: "20px",
                    display: "flex",
                    width: isOpen ? "500px" : "200px",
                    height: isOpen ? "100px" : "200px",
                    justifyContent: isOpen ? "flex-end" : undefined,
                    alignItems: !isOpen ? "flex-end" : undefined,
                }}
            >
                <motion.div
                    layout
                    drag
                    // @ts-expect-error - ease string
                    transition={transition}
                    onClick={() => setIsOpen(!isOpen)}
                    initial={{ borderRadius: "50%" }}
                    whileHover={{ scale: 1.13 }}
                    id="child"
                    style={{
                        background: "rgb(255, 0, 136)",
                        cursor: "pointer",
                        width: "50px",
                        height: "50px",
                    }}
                />
            </motion.div>
            <div className="text-white mt-8 text-center font-bold text-lg">
                {"layout={true} drag={true}"}
            </div>
        </div>
    );
}

