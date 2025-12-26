// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-batch-read-writes.tsx
import { MotionConfig, motion } from "motion/react";

// window.MotionHandoffAnimation = () => 0;

export function AnimationBatchReadWritesDemo() {
    return (
        <MotionConfig transition={{ duration: 2 }}>
            <div style={{ "--a": "#00F", "--b": "360deg", "--c": "100px" }}>

                {/* 1 */}
                <div className="">Color and position Y</div>
                <motion.div animate={{ backgroundColor: "var(--a)" }} style={style} className={className}>a</motion.div>
                <motion.div animate={{ y: 100 }} style={style} className={className}>a</motion.div>
                <Marker />

                {/* 2 */}
                <div className="">Opacity and rotation</div>
                <motion.div animate={{ opacity: 0.5 }} style={style} className={className}>a</motion.div>
                <motion.div animate={{ rotate: "var(--b)", top: "200px" }} style={style} className={className}>a</motion.div>
                <Marker />

                {/* 3 */}
                <div className="">Position X</div>
                <motion.div animate={{ x: "var(--c)" }} style={style} className={className}>a</motion.div>

            </div>
        </MotionConfig>
    );
}

const style = {
    x: 0,
    color: "rgba(0,0,0,0)",
    backgroundColor: "#f00",
};

const className = "size-24 rounded-2xl";

function Marker() {
    return (
        <svg className="size-4 fill-sky-700" viewBox="0 0 96 96">
            <circle cx={48} cy={48} r={48} />                                                  {/* black outer circle */}
            <ellipse className="fill-white" cx={48} cy={48} rx={32} ry={32} />               {/* white oval (middle layer) */}
            <ellipse cx={48} cy={48} rx={28} ry={28} />                                        {/* black inner oval (pupil) */}
            <rect className="fill-white" x={32} y={28} width={8} height={8} rx={2} ry={2} /> {/* white highlight in top-left - curved rectangular shape */}
        </svg>
    );
}
