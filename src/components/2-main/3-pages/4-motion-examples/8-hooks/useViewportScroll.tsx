// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/useViewportScroll.tsx
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, } from "motion/react"; // useScroll instead of useViewportScroll which is deprecated

export function HooksUseViewportScrollDemo() {
    return (<>
        <style>{styles}</style>

        <div className="example-container">
            <Example />
        </div>
    </>);
}

function Example() {
    const [isComplete, setIsComplete] = useState(false);
    const { scrollYProgress } = useScroll(); // useViewportScroll -> useScroll
    const yRange = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
    const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });

    useEffect(() => yRange.on("change", (v) => setIsComplete(v >= 1)), [yRange]);

    return (
        <div className="h-[500px] overflow-auto relative bg-[#7700ff]">
            <ContentPlaceholder />

            <svg className="progress-icon" viewBox="0 0 60 60">
                <motion.path
                    fill="none"
                    strokeWidth="5"
                    stroke="white"
                    strokeDasharray="0px 10000px"
                    d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                    style={{
                        pathLength,
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

function ContentPlaceholder() {
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

// Utilities

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
