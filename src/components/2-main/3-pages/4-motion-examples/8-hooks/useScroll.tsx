// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/useScroll.tsx
import { useState, useRef } from "react";
import { motion, useScroll, useSpring, } from "motion/react";

export function HooksUseScrollDemo() {
    return (<>
        <style>{styles}</style>

        <div className="example-container bg-[#7700ff] h-full relative">
            <Example />
        </div>
    </>);
}

function Example() {
    const [isComplete, setIsComplete] = useState(false);
    const containerRef = useRef(null);

    // useElementScroll is deprecated/removed in newer motion versions, replaced by useScroll({ container: ref })
    const { scrollYProgress } = useScroll({ container: containerRef });

    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001, restSpeed: 0.001, });

    return (
        <div
            ref={containerRef}
            style={{ position: "absolute", left: 0, top: 0, right: 0, height: "50vh", overflow: "scroll", }}
        >
            <motion.div
                style={{ position: "fixed", left: 0, width: "100%", height: 10, background: "white", scaleX, transformOrigin: "0% 0%", }}
            />

            <ContentPlaceholder />

            <svg className="progress-icon" viewBox="0 0 60 60">
                <motion.path
                    fill="none"
                    strokeWidth="5"
                    stroke="white"
                    strokeDasharray="0px 10000px"
                    d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                    style={{
                        // pathLength,
                        rotate: 90,
                        translateX: 5,
                        translateY: 5,
                        scaleX: -1, // Reverse direction of line animation
                    }}
                />
                <motion.path
                    fill="none"
                    strokeWidth="5"
                    stroke="white"
                    d="M14,26 L 22,33 L 35,16"
                    initial={false}
                    strokeDasharray="0px 10000px"
                    animate={{ pathLength: isComplete ? 1 : 0 }}
                />
            </svg>
        </div>
    );
}

export function ContentPlaceholder() {
    return (
        <div className="content-placeholder">
            <div className="header">
                <Word width={75} />
                <Word width={245} />
                <Word width={120} />
            </div>

            {paragraphsArray.map(
                (words, i) => (
                    <Paragraph key={i} words={words} />
                )
            )}
        </div>
    );
}

function Paragraph({ words }: { words: number[]; }) {
    return (
        <div className="paragraph">
            {words.map(
                (width, i) => (
                    <Word key={i} width={width} />
                )
            )}
        </div>
    );
}

function Word({ width }: { width: number; }) {
    return <div className="word" style={{ width }} />;
}

// Helper functions (mocked mix as it's not exported from motion/react directly easily, or available in framer-motionutils)

// Simple linear interpolation
const mix = (from: number, to: number, progress: number) => -progress * from + progress * to + from;

const randomInt = (min: number, max: number) => Math.round(mix(min, max, Math.random()));
const generateParagraphLength = () => randomInt(10, 40);
const generateWordLength = () => randomInt(20, 100);

// Randomly generate some paragraphs of word lengths
const paragraphsArray = Array.from(Array(40)).map(
    () => Array.from(Array(generateParagraphLength())).map(generateWordLength)
);

// Styles

const styles = `
.refresh {
  padding: 10px;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  width: 20px;
  height: 20px;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.content-placeholder {
  max-width: 600px;
  margin-top: 100px;
  margin-bottom: 200px;
  padding: 20px;
}

.header {
  width: 100%;
  margin-bottom: 50px;
}

.header .word {
  height: 50px;
  margin-right: 12px;
}

.word {
  height: 18px;
  background: white;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 8px;
  margin-right: 8px;
  background: white;
  border-radius: 10px;
  display: inline-block;
}

.paragraph {
  margin-bottom: 40px;
}

.progress-icon {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 120px;
  height: 120px;
}

@media (max-width: 600px) {
  .content-placeholder {
    padding-left: 80px;
  }

  .progress-icon {
    width: 70px;
    height: 70px;
    left: 10px;
    top: 10px;
  }

  .header .word {
    height: 30px;
  }

  .word {
    height: 14px;
    margin-bottom: 5px;
    margin-right: 5px;
  }

  .paragraph {
    margin-bottom: 20px;
  }
}
`;
