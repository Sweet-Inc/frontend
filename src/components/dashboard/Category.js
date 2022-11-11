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
  useGetAllCategoryQuery,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useCreateCategoryMutation,
} from '../../services/category';
import CreateModal from '../components/CreateModal';

export default function Category() {
  const { data, isLoading } = useGetAllCategoryQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();
  const [editCategory] = useEditCategoryMutation();

  const handleDeleteCategory = async (id) => {
    await deleteCategory({ id });
  };

  const handleEditCategory = async (data) => {
    await editCategory({ data });
  };

  const handleCreateCategory = async (data) => {
    await createCategory({ data });
  };

  return (
    <React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title>Categories Management</Title>
        <CreateModal mgmtType="category" handleCreate={handleCreateCategory} />
      </div>
      {!isLoading ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Products</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.products?.length}</TableCell>
                <TableCell align="right">
                  <div>
                    <EditModal
                      mgmtType="category"
                      dataItem={item}
                      handleEdit={handleEditCategory}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteCategory(item.id)}
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
