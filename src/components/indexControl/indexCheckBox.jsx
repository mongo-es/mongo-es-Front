import React from "react";
import { CheckboxGroup } from "@radix-ui/themes";

export const IndexCheckbox = () => {
    return (
        <CheckboxGroup.Root
            className="CheckboxGroup"
            defaultValue={["apple"]}
            aria-label="Fruit"
        >
            <CheckboxGroup.Item className="CheckboxGroupItem" value="apple">
                Apple
            </CheckboxGroup.Item>
            <CheckboxGroup.Item className="CheckboxGroupItem" value="banana">
                Banana
            </CheckboxGroup.Item>
            <CheckboxGroup.Item className="CheckboxGroupItem" value="orange">
                Orange
            </CheckboxGroup.Item>
        </CheckboxGroup.Root>
    );
};
