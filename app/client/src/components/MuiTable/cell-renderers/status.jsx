import * as React from 'react';
import Chip from '@mui/material/Chip';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import SyncIcon from '@mui/icons-material/Sync';

import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import InfoIcon from '@mui/icons-material/Info';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DoneIcon from '@mui/icons-material/Done';
import {
  GridEditModes,
  useGridApiContext,
  useGridRootProps,
} from '@mui/x-data-grid';
import AutoFixNormalOutlinedIcon from '@mui/icons-material/AutoFixNormalOutlined';

export const STATUS_OPTIONS = ['Open', 'PartiallyFilled', 'Filled', 'rejected', 'processed'];

const StyledChip = styled(Chip)(({ theme }) => ({
  justifyContent: 'left',
  borderRadius: '8px',
  fontSize: 'inherit',
  fontWeight: '700',
  marginLeft: '20px',
  marginBottom: '5px',
  '&:hover': {
    cursor: 'pointer'
  },
  '& .icon': {
    color: 'inherit',
  },
  '&.Open': {
    color: (theme.vars || theme).palette.info.dark,
    border: `1px solid ${(theme.vars || theme).palette.info.main}`,
  },
  '&.Filled': {
    color: (theme.vars || theme).palette.success.dark,
    border: `1px solid ${(theme.vars || theme).palette.success.main}`,
  },
  '&.PartiallyFilled': {
    color: (theme.vars || theme).palette.warning.dark,
    border: `1px solid ${(theme.vars || theme).palette.warning.main}`,
  },
  '&.rejected': {
    color: '#fff',
    marginLeft: '0',
    backgroundColor: (theme.vars || theme).palette.error.dark,
    border: `1px solid ${(theme.vars || theme).palette.error.main}`,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
  },
  '&.processed': {
    backgroundColor: '#b8ffb3 !important',
    color: (theme.vars || theme).palette.success.dark,
    border: `1px solid ${(theme.vars || theme).palette.success.main}`,
  },
  '&.Processing': {
    backgroundColor: '#ffa72614',
    color: (theme.vars || theme).palette.warning.dark,
    border: `1px solid ${(theme.vars || theme).palette.warning.main}`,
  },
  '&.basic': {
    backgroundColor: '#dadcff !important',
    color: '#000',
    border: `1px solid ${(theme.vars || theme).palette.success.main}`,
  },
}));

const Status = (props) => {
  const { status } = props;

  let icon = null;
  if (status === 'rejected') {
    icon = <ReportProblemIcon className="icon" />;
  } else if (status === 'Open') {
    icon = <InfoIcon className="icon" />;
  } else if (status === 'PartiallyFilled') {
    icon = <AutorenewIcon className="icon" />;
  } else if (status === 'Filled') {
    icon = <DoneIcon className="icon" />;
  } else if (status === 'processed') {
    icon = <DoneIcon className="icon" />;
  } else if (status === 'Completed') {
    icon = <DoneIcon className="icon" />;
  } else if (status === 'Processing') {
    icon = <SyncIcon className="icon" />;
  } else if (status === 'basic') {
    icon = <AutoFixNormalOutlinedIcon className="icon" />;
  }

  let label
  if (status === 'rejected') {
    label = 'Không Thành Công';
  } else if (status === 'Open') {
    label = status;
  } else if (status === 'PartiallyFilled') {
    label = status;
  } else if (status === 'Filled') {
    label = status;
  } else if (status === 'processed') {
    label = 'Thành Công';
  } else if (status === 'Completed') {
    label = 'Đã Hoàn Tất';
  } else if (status === 'Processing') {
    label = 'Đang Xử Lý';
  } else if (status === 'basic') {
    label = 'Thông dụng';
  }

  if (status === 'PartiallyFilled') {
    label = 'Partially Filled';
  }

  return (
    <StyledChip
      className={status}
      icon={icon}
      size="small"
      label={label}
      variant="outlined"
    />
  );
};

function EditStatus(props) {
  const { id, value, field } = props;
  const rootProps = useGridRootProps();
  const apiRef = useGridApiContext();

  const handleChange = async (event) => {
    const isValid = await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value,
    });

    if (isValid && rootProps.editMode === GridEditModes.Cell) {
      apiRef.current.stopCellEditMode({ id, field, cellToFocusAfter: 'below' });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      apiRef.current.stopCellEditMode({ id, field, ignoreModifications: true });
    }
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      MenuProps={{
        onClose: handleClose,
      }}
      sx={{
        height: '100%',
        '& .MuiSelect-select': {
          display: 'flex',
          alignItems: 'center',
          pl: 1,
        },
      }}
      autoFocus
      fullWidth
      open
    >
      {STATUS_OPTIONS.map((option) => {
        let IconComponent = null;
        if (option === 'rejected') {
          IconComponent = ReportProblemIcon;
        } else if (option === 'Open') {
          IconComponent = InfoIcon;
        } else if (option === 'PartiallyFilled') {
          IconComponent = AutorenewIcon;
        } else if (option === 'Filled') {
          IconComponent = DoneIcon;
        } else if (option === 'processed') {
          IconComponent = ReportProblemIcon;
        }

        let label = option;
        if (option === 'PartiallyFilled') {
          label = 'Partially Filled';
        }

        return (
          <MenuItem key={option} value={option}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <IconComponent fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={label} sx={{ overflow: 'hidden' }} />
          </MenuItem>
        );
      })}
    </Select>
  );
}

export function renderStatus(params) {
  if (params.value == null) {
    return '';
  }

  return     <Status status={params.value} />;
}

export function renderEditStatus(params) {
  return <EditStatus {...params} />;
}
