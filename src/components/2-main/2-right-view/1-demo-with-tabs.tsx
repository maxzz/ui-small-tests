import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { demoSourceCodes } from "../3-pages/4-motion-examples/motion-examples-source-codes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";
import { highlightTsxCode } from "@/utils/syntax-highlight-tsx";
import { type MotionExampleId } from "@/components/2-main/3-pages/4-motion-examples/motion-examples-types";

/**
 * Wrapper component for demos with tabs (Demo + Source Code)
 */
export function DemoWithTabs({ demoId, children }: { demoId: MotionExampleId; children: React.ReactNode; }) {
    
    const sourceCode = demoSourceCodes[demoId as keyof typeof demoSourceCodes];
    const isMissing = !sourceCode;

    // Debug info header
    const debugInfo = `// [DEBUG INFO]
// Requested Demo ID: "${demoId}"
// Found in map: ${isMissing ? "NO" : "YES"}
// Content type: ${typeof sourceCode}
// Content length: ${sourceCode?.length || 0}
// Content preview: ${sourceCode?.slice(0, 50).replace(/\n/g, '\\n')}...
// ----------------------------------------
`;

    const displayCode = isMissing
        ? `${debugInfo}\n// Available keys:\n// ${Object.keys(demoSourceCodes).filter(k => k.includes(demoId.split('-')[0])).join('\n// ')}`
        : `${debugInfo}\n${sourceCode}`;

    return (
        <Tabs defaultValue="demo" className="h-full flex flex-col">

            <TabsList className="grid w-full grid-cols-2 mx-2 mt-1">
                <TabsTrigger value="demo">Demo</TabsTrigger>
                <TabsTrigger value="source">Source Code</TabsTrigger>
            </TabsList>

            <TabsContent value="demo" className="flex-1 overflow-auto mt-0">
                {children}
            </TabsContent>

            <TabsContent value="source" className="flex-1 overflow-auto mt-0">
                <ScrollArea className="h-full">
                    <pre className="p-4 text-xs font-mono bg-muted/30 leading-relaxed">
                        <code>{highlightTsxCode(displayCode)}</code>
                    </pre>
                </ScrollArea>
            </TabsContent>

        </Tabs>
    );
}
