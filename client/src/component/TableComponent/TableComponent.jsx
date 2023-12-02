import { Table } from 'antd'
import React from 'react'
import { useState, useEffect } from 'react';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
export const TableComponent = (props) => {
    const { isLoading = false, data = [], columns = [] } = props;
    const [forceRender, setForceRender] = useState(false);

    useEffect(() => {
        // Khi isLoading hoặc data thay đổi, cập nhật state để kích hoạt render lại component
        setForceRender(prev => !prev);
    }, [isLoading, data]);

    const rowSelection = {
        //...
    };

    const [selectionType, setSelectionType] = useState('checkbox');

    return (
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
    );
}

