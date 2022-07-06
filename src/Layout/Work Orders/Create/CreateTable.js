import { Table } from 'antd';
import { useState } from 'react';
import { TableWorkOrderStyled } from './style';
const columns = [
    {
        title: 'Customer',
        dataIndex: 'customer',
    },
    {
        title: 'City',
        dataIndex: 'city',
    },
    {
        title: 'ST',
        dataIndex: 'st',
    },
    {
        title: 'Owner',
        dataIndex: 'owner',
    },

];
const data = [];

for (let i = 0; i < 17; i++) {
    data.push({
        key: i,
        customer: `Jamen Tabesh`,
        st: 'CA',
        city: `Los Angeles`,
        owner: `Jamen Tabesh`,
    });
}

const CreateTable = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,

    };
    return (
        <TableWorkOrderStyled>
            <Table pagination={false} rowSelection={rowSelection} columns={columns} dataSource={data} />
        </TableWorkOrderStyled>

    )
};

export default CreateTable;