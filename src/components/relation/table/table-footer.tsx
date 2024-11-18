import {RelationState} from "@/model/relation-state";
import React from "react";
import {ChevronFirst, ChevronLast, ChevronLeft, ChevronRight} from "lucide-react";
import {useRelationsState} from "@/state/relations.state";
import {useConnectionsState} from "@/state/connections.state";


export interface RelationViewFooterProps {
    relation: RelationState
}

function formatNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function TableFooter(props: RelationViewFooterProps) {

    // format the number with , e.g. 1,000,000
    let countText = props.relation.query.totalCount;
    const startIndex = props.relation.query.parameters.offset + 1;

    const endIndex = Math.min(props.relation.query.parameters.offset + props.relation.query.parameters.limit, props.relation.query.totalCount);
    const testShowingRange = `Showing ${formatNumber(startIndex)} to ${formatNumber(endIndex)} of ${formatNumber(countText)}`;

    const connectionName = useConnectionsState((state) => state.getConnectionName(props.relation.connectionId));
    const textDurationAndConnection = `In ${formatDuration(props.relation.query.duration)} from ${connectionName}`;
    return (
        <div className="flex flex-row items-center p-2 border-t border-gray-200 text-sm space-x-4">
            <div className="flex flex-row items-center space-x-2">
                <RelationViewPageController relation={props.relation}/>
                <div className="mr-2">
                    {testShowingRange}
                </div>
            </div>
            <div className="flex-grow"/>
            <div className="pr-2">
                {textDurationAndConnection}
            </div>
        </div>
    );
}

function formatDuration(duration: number): string {
    if (duration < 1) {
        return `${Math.round(duration * 1000)}ms`;
    } else {
        // round to 2 decimal places, also if 2.00 show 2.00 not 2
        return `${duration.toFixed(2)}s`;
    }
}

export function RelationViewPageController(props: RelationViewFooterProps) {
    const {relation} = props;
    const maxPage = Math.ceil(relation.query.totalCount / relation.query.parameters.limit);
    const currentPage = Math.floor(relation.query.parameters.offset / relation.query.parameters.limit) + 1;
    const text = `Page ${formatNumber(currentPage)} of ${formatNumber(maxPage)}`;

    const iconSize = 16;
    const updateRelationDisplayRange = useRelationsState((state) => state.updateRelationData);

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === maxPage;

    const handleUpdateRange = (offset: number) => {

        const currentQueryParams = relation.query.parameters;
        const updatedQueryParams = {
            ...currentQueryParams,
            offset: offset
        }
        updateRelationDisplayRange(relation.id, updatedQueryParams);
    };

    return (
        <div className="flex flex-row items-center space-x-2">
            <button
                className={`transition-all rounded ${isFirstPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 active:bg-gray-300'}`}
                onClick={() => handleUpdateRange(0)}
                disabled={isFirstPage}
            >
                <ChevronFirst size={iconSize}/>
            </button>
            <button
                className={`transition-all rounded ${isFirstPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 active:bg-gray-300'}`}
                onClick={() => handleUpdateRange(Math.max(0, relation.query.parameters.offset - relation.query.parameters.limit))}
                disabled={isFirstPage}
            >
                <ChevronLeft size={iconSize}/>
            </button>
            <div>{text}</div>
            <button
                className={`transition-all rounded ${isLastPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 active:bg-gray-300'}`}
                onClick={() => handleUpdateRange(Math.min(relation.query.totalCount - relation.query.parameters.limit, relation.query.parameters.offset + relation.query.parameters.limit))}
                disabled={isLastPage}
            >
                <ChevronRight size={iconSize}/>
            </button>
            <button
                className={`transition-all rounded ${isLastPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 active:bg-gray-300'}`}
                onClick={() => handleUpdateRange(Math.max(0, relation.query.totalCount - relation.query.parameters.limit))}
                disabled={isLastPage}
            >
                <ChevronLast size={iconSize}/>
            </button>
        </div>
    );
}
