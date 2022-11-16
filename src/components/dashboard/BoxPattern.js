import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import {
  useCreateBoxPatternMutation,
  useDeleteBoxPatternMutation,
  useEditBoxPatternMutation,
  useGetAllBoxPatternQuery,
} from '../../services/boxPattern';
import { Button } from '@material-ui/core';
import EditModal from '../components/Modal';
import CreateModal from '../components/CreateModal';

export default function BoxPattern() {
  const { data, isLoading } = useGetAllBoxPatternQuery();
  const [deleteBoxPattern] = useDeleteBoxPatternMutation();
  const [editBoxPattern] = useEditBoxPatternMutation();
  const [createBoxPattern] = useCreateBoxPatternMutation();

  const handleDelete = async (id) => {
    await deleteBoxPattern({ id });
  };

  const handleEdit = async (data) => {
    await editBoxPattern({ data });
  };

  const handleCreate = async (data) => {
    await createBoxPattern({ data });
  };

  return (
    <React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title>Box patterns Management</Title>
        <CreateModal mgmtType="boxPattern" handleCreate={handleCreate} />
      </div>
      {!isLoading ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <img src={item.image} width={100} alt="pic" />
                </TableCell>
                <TableCell>
                  {item.status ? 'Available' : 'Not available'}
                </TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell align="right">
                  <div>
                    <EditModal
                      mgmtType="boxPattern"
                      dataItem={item}
                      handleEdit={handleEdit}
                    />
                    <span>&nbsp;</span>

                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>Loading...</p>
      )}
    </React.Fragment>
  );
}
