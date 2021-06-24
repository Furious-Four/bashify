/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import Landing from './Landing';
import NewTab from './NewTab';
import CardCapture from './CardCapture';
import ConfirmSplit from './ConfirmSplit';
import RejectSplit from './RejectSplit';

const Splits = () => {
  const [LANDING, NEW_TAB, CARD_CAPTURE, CONFIRM_SPLIT, REJECT_SPLIT] = [
    'LANDING',
    'NEW_TAB',
    'CARD_CAPTURE',
    'CONFIRM_SPLIT',
    'REJECT_SPLIT',
  ];
  const [loading, setLoading] = useState(true);
  const [journeyStep, setJourneyStep] = useState(LANDING);

  const advanceToNewTab = () => setJourneyStep(NEW_TAB);
  const advanceToCardCapture = () => setJourneyStep(CARD_CAPTURE);
  const advanceToConfirmSplit = () => setJourneyStep(CONFIRM_SPLIT);
  const advanceToRejectSplit = () => setJourneyStep(REJECT_SPLIT);
  const backToLanding = () => setJourneyStep(LANDING);

  useEffect(async () => {
    if (loading) setLoading(false);
  }, [loading]);

  if (loading) return 'Loading Page';
  switch (journeyStep) {
    case LANDING:
      return (
        <Landing
          advanceToNewTab={advanceToNewTab}
          advanceToConfirmSplit={advanceToConfirmSplit}
          advanceToRejectSplit={advanceToRejectSplit}
        />
      );
    case NEW_TAB:
      return (
        <NewTab
          advanceToCardCapture={advanceToCardCapture}
          advanceToConfirmSplit={advanceToConfirmSplit}
          advanceToRejectSplit={advanceToRejectSplit}
        />
      );
    case CARD_CAPTURE:
      return (
        <CardCapture
          advanceToConfirmSplit={advanceToConfirmSplit}
          advanceToRejectSplit={advanceToRejectSplit}
        />
      );
    case CONFIRM_SPLIT:
      return <ConfirmSplit backToLanding={backToLanding} />;
    case REJECT_SPLIT:
      return <RejectSplit backToLanding={backToLanding} />;
  }
};

export default Splits;
