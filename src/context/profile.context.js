import React, { useState, createContext, useContext, useEffect } from 'react';
import { auth, database } from '../misc/firebase';
import firebase from 'firebase/app';

export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userRef;
    let userStatusRef;

    const authUnsub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        userStatusRef = database.ref(`/status/${authObj.uid}`);
        userRef = database.ref(`/profiles/${authObj.uid}`);

        userRef.on('value', s => {
          const { displayName, createdAtUNIX, avatar, avatarColors } = s.val();

          const profileData = {
            displayName,
            createdAtUNIX,
            avatar,
            avatarColors,
            name: authObj.name,
            uid: authObj.uid,
            email: authObj.email,
          };

          setProfile(profileData);
          setIsLoading(false);
        });

        database.ref('.info/connected').on('value', snapshot => {
          if (snapshot.val() === false) {
            return;
          }

          userStatusRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(() => {
              userStatusRef.set(isOnlineForDatabase);
            });
        });
      } else {
        if (userRef) {
          userRef.off();
        }
        if (userStatusRef) {
          userStatusRef.off();
        }

        database.ref('.info/connected').off();

        setProfile(null);
        setIsLoading(false);
      }
    });
    return () => {
      authUnsub();

      database.ref('.info/connected').off();
      if (userRef) {
        userRef.off();
      }

      if (userStatusRef) {
        userStatusRef.off();
      }
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
