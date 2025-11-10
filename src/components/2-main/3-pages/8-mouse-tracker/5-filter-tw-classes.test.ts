import { describe, it, expect } from "vitest";
import { isTwColorClass } from "./5-filter-tw-classes";

describe('isTwColorClass', () => {
    it('returns true for standard color classes', () => {
        expect(isTwColorClass('text-red-500')).toBe(true);
        expect(isTwColorClass('bg-blue-100')).toBe(true);
        expect(isTwColorClass('border-slate-50')).toBe(true);
    });

    it('returns true for arbitrary color values', () => {
        expect(isTwColorClass('text-[#ff0000]')).toBe(true);
        expect(isTwColorClass('bg-[rgb(255,0,0)]')).toBe(true);
    });

    it('returns false for non-color text classes', () => {
        expect(isTwColorClass('text-xs')).toBe(false);
        expect(isTwColorClass('text-center')).toBe(false);
        expect(isTwColorClass('text-5xl')).toBe(false);
    });

    it('handles modifiers/variants by checking the last segment', () => {
        expect(isTwColorClass('hover:text-green-300')).toBe(true);
        expect(isTwColorClass('dark:text-sm')).toBe(false); // size in dark: modifier
    });

    it('returns false for unrelated classes', () => {
        expect(isTwColorClass('flex')).toBe(false);
        // `shadow` does not include a dash and the function ultimately rejects it, so expect false
        expect(isTwColorClass('shadow')).toBe(false);
    });
});