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
} from '../../services/box';
import { Button } from '@material-ui/core';
import EditModal from '../components/Modal';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Box() {
  const classes = useStyles();
  const { data, error, isLoading } = useGetAllBoxQuery();
  const [deleteBox, resultDelete] = useDeleteBoxMutation();
  const [editBox, resultEdit] = useEditBoxMutation();

  const handleDeleteBox = async (id) => {
    await deleteBox({ id });
  };

  const handleEditBox = async (data) => {
    await editBox({ data });
  };

  return (
    <React.Fragment>
      <Title>Box Management</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>From Age</TableCell>
            <TableCell>To Age</TableCell>
            <TableCell>Pattern ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.lowerAge}</TableCell>
              <TableCell>{item.upperAge}</TableCell>
              <TableCell>{item.boxPatternId}</TableCell>
              <TableCell>{!item.status ? 'sold out' : 'available'}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell align="right">
                <div>
                  <EditModal box={item} handleEditBox={handleEditBox} />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteBox(item.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
