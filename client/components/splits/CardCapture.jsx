/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { Button } from '../../styles/GlobalStyle';

const CardCapture = ({ advanceToConfirmSplit, advanceToRejectSplit }) => {
  return (
    <div>
      <h2>Card Capture Step</h2>
      <Button onClick={advanceToConfirmSplit}>To Confirm</Button>
      <Button onClick={advanceToRejectSplit}>To Reject</Button>
    </div>
  );
};

export default CardCapture;
