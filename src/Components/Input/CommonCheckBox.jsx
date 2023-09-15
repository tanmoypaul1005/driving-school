import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const CommonCheckBox = ({ value, checked, onChange,paddingLeft="8px",paddingRight="8px" }) => {
  return (
    <FormControlLabel
      label=""
      control={
        <Checkbox
          sx={{
            color: "#7A7A7A",
            '&.Mui-checked': {
              color: "#2257AA"
            },
            width: '0px',
            height: '20px',
            paddingLeft:{paddingLeft},
            paddingRight:{paddingRight}
          }}
          value={value}
          checked={checked}
          onChange={onChange}
        />}
    />
  );
};

export default CommonCheckBox;