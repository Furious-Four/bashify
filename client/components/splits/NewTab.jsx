/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { Button } from '../../styles/GlobalStyle';

const NewTab = ({
  advanceToCardCapture,
  advanceToConfirmSplit,
  advanceToRejectSplit,
}) => {
  return (
    <div>
      <h2>New Tab Step</h2>
      <Button onClick={advanceToCardCapture}>To Card Capture</Button>
      <Button onClick={advanceToConfirmSplit}>To Confirm</Button>
      <Button onClick={advanceToRejectSplit}>To Reject</Button>
    </div>
  );
};

export default NewTab;
