// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/_dragDevice.tsx
import { motion, MotionConfig } from "motion/react";

const styleA = {
    width: 100,
    height: 100,
    background: "blue",
};

const device = {
    width: 600,
    height: 800,
    background: "white",
    transform: "scale(0.5)",
    transformOrigin: "top left",
};

const invert = (scale: number, point: number) => (point * 1) / scale;
const invertScale = (scale: number) => (point: { x: number; y: number }) => {
    return { x: invert(scale, point.x), y: invert(scale, point.y) };
};

const Device = ({ children }: { children: React.ReactNode }) => (
    <MotionConfig transformPagePoint={invertScale(0.5)}>
        <div style={device}>{children}</div>
    </MotionConfig>
);

export function TestDragDeviceDemo() {
    return (
        <div className="p-10">
            <Device>
                <motion.div drag style={styleA} />
            </Device>
        </div>
    );
}

