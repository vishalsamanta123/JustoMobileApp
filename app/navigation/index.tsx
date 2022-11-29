import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Route from './route';
import Loader from 'app/components/CommonScreen/Loader';
import useLoader from 'app/components/useLoader';

const Root = () => {
  const [loading] = useLoader();
  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      {loading && <Loader
      />}
      <Route />
    </View>
  );
};

export default Root;
