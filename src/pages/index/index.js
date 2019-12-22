import * as React from 'react';
import { View, Text, Image } from 'remax/wechat';
import styles from './index.module.css';

export default () => {
  return (
    <View className={styles.app}>
      <View className={styles.header}>
        <View className={styles.text}>
          <Text className={styles.path}>111</Text>
        </View>
      </View>
    </View>
  );
};
