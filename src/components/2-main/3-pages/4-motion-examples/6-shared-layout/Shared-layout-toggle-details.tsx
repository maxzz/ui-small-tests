// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Shared-layout-toggle-details.tsx
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";

/**
 * This demonstrates container components correctly animating
 * resize when children are added/removed/expanded
 */
export function SharedLayoutToggleDetailsDemo() {
    return (
        <LayoutGroup>
            <motion.div
                className="p-5 w-62 rounded-3xl bg-white flex flex-col"
                layout
                initial={{ borderRadius: 25 }}
                id="container"
            >
                {items.map(
                    (id) => (
                        <Item key={id} i={id} />
                    )
                )}
            </motion.div>
        </LayoutGroup>
    );
}

const items = [0, 1, 2];

function Item({ i }: { i: number; }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            layout
            id={`container-${i}`}
            style={{
                backgroundColor: "rgba(214, 214, 214, 0.5)",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: 10,
                overflow: "hidden",
            }}
            onClick={() => setIsOpen(!isOpen)}
        >
            <motion.div
                id={`image-${i}`}
                layout
                style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#666",
                    borderRadius: "20px",
                }}
            />

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div style={{ marginTop: "12px", width: "200px", height: "8px", backgroundColor: "#999", borderRadius: "10px", }} />
                        <motion.div style={{ marginTop: "12px", width: "200px", height: "8px", backgroundColor: "#999", borderRadius: "10px", }} />
                        <motion.div style={{ marginTop: "12px", width: "200px", height: "8px", backgroundColor: "#999", borderRadius: "10px", }} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
