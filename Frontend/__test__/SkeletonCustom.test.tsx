import { render, screen } from "@testing-library/react";
import { SkeletonCustom } from "../src/lib/SkeletonCustom";
import '@testing-library/jest-dom';
import React from "react";
import { describe, it, expect } from '@jest/globals';

describe("SkeletonCustom Component", () => {
    it("renders the skeleton loader with default props", () => {
        render(<SkeletonCustom />);
        const container = screen.getByTestId("skeleton-container");
        expect(document.body.contains(container)).toBeTruthy();
        expect(screen.getAllByTestId("skeleton-element")).toHaveLength(6);
        expect(container.classList.contains('grid')).toBeTruthy();
    });

    it("renders multiple skeleton elements based on count", () => {
        render(<SkeletonCustom count={3} />);
        expect(screen.getAllByTestId("skeleton-element")).toHaveLength(3);
    });

    it("handles zero count properly", () => {
        render(<SkeletonCustom count={0} />);
        expect(screen.queryAllByTestId("skeleton-element")).toHaveLength(0);
    });

    it("applies correct width and height", () => {
        render(<SkeletonCustom width={150} height={50} />);
        const skeletonElement = screen.getByTestId("skeleton-element");
        expect(skeletonElement.style).toMatchObject({
            width: '150px',
            height: '50px'
        });
    });

    it("renders circular skeleton when circle prop is true", () => {
        render(<SkeletonCustom circle={true} width={100} height={100} />);
        const skeletonElement = screen.getByTestId("skeleton-element");
        expect(skeletonElement.style).toMatchObject({
            borderRadius: '50%'
        });
    });

    it("applies custom className correctly", () => {
        const customClass = "custom-skeleton";
        render(<SkeletonCustom className={customClass} />);
        const skeletonElement = screen.getByTestId("skeleton-element");
        expect(skeletonElement.classList.contains(customClass)).toBeTruthy();
    });

    it("handles large dimensions correctly", () => {
        render(<SkeletonCustom width={1000} height={800} />);
        const skeletonElement = screen.getByTestId("skeleton-element");
        expect(skeletonElement.style).toMatchObject({
            width: '1000px',
            height: '800px'
        });
    });

});