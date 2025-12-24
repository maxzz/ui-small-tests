// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/_dragDevice.tsx
import { motion, MotionConfig } from "motion/react";

export function TestDragDeviceDemo() {
    return (
        <div className="p-10">
            <Device>
                <motion.div drag style={styleA} />
            </Device>
        </div>
    );
}

function Device({ children }: { children: React.ReactNode; }) {
    return (
        <MotionConfig transformPagePoint={invertScale(0.5)}>
            <div style={device}>
                {children}
            </div>
        </MotionConfig>
    );
}

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

// Invert a scale transform on a point

function invert(scale: number, point: number) {
    return (point * 1) / scale;
}

function invertScale(scale: number) {
    return (point: { x: number; y: number; }) => {
        return {
            x: invert(scale, point.x),
            y: invert(scale, point.y),
        };
    };
}
