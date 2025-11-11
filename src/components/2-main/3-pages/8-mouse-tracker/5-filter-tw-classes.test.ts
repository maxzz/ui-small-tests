import { describe, it, expect } from "vitest";
import { isTwColorClass } from "./5-filter-tw-classes";

describe('isTwColorClass', () => {
    it('returns true for standard color classes', () => {
        expect(isTwColorClass('text-red-500')).toBe(true);
        expect(isTwColorClass('bg-blue-100')).toBe(true);
        expect(isTwColorClass('border-slate-50')).toBe(true);
    });

    it('handles border variants and grouped prefixes', () => {
        // The tests confirm the grouped border-(?:t|r|b|l|x|y|s|e)- pattern and border- both match correctly.
        // also ensure longer border variants match (border-t-, border-x-, etc.)
        expect(isTwColorClass('border-t-blue-500')).toBe(true);
        expect(isTwColorClass('border-x-red-200')).toBe(true);
        // Plain `border-` color should still match
        expect(isTwColorClass('border-blue-300')).toBe(true);
    });

    it('returns true for arbitrary color values', () => {
        expect(isTwColorClass('text-[#ff0000]')).toBe(true);
        expect(isTwColorClass('bg-[rgb(255,0,0)]')).toBe(true);
        expect(isTwColorClass('text-[#000]')).toBe(true);
        expect(isTwColorClass('bg-[oklch(0.5,0.2,180)]')).toBe(true);
        // Invalid arbitrary values should return false
        expect(isTwColorClass('text-[notacolor]')).toBe(false);
    });

    it('handles custom color definitions', () => {
        expect(isTwColorClass('bg-card')).toBe(true);
        expect(isTwColorClass('text-primary')).toBe(true);
        expect(isTwColorClass('border-accent')).toBe(true);
    });

    it('handles opacity modifiers', () => {
        expect(isTwColorClass('bg-red-500/50')).toBe(true);
        expect(isTwColorClass('text-blue-300/75')).toBe(true);
        expect(isTwColorClass('border-slate-100/25')).toBe(true);
    });

    it('handles shadow variants with and without dash', () => {
        expect(isTwColorClass('shadow')).toBe(true);
        expect(isTwColorClass('shadow-none')).toBe(true);
        expect(isTwColorClass('shadow-red-500')).toBe(true);
        // Note: shadow-lg returns true because custom colors are allowed (can't distinguish from sizes)
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
    });
});
