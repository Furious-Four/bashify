/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { Button } from '../../styles/GlobalStyle';

const RejectSplit = ({ backToLanding }) => {
  return (
    <div>
      <h2>Reject Split Step</h2>
      <Button onClick={backToLanding}>Back to Landing</Button>
    </div>
  );
};

export default RejectSplit;
