// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Drag-useDragControls.tsx
import { motion, useDragControls } from "motion/react";

/**
 * This is an example of triggering drag from an external element using useDragControls
 */
export function DragUseDragControlsDemo() {
    const dragControls = useDragControls();

    return (<>
        <div
            style={container}
            onPointerDown={(e) => dragControls.start(e)}
        />
        
        <motion.div
            drag
            dragControls={dragControls}
            onDrag={() => console.log("onDrag")}
            onDragStart={() => console.log("onDragStart")}
            onDragEnd={() => console.log("onDragEnd")}
            whileTap={{ scale: 0.95 }}
            style={child}
        />
    </>);
}

const container = {
    width: 200,
    height: 200,
    background: "rgba(255,255,255,0.5)",
    borderRadius: 20,
    margin: 20,
};

const child = {
    width: "50vw",
    height: 300,
    background: "white",
    borderRadius: 20,
};
