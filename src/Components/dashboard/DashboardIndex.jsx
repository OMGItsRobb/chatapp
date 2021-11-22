import React from 'react';
import { Button, Divider, Drawer } from 'rsuite';
import { ImExit } from 'react-icons/im';
import { useProfile } from '../../context/profile.context';
import EditInput from './EditInput';
import { database } from '../../misc/firebase';
import ProviderBlock from './ProviderBlock';
import AvatarUploadBtn from './AvatarUploadBtn';
import { getUserUpdates } from '../../misc/helpers';
import { useMediaQuery } from '../../misc/CustomHooks';

const DashboardIndex = ({ onSignOut }) => {
  const { profile } = useProfile();
  const isMobile = useMediaQuery('(max-width: 992px)');

  const onSave = async newData => {
    try {
      const updates = await getUserUpdates(
        profile.uid,
        'displayName',
        newData,
        database
      );

      await database.ref().update(updates);
    } catch (error) {
      alert('hmm...something went wrong');
      console.log(error);
    }
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard Ops</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body style={{ padding: isMobile && '10px', margin: '10px' }}>
        <h3>Hey, {profile.displayName}</h3>
        <ProviderBlock />
        <Divider />
        <EditInput
          titleName="Your Display Name"
          displayName="nickname"
          initialValue={profile.displayName}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />
        <AvatarUploadBtn />
        <Divider />

        <Button
          block
          color="red"
          appearance="primary"
          size="lg"
          onClick={onSignOut}
        >
          <span>
            <ImExit
              style={{
                fontSize: 20,
                verticalAlign: 'bottom',
              }}
            />
          </span>
          <span style={{ fontWeight: '500' }}> Sign-Out</span>
        </Button>
      </Drawer.Body>
    </>
  );
};

export default DashboardIndex;
