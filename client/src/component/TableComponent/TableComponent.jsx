import { Table } from 'antd'
import React from 'react'
import { useState } from 'react';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
export const TableComponent = (props) => {
    const { isLoading = false, data = [], columns = [] } = props
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    const [selectionType, setSelectionType] = useState('checkbox');
    return (
        <div>
            <LoadingComponent isLoading={isLoading}>

                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                />
            </LoadingComponent>
        </div>
    );
}
