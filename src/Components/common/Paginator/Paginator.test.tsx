import {create} from "react-test-renderer";
import ProfileStatus from "../../Profile/ProfileInfo/ProfileStatus";
import React from "react";
import {Paginator} from "./Paginator";

describe("Paginator component tests", () => {
    test("pages count is 11 but should be showed only 10", () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} currentPage={1}
                                            onPageChanged={() => {}} portionSize={10}/>);
        const root = component.root;
        let spans = root.findAllByType("span")
        expect(spans.length).toBe(10);
    });
    test("if pages count is smaller then 1 button Prev should be disable", () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} currentPage={1}
                                            onPageChanged={() => {}} portionSize={10}/>);
        const root = component.root;
        let button = root.findAllByType("button")
        expect(button[0].props.disabled).toBe(true)
    })
    test("if pages count is smaller then 1 button next should not be disable", () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} currentPage={1}
                                            onPageChanged={() => {}} portionSize={10}/>);
        const root = component.root;
        let button = root.findAllByType("button")
        expect(button[1].props.disabled).toBe(false)
    })
})