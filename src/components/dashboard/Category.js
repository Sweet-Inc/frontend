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
} from '../../services/category';

export default function Category() {
  const { data, isLoading } = useGetAllCategoryQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [editCategory] = useEditCategoryMutation();

  const handleDeleteCategory = async (id) => {
    await deleteCategory({ id });
  };

  const handleEditCategory = async (data) => {
    await editCategory({ data });
  };

  return (
    <React.Fragment>
      <Title>Categories Management</Title>
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
                <TableCell>{item.products}</TableCell>
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
