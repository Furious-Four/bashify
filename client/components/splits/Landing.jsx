/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { Button } from '../../styles/GlobalStyle';

const Landing = ({
  advanceToNewTab,
  advanceToConfirmSplit,
  advanceToRejectSplit,
}) => {
  return (
    <div>
      <h2>Landing Step</h2>
      <Button onClick={advanceToNewTab}>To New Tab</Button>
      <Button onClick={advanceToConfirmSplit}>To Confirm</Button>
      <Button onClick={advanceToRejectSplit}>To Reject</Button>
    </div>
  );
};

export default Landing;
