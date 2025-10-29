import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/shadcn/select";
import { useAtom } from "jotai";
import { themeStateAtom } from "@/store/apply-theme";

export function Section1_Header({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const [themeState, setThemeState] = useAtom(themeStateAtom);
    return (
        <header className={classNames(sectionClasses, className)} {...rest}>

            <div className="pb-1 text-[.65rem]">
                ... the time is gone, the song is over, thought I'd something more to say.
            </div>

            <div className="text-xs">
                <Select defaultValue="option1" onValueChange={(value) => console.log("Selected:", value)}>
                    <SelectTrigger className="px-2 !h-6 text-xs rounded-sm">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem className="text-xs" value="option1">Option 1</SelectItem>
                        <SelectItem className="text-xs" value="option2">Option 2</SelectItem>
                    </SelectContent>
                </Select>
            </div>

        </header>
    );
}

const sectionClasses = "\
px-4 h-9 \
text-gray-500 dark:text-slate-600 \
dark:bg-black border-border \
border-b \
flex items-center justify-between \
";
