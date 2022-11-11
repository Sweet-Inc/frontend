import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { Button } from '@material-ui/core';
import EditModal from '../components/Modal';
import {
  useGetAllBrandQuery,
  useDeleteBrandMutation,
  useEditBrandMutation,
} from '../../services/brand';

export default function Brand() {
  const { data, isLoading } = useGetAllBrandQuery();
  const [deleteBrand] = useDeleteBrandMutation();
  const [editBrand] = useEditBrandMutation();

  const handleDeleteBrand = async (id) => {
    await deleteBrand({ id });
  };

  const handleEditBrand = async (data) => {
    await editBrand({ data });
  };

  return (
    <React.Fragment>
      <Title>Brands Management</Title>
      {!isLoading ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Products</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.origin}</TableCell>
                <TableCell>{item.products}</TableCell>
                <TableCell align="right">
                  <div>
                    <EditModal
                      mgmtType="brand"
                      dataItem={item}
                      handleEdit={handleEditBrand}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteBrand(item.id)}
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
