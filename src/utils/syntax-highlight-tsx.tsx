import React from "react";

// Simple syntax highlighter for TSX code
export function highlightTsxCode(code: string): React.ReactNode[] {
    const tokens: { type: 'text' | 'comment' | 'string', content: string }[] = [];
    
    // Regex to match comments and strings
    // Group 1: Comments (Block /*...*/ or Line //...)
    // Group 2: Strings ("...", '...', `...`)
    const tokenRegex = /(\/\*[\s\S]*?\*\/|\/\/.*)|("(?:\\[\s\S]|[^"])*"|'(?:\\[\s\S]|[^'])*'|`(?:\\[\s\S]|[^`])*`)/g;
    
    let lastIndex = 0;
    let match;

    while ((match = tokenRegex.exec(code)) !== null) {
        // Add preceding text as code
        if (match.index > lastIndex) {
            tokens.push({ type: 'text', content: code.slice(lastIndex, match.index) });
        }

        const content = match[0];
        // Determine type based on which group matched
        if (match[1]) {
            tokens.push({ type: 'comment', content });
        } else if (match[2]) {
            tokens.push({ type: 'string', content });
        }

        lastIndex = tokenRegex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < code.length) {
        tokens.push({ type: 'text', content: code.slice(lastIndex) });
    }

    // Process tokens into lines of HTML
    const htmlLines: string[] = [""];
    
    tokens.forEach(token => {
        // Split content by newline to handle multi-line tokens
        const parts = token.content.split('\n');
        
        parts.forEach((part, i) => {
            const escapedPart = part
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            
            let styledPart = escapedPart;
            
            if (token.type === 'comment') {
                styledPart = `<span class="text-emerald-600 dark:text-emerald-400">${escapedPart}</span>`;
            } else if (token.type === 'string') {
                styledPart = `<span class="text-amber-600 dark:text-amber-400">${escapedPart}</span>`;
            } else if (token.type === 'text') {
                styledPart = highlightKeywords(escapedPart);
            }

            // Append to current line
            htmlLines[htmlLines.length - 1] += styledPart;
            
            // If not the last part, push a new line
            if (i < parts.length - 1) {
                htmlLines.push("");
            }
        });
    });

    return htmlLines.map((html, lineIndex) => (
        <div key={lineIndex} className="flex hover:bg-muted/50">
            <span className="w-12 text-right pr-4 text-muted-foreground/50 select-none border-r border-border/50 mr-4">{lineIndex + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: html || ' ' }} />
        </div>
    ));
}

function highlightKeywords(text: string): string {
    return text
        // Keywords
        .replace(/\b(import|export|from|const|let|var|function|return|if|else|switch|case|default|break|continue|for|while|do|try|catch|finally|throw|new|typeof|instanceof|class|extends|implements|interface|type|enum|async|await|yield|static|get|set|public|private|protected|readonly|as|is)\b/g,
            '<span class="text-purple-600 dark:text-purple-400 font-medium">$1</span>')
        // React/JSX hooks
        .replace(/\b(React|useState|useEffect|useRef|useMemo|useCallback|useContext|useReducer|forwardRef)\b/g,
            '<span class="text-cyan-600 dark:text-cyan-400">$1</span>')
        // Types
        .replace(/\b(string|number|boolean|null|undefined|void|any|never|unknown|object|Array|Promise|Record)\b/g,
            '<span class="text-sky-600 dark:text-sky-400">$1</span>')
        // Numbers
        .replace(/\b(\d+)\b/g,
            '<span class="text-orange-500 dark:text-orange-400">$1</span>')
        // Booleans
        .replace(/\b(true|false)\b/g,
            '<span class="text-orange-600 dark:text-orange-400 font-medium">$1</span>');
}
