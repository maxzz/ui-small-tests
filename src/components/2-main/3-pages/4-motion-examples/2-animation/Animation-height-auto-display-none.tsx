// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-height-auto-display-none.tsx
import { useState } from "react";
import { mix, motion } from "motion/react";

/**
 * This is an example of animating height: auto from a component that was display: none
 *
 * Currently broken
 */
export function AnimationHeightAutoDisplayNoneDemo() {
    // This approach is if you only want max one section open at a time. If you want multiple
    // sections to potentially be open simultaneously, they can all be given their own `useState`.
    const [expanded, setExpanded] = useState<false | number>(0);

    return (
        <div className="example-container">
            {[0, 1, 2, 3].map(
                (i) => (
                    <Accordion key={i} i={i} expanded={expanded} setExpanded={setExpanded} />
                )
            )}
            {/* <style>{styles}</style> */}
        </div>
    );
}

function Accordion({ i, expanded, setExpanded }: { i: number; expanded: false | number; setExpanded: any; }) {
    const isOpen = i === expanded;

    // By using `AnimatePresence` to mount and unmount the contents, we can animate
    // them in and out while also only rendering the contents of open accordions
    return (<>
        <motion.header
            initial={false}
            animate={{ backgroundColor: isOpen ? "#FF0088" : "#0055FF" }}
            onClick={() => setExpanded(isOpen ? false : i)} />
        <motion.section
            initial="collapsed"
            animate={isOpen ? "open" : "collapsed"}
            variants={{
                open: { display: "block", opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0, transitionEnd: { display: "none" }, },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
            <ContentPlaceholder />
        </motion.section>
    </>);
}

// Randomly generate some paragraphs of word lengths

function ContentPlaceholder() {
    return (
        <motion.div
            className="content-placeholder"
            variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
            transition={{ duration: 0.8 }}
        >
            {paragraphs.map((words, i) => (
                <Paragraph key={i} words={words} />
            ))}
        </motion.div>
    );
}

const paragraphs = Array(3).fill(1).map(() => Array(generateParagraphLength()).fill(1).map(generateWordLength));

function Paragraph({ words }: { words: number[]; }) {
    return (
        <div className="paragraph">
            {words.map((width, i) => (
                <Word key={i} width={width} />
            ))}
        </div>
    );
}

function Word({ width }: { width: number; }) {
    return <div className="word" style={{ width }} />;
}

function randomInt(min: number, max: number) {
    return Math.round(mix(min, max, Math.random()));
}

function generateParagraphLength() {
    return randomInt(5, 20);
}

function generateWordLength() {
    return randomInt(20, 100);
}

const styles = `
.example-container {
  width: 320px;
  padding: 20px;
}

.content-placeholder {
  padding: 20px;
  transform-origin: top center;
}

header {
  background: #0055ff;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  height: 40px;
  margin-bottom: 20px;
}

.word {
  height: 18px;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 8px;
  margin-right: 8px;
  background: #0055ff;
  border-radius: 10px;
  display: inline-block;
}

.paragraph {
  margin-bottom: 20px;
}

section {
  overflow: hidden;
}

@media (max-width: 600px) {
  .content-placeholder {
    padding-left: 20px;
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
}`;
