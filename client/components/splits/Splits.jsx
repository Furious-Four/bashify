/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  SplitPage,
  SplitTabs,
  SplitRow,
  SplitConfirm,
} from '../../styles/Splits';
import Checkout from '../utils/Checkout';
import { Button } from '../../styles/GlobalStyle';
import { useHistory, useLocation } from 'react-router-dom';
import { ProfileTabs, TabOption } from '../../styles/Profile';

const SplitsWrapper = ({ component: Component }) => {
  const [loading, setLoading] = useState(true);
  const [pageTab, setPageTab] = useState('incoming');
  const { search } = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      const params = new URLSearchParams(search);
      const currTab = params.get('tab');
      if (currTab) setPageTab(currTab);
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    const params = new URLSearchParams(search);
    params.set('tab', pageTab);
    history.push({ search: params.toString() });
  }, [pageTab]);

  return (
    <SplitPage>
      <h1>Your Splits</h1>
      <ProfileTabs total={2}>
        <TabOption
          onClick={() => setPageTab('incoming')}
          bold={pageTab === 'incoming'}
        >
          Received
        </TabOption>
        <TabOption
          onClick={() => setPageTab('outbound')}
          bold={pageTab === 'outbound'}
        >
          Sent
        </TabOption>
      </ProfileTabs>
      <Component pageTab={pageTab} />
    </SplitPage>
  );
};

const SentRequests = ({ reqConfig }) => {
  const [loading, setLoading] = useState(true);
  const [sentRequests, setSentRequests] = useState([]);

  useEffect(async () => {
    try {
      const { data: requests } = await axios.get(
        '/api/user/split/outbound',
        reqConfig
      );
      setSentRequests(requests);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [loading]);

  return (
    <>
      {sentRequests.map((request) => {
        const {
          id,
          status,
          quantity,
          price,
          drink: { name },
          owner: { fullName },
        } = request;
        let displayStatus;
        if (status === 'REQUESTED-INCOMING') displayStatus = 'Pending';
        else displayStatus = status[0] + status.slice(1).toLowerCase();
        return (
          <SplitRow key={id}>
            <div>{name}</div>
            <div>Status: {displayStatus}</div>
            <div>
              {quantity} x ${price} = ${quantity * price}
            </div>
            <div>Requested from {fullName}</div>
          </SplitRow>
        );
      })}
    </>
  );
};

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
      `/api/user/tab/current/split/${opt}-split`,
      { tabDrinkId },
      reqConfig
    );
  };

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
                <>
                  <div>To view split requests, you must open a tab</div>
                  <Button onClick={advanceToCardCapture}>Set up a Tab</Button>
                </>
              );
            }
            if (journeyStep === steps.CARD_CAPTURE) {
              return <Checkout />;
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
              return <div>You have no split requests</div>;
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
                  <Button>Yes, {opt}</Button>
                  <Button secondary onClick={backToLanding}>
                    No, go back
                  </Button>
                </div>
              </SplitRow>
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
                <>
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
                </>
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
