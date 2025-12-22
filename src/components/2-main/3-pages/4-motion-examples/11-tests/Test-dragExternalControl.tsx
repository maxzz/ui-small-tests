// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/_dragExternalControl.tsx
import { useState } from "react";
import { motion, PanInfo } from "motion/react";

const style = {
    width: 300,
    height: 300,
    background: "white",
    borderRadius: "10px",
};

export function TestDragExternalControlDemo() {
    const [dragOriginEvent, setDragOriginEvent] = useState<any>(null);

    return (
        <div className="p-10 flex gap-4">
            <motion.div
                // @ts-expect-error - internal prop
                dragOriginEvent={dragOriginEvent}
                drag="x"
                dragConstraints={{ left: -100, right: 100 }}
            >
                <motion.div
                    style={style}
                    onTapStart={(e) => setDragOriginEvent(e)}
                    onTapCancel={() => setDragOriginEvent(null)}
                    onTap={() => setDragOriginEvent(null)}
                >
                    <p className="p-4 text-black">Drag Controller</p>
                </motion.div>
                <motion.div
                    style={{ ...style, marginTop: 20 }}
                    onTapStart={(e) => setDragOriginEvent(e)}
                    onTapCancel={() => setDragOriginEvent(null)}
                    onTap={() => setDragOriginEvent(null)}
                >
                    <p className="p-4 text-black">Drag Controller 2</p>
                </motion.div>
            </motion.div>
        </div>
    );
}

