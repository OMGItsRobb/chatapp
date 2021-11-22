import React, { useState } from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { FaFacebookSquare, FaGoogle } from 'react-icons/fa';
import Button from 'rsuite/Button';
import Tag from 'rsuite/Tag';
import firebase from 'firebase/app';
import { auth } from '../../misc/firebase';

function ProviderBlock() {
  const [isConnected, setIsConnected] = useState({
    'google.com': auth.currentUser.providerData.some(
      data => data.providerId === 'google.com'
    ),
    'facebook.com': auth.currentUser.providerData.some(
      data => data.providerId === 'facebook.com'
    ),
  });

  const updateIsConnected = (providerId, value) => {
    setIsConnected(p => {
      return {
        ...p,
        [providerId]: value,
      };
    });
  };

  const unlink = async providerId => {
    try {
      if (auth.currentUser.providerData.length === 1) {
        throw new Error(`You cannot disconnect from ${providerId}`);
      }
      await auth.currentUser.unlink(providerId);

      updateIsConnected(providerId, false);
      alert(`Disconnected from ${providerId}`);
    } catch (error) {
      alert(error);
    }
  };

  const unlinkFacebook = () => {
    unlink('facebook.com');
  };
  const unlinkGoogle = () => {
    unlink('google.com');
  };

  const link = async provider => {
    try {
      await auth.currentUser.linkWithPopup(provider);
      alert(`Linked to ${provider.providerId}`);

      updateIsConnected(provider.providerId, true);
    } catch (error) {
      alert('error');
    }
  };

  const linkFacebook = () => {
    link(new firebase.auth.FacebookAuthProvider());
  };
  const linkGoogle = () => {
    link(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <div>
      <div>
        {isConnected['facebook.com'] && (
          <Tag
            color="blue"
            closable
            onClose={unlinkFacebook}
            title="Connected to Facebook!"
          >
            <FaFacebookSquare style={{ verticalAlign: '-1px' }} />
            <span> Connected</span>
          </Tag>
        )}
        {isConnected['google.com'] && (
          <Tag
            color="green"
            closable
            onClose={unlinkGoogle}
            title="Connected to Google!"
          >
            <FaGoogle style={{ verticalAlign: '-1px' }} />{' '}
            <span> Connected</span>
          </Tag>
        )}
      </div>
      <div className="mt-2">
        {!isConnected['facebook.com'] && (
          <Button
            block
            color="blue"
            appearance="primary"
            onClick={linkFacebook}
          >
            <FaFacebookSquare
              style={{ verticalAlign: 'middle', fontSize: 22 }}
            />
            <span> Link to Facebook</span>
          </Button>
        )}
        {!isConnected['google.com'] && (
          <Button block color="green" appearance="primary" onClick={linkGoogle}>
            <AiFillGoogleCircle
              style={{ verticalAlign: 'middle', fontSize: 22 }}
            />
            <span> Link to Google</span>
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProviderBlock;
