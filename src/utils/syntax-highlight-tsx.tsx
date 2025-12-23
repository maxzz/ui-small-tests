import React from "react";

// Simple syntax highlighter for TSX code
export function highlightTsxCode(code: string): React.ReactNode[] {
    const lines = code.split('\n');

    return lines.map((line, lineIndex) => {
        // Step 1: Escape HTML to prevent XSS and confusion
        let safeLine = line
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // Step 2: Extract strings and comments to placeholders so they aren't processed by other regexes
        const tokens: { type: string, content: string; }[] = [];
        const placeholders: string[] = [];

        const storeToken = (type: string, content: string) => {
            const id = `__TOKEN_${tokens.length}__`;
            tokens.push({ type, content });
            placeholders.push(id);
            return id;
        };

        // Replace comments first
        let processedLine = safeLine
            .replace(/(\/\/.*$)/g, (match) => storeToken('comment', match))
            .replace(/(\/\*[\s\S]*?\*\/)/g, (match) => storeToken('comment', match));

        // Replace strings
        processedLine = processedLine
            .replace(/(&quot;(?:[^&]|&(?!quot;))*&quot;)/g, (match) => storeToken('string', match))
            .replace(/(&#39;(?:[^&]|&(?!#39;))*&#39;)/g, (match) => storeToken('string', match))
            .replace(/(`(?:[^`\\]|\\.)*`)/g, (match) => storeToken('string', match));

        // Step 3: Highlight keywords and other elements in the remaining text
        // (Now safe because strings/comments are hidden)

        processedLine = processedLine
            // Keywords
            .replace(/\b(import|export|from|const|let|var|function|return|if|else|switch|case|default|break|continue|for|while|do|try|catch|finally|throw|new|typeof|instanceof|class|extends|implements|interface|type|enum|async|await|yield|static|get|set|public|private|protected|readonly|as|is)\b/g,
                '<span class="text-purple-600 dark:text-purple-400 font-medium">$1</span>')
            // React/JSX hooks
            .replace(/\b(React|useState|useEffect|useRef|useMemo|useCallback|useContext|useReducer|forwardRef)\b/g,
                '<span class="text-cyan-600 dark:text-cyan-400">$1</span>')
            // Types
            .replace(/\b(string|number|boolean|null|undefined|void|any|never|unknown|object|Array|Promise|Record)\b/g,
                '<span class="text-sky-600 dark:text-sky-400">$1</span>');
        // Numbers (careful not to match inside existing tags, though tags should mostly be class names now)
        // We use a lookahead to ensure we aren't inside a tag attribute if possible, but placeholders help.
        // Actually, we inserted HTML tags above. "text-purple-600" contains "600".
        // So we MUST mask the HTML tags we just added too!

        // Wait, simpler approach: Don't add HTML tags yet. Add placeholders for EVERYTHING.

        // ... (Re-thinking strategy to be fully safe) ...

        // Let's go back to single-pass replacements but be very careful about order and matches.
        // OR better: Just use the placeholders for the HTML tags too?

        // Let's refine the placeholder strategy:
        // 1. Comments -> PLACEHOLDER
        // 2. Strings -> PLACEHOLDER
        // 3. Keywords -> PLACEHOLDER
        // 4. ...
        // 5. Restore all placeholders with their final HTML.

        // Actually, the "600" inside "text-purple-600" is the main culprit visible in the screenshot.
        // If I perform all replacements and *then* re-insert them, I avoid matching inside the HTML.

        // Let's do the "Mask everything then Unmask" approach.

        return (
            <div key={lineIndex} className="flex hover:bg-muted/50">
                <span className="w-12 text-right pr-4 text-muted-foreground/50 select-none border-r border-border/50 mr-4">{lineIndex + 1}</span>
                <span dangerouslySetInnerHTML={{ __html: simpleHighlight(safeLine) }} />
            </div>
        );
    });
}

function simpleHighlight(line: string): string {
    // 1. Mask strings and comments
    const tokens: string[] = [];
    const mask = (str: string) => {
        const id = `___TOKEN_${tokens.length}___`;
        tokens.push(str);
        return id;
    };

    let temp = line
        .replace(/(\/\/.*$)/g, m => mask(`<span class="text-emerald-600 dark:text-emerald-400">${m}</span>`))
        .replace(/(&quot;.*?&quot;|&#39;.*?&#39;|`.*?`)/g, m => mask(`<span class="text-amber-600 dark:text-amber-400">${m}</span>`));

    // 2. Highlight Keywords (now safe from strings/comments)
    temp = temp
        .replace(/\b(import|export|from|const|let|var|function|return|if|else|switch|case|default|break|continue|for|while|do|try|catch|finally|throw|new|typeof|instanceof|class|extends|implements|interface|type|enum|async|await|yield|static|get|set|public|private|protected|readonly|as|is)\b/g,
            m => mask(`<span class="text-purple-600 dark:text-purple-400 font-medium">${m}</span>`))
        .replace(/\b(React|useState|useEffect|useRef|useMemo|useCallback|useContext|useReducer|forwardRef)\b/g,
            m => mask(`<span class="text-cyan-600 dark:text-cyan-400">${m}</span>`))
        .replace(/\b(string|number|boolean|null|undefined|void|any|never|unknown|object|Array|Promise|Record)\b/g,
            m => mask(`<span class="text-sky-600 dark:text-sky-400">${m}</span>`))
        .replace(/\b(\d+)\b/g,
            m => mask(`<span class="text-orange-500 dark:text-orange-400">${m}</span>`))
        .replace(/\b(true|false)\b/g,
            m => mask(`<span class="text-orange-600 dark:text-orange-400 font-medium">${m}</span>`));

    // 3. Restore all tokens
    // We need to restore recursively or loop because we replaced with masks that contain the content?
    // No, we stored the *final HTML* in the tokens array.
    // So we just replace the placeholder IDs with the stored HTML.

    // Reverse order restoration isn't strictly necessary if IDs are unique, but good practice.
    // However, since we masked sequentially, we can just replace all occurrences.

    tokens.forEach((content, i) => {
        temp = temp.replace(`___TOKEN_${i}___`, content);
    });

    return temp;
}
