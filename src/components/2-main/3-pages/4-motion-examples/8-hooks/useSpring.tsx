// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/useSpring.tsx
import { frame, motion, useMotionValue, useSpring, useTransform, } from "motion/react";
import { useRef, useState } from "react";

export function HooksUseSpringDemo() {
    return (
        <div style={{ display: "flex", gap: 100, padding: 50 }}>
            <DragExample />

            <MouseEventExample />

            <div style={{ position: "relative", width: 100, height: 100 }}>
                <RerenderExample />
            </div>
        </div>
    );
}

function DragExample() {
    const dragX = useMotionValue(0);
    const dragY = useMotionValue(0);
    const dragXPX = useTransform(dragX, (v) => `${v}%`);
    const dragYPX = useTransform(dragY, (v) => `${v}%`);
    const x = useSpring(dragXPX, spring);
    const y = useSpring(dragYPX, spring);

    return (
        <motion.div
            drag
            _dragX={dragX}
            _dragY={dragY}
            dragMomentum={false}
            style={{ width: 100, height: 100, background: "red", x, y, display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}
        >
            Drag
        </motion.div>
    );
}

const spring = { stiffness: 300, damping: 28, restDelta: 0.00001, restSpeed: 0.00001, };

function RerenderExample() {
    const [{ x, y }, setMousePosition] = useState({ x: 0, y: 0 });

    const updateMousePosition = useRef((e: MouseEvent) => {
        // TODO: frame.postRender is deprecated/removed? frame.read/write/render exists.
        // using frame.read to batch reads, or just direct set in this simple case
        setMousePosition({ x: e.clientX, y: e.clientY });
    });

    const ref = useRef<HTMLDivElement>(null);

    return (
        <motion.div
            ref={ref}
            animate={{ x, y }}
            transition={spring}
            style={{
                position: "absolute",
                inset: 0,
                width: 100,
                height: 100,
                background: "green",
                display: "flex", alignItems: "center", justifyContent: "center", color: "white"
            }}
            onTapStart={() => { window.addEventListener("mousemove", updateMousePosition.current); }}
            onTap={() => { window.removeEventListener("mousemove", updateMousePosition.current); }}
            onTapCancel={() => { window.removeEventListener("mousemove", updateMousePosition.current); }}
        >
            Rerender
        </motion.div>
    );
}

function MouseEventExample() {
    const x = useSpring(0, spring);
    const y = useSpring(0, spring);
    const ref = useRef<HTMLDivElement>(null);
    const onMove = useRef<(event: MouseEvent) => void>(
        ({ clientX, clientY }: MouseEvent) => {
            const element = ref.current!;

            x.set(clientX - element.offsetLeft - element.offsetWidth / 2);
            y.set(clientY - element.offsetTop - element.offsetHeight / 2);
        }
    );

    function startPointer() { window.addEventListener("pointermove", onMove.current); }
    function cancelPointer() { window.removeEventListener("pointermove", onMove.current); }

    return (
        <motion.div
            ref={ref}
            style={{ width: 100, height: 100, background: "yellow", x, y, display: "flex", alignItems: "center", justifyContent: "center", color: "black" }}
            onTapStart={startPointer}
            onTapCancel={cancelPointer}
            onTap={cancelPointer}
        >
            Mouse Event
        </motion.div>
    );
}
