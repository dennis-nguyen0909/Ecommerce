import { Table } from 'antd'
import React from 'react'
import { useState, useEffect } from 'react';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
export const TableComponent = (props) => {
    const { isLoading = false, data = [], columns = [], handleDeleteMany } = props;
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])
    const [forceRender, setForceRender] = useState(false);

    useEffect(() => {
        // Khi isLoading hoặc data thay đổi, cập nhật state để kích hoạt render lại component
        setForceRender(prev => !prev);
    }, [isLoading, data]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys)
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name,
        // }),
    };

    const [selectionType, setSelectionType] = useState('checkbox');
    const handleDeleteManyAll = () => {
        handleDeleteMany(rowSelectedKeys);
    }
    return (
        <>
            {rowSelectedKeys.length > 0 && <div>
                <button onClick={handleDeleteManyAll} s>Xóa tất cả</button>
            </div>}
            <div>
                <LoadingComponent isLoading={isLoading}>
                    <Table
                        key={forceRender} // Key được cập nhật để kích hoạt render lại component khi state thay đổi
                        rowSelection={{
                            type: selectionType,
                            ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={data}
                        {...props}
                    />
                </LoadingComponent>
            </div>
        </>
    );
}

