import { alpha, Toolbar, Typography } from '@mui/material';
import PropTypes from 'prop-types';


export function CheckboxTableToolBar(props) {
    const { numSelected, title, checkedOptionComponent, uncheckedOptionComponent } = props;
    return (
      <Toolbar
        sx={[
          {
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          },
          numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          },
        ]}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%', fontWeight: "bold" }}
            variant="h5"
            id="tableTitle"
            component="div"
          >
            {title}
          </Typography>
        )}
        {numSelected > 0 ? (
            checkedOptionComponent
        ) : (
          uncheckedOptionComponent
        )}
      </Toolbar>
    );
  }
  
  CheckboxTableToolBar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    checkedOptionComponent: PropTypes.element.isRequired,
    uncheckedOptionComponent: PropTypes.element.isRequired
  };
  