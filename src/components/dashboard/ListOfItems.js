import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';

export default function ListOfItems({ handleChangeMgmt }) {
  return (
    <div>
      <ListItem button onClick={() => handleChangeMgmt('boxes')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Boxes" />
      </ListItem>
      <ListItem button onClick={() => handleChangeMgmt('brands')}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Brands" />
      </ListItem>
      <ListItem button onClick={() => handleChangeMgmt('categories')}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItem>
    </div>
  );
}
