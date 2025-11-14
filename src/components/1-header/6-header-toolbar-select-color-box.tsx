import { getPresetThemeStyles } from "@/store/2-apply-theme";

export function ThemeColors({ presetName, mode }: { presetName: string; mode: "light" | "dark"; }) {
    const styles = getPresetThemeStyles(presetName)[mode];
    return (
        <div className="flex gap-0.5">
            <ColorBox color={styles.primary} />
            <ColorBox color={styles.accent} />
            <ColorBox color={styles.secondary} />
            <ColorBox color={styles.border} />
        </div>
    );
}

export function ColorBox({ color }: { color: string; }) {
    return (
        <div className="size-4 rounded-sm border-foreground/30 border" style={{ backgroundColor: color }} />
    );
}
