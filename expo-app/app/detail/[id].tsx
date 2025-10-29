import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

/**
 * Detail 页面组件
 * 展示特定 ID 的详情信息
 */
export default function DetailScreen() {
  // 获取动态路由参数 id
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>详情页面</Text>
      <Text style={styles.idText}>ID: {id}</Text>
      {/* 在此处添加详情内容 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  idText: {
    fontSize: 18,
    color: '#666',
  },
});

