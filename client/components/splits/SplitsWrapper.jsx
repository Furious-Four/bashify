/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { SplitPage } from '../../styles/Splits';
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

export default SplitsWrapper;
