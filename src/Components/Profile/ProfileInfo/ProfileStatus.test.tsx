import React from "react";
import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props shpuld be in state", () => {
        const component = create(<ProfileStatus status="it" updateStatus={() => {
        }}/>);
        const root = component.root;
            expect(root?.instance.state.status).toBe("it");
    });
    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus status="it" updateStatus={() => {
        }}/>);
        const root = component.root;
        if (root) {
            let span = root.findByType("span");
            expect(span).not.toBeNull
        }
    });
    test("after creation <input> should be displayed", () => {
        const component = create(<ProfileStatus status="it" updateStatus={() => {
        }}/>);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    });
    test("after creation <span> should contains correct status", () => {
        const component = create(<ProfileStatus status="it" updateStatus={() => {
        }}/>);
        const root = component.root;
        if (root) {
            let span = root.findByType("span");
            expect(span.children[0]).toBe("it")
        }
    });
    test("input should be displayed in EdirMode instead of span", () => {
        const component = create(<ProfileStatus status="it" updateStatus={() => {
        }}/>);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("it")
    });

    test("callback sould be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="it" updateStatus={mockCallback}/>);
        const root = component.root;
        root?.instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1)
    });
});