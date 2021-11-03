import React from 'react';
import firebase from 'firebase/app';
import { Container, Row, Grid, Col, Panel, Button } from 'rsuite';
import { FaGoogle, FaFacebookSquare } from 'react-icons/fa';
import { auth, database } from '../misc/firebase';

function SignIn() {
  const signInWithProvider = async provider => {
    try {
      const result = await auth.signInWithPopup(provider);
      console.log(result);

      if (result.additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${result.user.uid}`).set({
          name: result.user.displayName,
          email: result.additionalUserInfo.profile.email,
          verifiedEmail: result.additionalUserInfo.profile.verified_email,
          id: result.additionalUserInfo.profile.id,
          providerType: result.additionalUserInfo.providerId,
          createdAtUNIX: firebase.database.ServerValue.TIMESTAMP,
          createdAt: `${new Date().toLocaleString('en-US', {
            timeZone: 'UTC',
          })} (UTC)`,
          displayName: result.user.displayName,
        });
      }
      console.log('Success!');
    } catch (error) {
      console.log(error);
    }
  };

  const onFacebookSignin = () => {
    signInWithProvider(new firebase.auth.FacebookAuthProvider());
  };

  const onGoogleSignin = () => {
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to Chat!</h2>
                <p>Sick-awesome chat platform for idiots</p>
              </div>
              <div className="mt-3">
                <Button
                  color="blue"
                  block
                  appearance="primary"
                  onClick={onFacebookSignin}
                >
                  <FaFacebookSquare />
                  <p> </p>
                  Facebook Sign-in
                </Button>
                <Button
                  color="green"
                  block
                  appearance="primary"
                  onClick={onGoogleSignin}
                >
                  <FaGoogle />
                  <p></p>
                  Google Sign-in
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
}

export default SignIn;
