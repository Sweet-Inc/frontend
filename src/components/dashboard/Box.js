import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import {
  useDeleteBoxMutation,
  useEditBoxMutation,
  useGetAllBoxQuery,
  useCreateBoxMutation,
} from '../../services/box';
import { Button } from '@material-ui/core';
import EditModal from '../components/Modal';
import CreateModal from '../components/CreateModal';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  textContent:{
    display:'flex',
    justifyContent:'center',
  },
}));

export default function Box() {
  const classes = useStyles();
  const { data, isLoading } = useGetAllBoxQuery();
  const [deleteBox] = useDeleteBoxMutation();
  const [editBox] = useEditBoxMutation();
  const [createBox] = useCreateBoxMutation();

  const handleDelete = async (id) => {
    await deleteBox({ id });
  };

  const handleEdit = async (data) => {
    await editBox({ data });
  };

  const handleCreate = async (data) => {
    await createBox({ data });
  };

  return (
    <React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title>Boxes Management</Title>
        <CreateModal mgmtType="box" handleCreate={handleCreate} />
      </div>
      {!isLoading ? (
        <Table size="small">
          <TableHead>
            <TableRow>
        <TableCell >ID</TableCell>
        <TableCell >From Age</TableCell>
        <TableCell >To Age</TableCell>
        <TableCell >Pattern Name</TableCell>
        <TableCell >Status</TableCell>
        <TableCell >Quantity</TableCell>
        <TableCell   align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell >{item.id}</TableCell>
                <TableCell>{item.lowerAge}</TableCell>
                <TableCell>{item.upperAge}</TableCell>
                <TableCell>{item.boxPattern.name}</TableCell>
                <TableCell>{!item.status ? 'sold out' : 'available'}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell  align="right">
                  <div >
                    <EditModal
                      mgmtType="box"
                      dataItem={item}
                      handleEdit={handleEdit}

                    />
                    {/* ký tự đặc biệt để cách ra */}
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
