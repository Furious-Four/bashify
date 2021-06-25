import React, { useEffect, useState } from 'react';
import axios from 'axios';

import SplitsWrapper from './SplitsWrapper';
import SentRequests from './SentRequests';
import { SplitRow, SplitConfirm, SplitTab } from '../../styles/Splits';
import Checkout from '../utils/Checkout';
import { Button } from '../../styles/GlobalStyle';

const Splits = () => {
  const steps = {
    LANDING: 'LANDING',
    NEW_TAB: 'NEW_TAB',
    CARD_CAPTURE: 'CARD_CAPTURE',
    ACCEPT_SPLIT: 'ACCEPT_SPLIT',
    REJECT_SPLIT: 'REJECT_SPLIT',
  };

  const [loading, setLoading] = useState(true);
  const [reqConfig, setReqConfig] = useState(null);
  const [journeyStep, setJourneyStep] = useState(steps.LANDING);
  const [userTab, setUserTab] = useState(null);
  const [requestList, setRequestList] = useState([]);
  const [requestCurrent, setRequestCurrent] = useState(null);

  const advanceToCardCapture = () => setJourneyStep(steps.CARD_CAPTURE);
  const advanceToConfirmSplit = () => setJourneyStep(steps.ACCEPT_SPLIT);
  const advanceToRejectSplit = () => setJourneyStep(steps.REJECT_SPLIT);
  const backToLanding = () => setJourneyStep(steps.LANDING);

  const requestControl = async (opt, tabDrinkId) => {
    await axios.put(
      `/api/user/tab/current/${opt}-split`,
      { tabDrinkId },
      reqConfig
    );
    setLoading(true);
    backToLanding();
  };

  useEffect(() => console.log(requestCurrent), [requestCurrent]);

  useEffect(async () => {
    if (loading) {
      try {
        if (!reqConfig) {
          const token = window.localStorage.getItem('token');
          setReqConfig({
            headers: { authorization: token },
          });
        } else {
          const { data: tab } = await axios.get(
            '/api/user/tab/current',
            reqConfig
          );
          setUserTab(tab);
          const { data: requests } = await axios.get(
            '/api/user/split/incoming',
            reqConfig
          );
          setRequestList(requests);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [loading, reqConfig]);

  if (loading) {
    return (
      <SplitsWrapper
        component={({ pageTab }) => {
          const type = pageTab === 'incoming' ? 'received' : 'sent';
          return <div>loading your {type} splits . . . </div>;
        }}
      />
    );
  }
  if (!userTab) {
    return (
      <SplitsWrapper
        component={({ pageTab }) => {
          if (pageTab === 'incoming') {
            if (journeyStep === steps.LANDING) {
              return (
                <SplitTab>
                  <div>To view split requests, you must open a tab</div>
                  <Button onClick={advanceToCardCapture}>Set up a Tab</Button>
                </SplitTab>
              );
            }
            if (journeyStep === steps.CARD_CAPTURE) {
              return (
                <SplitTab>
                  <Checkout />;
                </SplitTab>
              );
            }
          } else {
            return <SentRequests reqConfig={reqConfig} />;
          }
        }}
      />
    );
  } else {
    if (requestList.length === 0) {
      return (
        <SplitsWrapper
          component={({ pageTab }) => {
            if (pageTab === 'incoming') {
              return <SplitTab>You have no split requests</SplitTab>;
            } else {
              return <SentRequests reqConfig={reqConfig} />;
            }
          }}
        />
      );
    }
    if (
      journeyStep === steps.ACCEPT_SPLIT ||
      journeyStep === steps.REJECT_SPLIT
    ) {
      const opt = journeyStep.split('_')[0].toLowerCase();
      return (
        <SplitsWrapper
          component={() => {
            const {
              price,
              quantity,
              drink: { name },
              requestedBy: { fullName },
            } = requestCurrent;
            return (
              <SplitTab>
                <SplitRow>
                  <div>{name}</div>
                  <div>
                    {quantity} x ${price} = ${quantity * price}
                  </div>
                  <div>requested by {fullName}</div>
                  <SplitConfirm>
                    Are you sure you want to {opt} this request? This action
                    cannot be undone.
                  </SplitConfirm>
                  <div>
                    <Button
                      onClick={() => requestControl(opt, requestCurrent.id)}
                    >
                      Yes, {opt}
                    </Button>
                    <Button secondary onClick={backToLanding}>
                      No, go back
                    </Button>
                  </div>
                </SplitRow>
              </SplitTab>
            );
          }}
        />
      );
    }
    if (journeyStep === steps.LANDING) {
      return (
        <SplitsWrapper
          component={({ pageTab }) => {
            if (pageTab === 'incoming') {
              return (
                <SplitTab>
                  {requestList.map((request) => {
                    const {
                      id,
                      price,
                      quantity,
                      drink: { name },
                      requestedBy: { fullName },
                    } = request;
                    return (
                      <SplitRow key={id}>
                        <div>{name}</div>
                        <div>
                          {quantity} x ${price} = ${quantity * price}
                        </div>
                        <div>requested by {fullName}</div>
                        <div>
                          <Button
                            onClick={() => {
                              advanceToConfirmSplit();
                              setRequestCurrent(request);
                            }}
                          >
                            Accept
                          </Button>
                          <Button
                            onClick={() => {
                              advanceToRejectSplit();
                              setRequestCurrent(request);
                            }}
                          >
                            Reject
                          </Button>
                        </div>
                      </SplitRow>
                    );
                  })}
                </SplitTab>
              );
            } else {
              return <SentRequests reqConfig={reqConfig} />;
            }
          }}
        />
      );
    }
  }
};

export default Splits;
