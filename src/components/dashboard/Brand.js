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
  useCreateBrandMutation,
} from '../../services/brand';
import CreateModal from '../components/CreateModal';

export default function Brand() {
  const { data, isLoading } = useGetAllBrandQuery();
  const [deleteBrand] = useDeleteBrandMutation();
  const [createBrand] = useCreateBrandMutation();
  const [editBrand] = useEditBrandMutation();

  const handleDeleteBrand = async (id) => {
    await deleteBrand({ id });
  };

  const handleEditBrand = async (data) => {
    await editBrand({ data });
  };

  const handleCreateBrand = async (data) => {
    await createBrand({ data });
  };

  return (
    <React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title>Brands Management</Title>
        <CreateModal mgmtType="brand" handleCreate={handleCreateBrand} />
      </div>
      {!isLoading ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Total products</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.origin?.name}</TableCell>
                <TableCell>{item.products?.length}</TableCell>
                <TableCell align="right">
                  <div>
                    <EditModal
                      mgmtType="brand"
                      dataItem={item}
                      handleEdit={handleEditBrand}
                    />
                    <span>&nbsp;</span>
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
