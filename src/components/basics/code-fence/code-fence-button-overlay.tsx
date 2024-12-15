import React from "react";
import {CopyButton} from "@/components/basics/input/copy-button";
import {CodeFenceButtonProps} from "@/components/basics/code-fence/code-fence-button-panel";
import {getRunButtonContent} from "@/components/basics/code-fence/run-button-content";


export function CodeFenceButtonOverlay(props: CodeFenceButtonProps) {

    return (
        <div>
            {props.showCopyButton && (
                <div className="absolute top-4 right-4">
                    <CopyButton textToCopy={props.copyCode}  size={18} />
                </div>
            )}
            {props.showRunButton && (
                <button
                    onClick={props.onRun}
                    disabled={props.onRun == undefined}
                    className="absolute top-4 right-14 hover:text-black text-gray-900"
                >
                    {getRunButtonContent(props)}
                </button>
            )}
        </div>
    );
}