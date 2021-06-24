/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { Button } from '../../styles/GlobalStyle';

const ConfirmSplit = ({ backToLanding }) => {
  return (
    <div>
      <h2>Confirm Split Step</h2>
      <Button onClick={backToLanding}>Back to Landing</Button>
    </div>
  );
};

export default ConfirmSplit;
