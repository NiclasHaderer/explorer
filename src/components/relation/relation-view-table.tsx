import {ColumnHead} from "@/components/relation/column-head";
import {RowView} from "@/components/relation/row-view";
import React from "react";
import {Relation} from "@/model/relation";
import {RelationTableViewState} from "@/components/relation/relation-view";

export interface RelationViewTableProps {
    relation: Relation;
    displayState: RelationTableViewState;
    setDisplayState: (state: RelationTableViewState) => void;

}

export function RelationViewTable(props: RelationViewTableProps) {
    return (
        <table
            className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 w-fit mr-32"
            style={{
                tableLayout: "fixed",
                borderCollapse: "collapse",
            }}
        >
            <thead
                className="border-0 text-s text-gray-700 bg-white dark:bg-black dark:text-gray-400 sticky top-0 z-20">
            <tr>
                {/* Row index column header, should fit the cells with*/}
                <th
                    scope="col"
                    className="p-0 m-0 h-8 sticky left-0 z-10 bg-white dark:bg-black dark:text-gray-400"
                    style={{width: '64px', overflow: 'hidden'}}
                >
                    <div
                        className="w-full h-full absolute right-0 top-0 z-50 border-r border-b border-gray-700 dark:border-gray-700"
                    />


                </th>
                {/* Column headers */}
                {props.relation.columns.map((column, index) => (
                    <ColumnHead
                        key={index}
                        column={column}
                        columnIndex={index}
                        displayState={props.displayState}
                        setDisplayState={props.setDisplayState}
                    />
                ))}
            </tr>
            </thead>
            <tbody>
            {props.relation.rows.map((row, index) => (
                <RowView key={index} rowIndex={index} row={row} displayState={props.displayState}/>
            ))}
            </tbody>
        </table>
    )
}