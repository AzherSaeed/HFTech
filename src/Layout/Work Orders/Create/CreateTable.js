import { Table } from 'antd';
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',


        width: '30%',
    },
    {
        title: 'Age',
        dataIndex: 'age',

    },
    {
        title: 'Address',
        dataIndex: 'address',


        width: '40%',
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];

const onChange = (filters, sorter, extra) => {
    console.log('params', filters, sorter, extra);
};

const CreateTable = () => <Table columns={columns} dataSource={data} onChange={onChange} pagination={false} />;

export default CreateTable;