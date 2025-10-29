import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { StyleSheet, FlatList, Pressable } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
// 定义列表项数据类型接口
interface ListItem {
  id: string; // 唯一标识符
  title: string; // 标题
  description: string; // 描述
  category: string; // 分类
}

export default function TabTwoScreen() {
  // 示例数据数组，每个项目都包含唯一的id字段
  const [listData] = useState<ListItem[]>([
    {
      id: '1',
      title: 'React Native 开发',
      description: '学习使用 React Native 构建跨平台移动应用',
      category: '技术'
    },
    {
      id: '2', 
      title: 'Expo 框架',
      description: '使用 Expo 快速开发 React Native 应用',
      category: '框架'
    },
    {
      id: '3',
      title: 'TypeScript 类型系统',
      description: '在 React Native 项目中使用 TypeScript 提高代码质量',
      category: '语言'
    },
    {
      id: '4',
      title: '移动端 UI 设计',
      description: '设计美观且用户友好的移动应用界面',
      category: '设计'
    },
    {
      id: '5',
      title: '状态管理',
      description: '使用 Context API 或 Redux 管理应用状态',
      category: '架构'
    },
    {
      id: '6',
      title: '数据存储',
      description: '使用 SQLite 或 Realm 存储应用数据',
      category: '数据库'
    },
    {
      id: '7',
      title: '网络请求',
      description: '使用 fetch 或 axios 进行网络请求',
      category: '网络'
    },
    {
      id: '8',
      title: '动画效果',
      description: '使用 React Native 动画 API 实现动画效果',
      category: '动画'
    },
  ]);

  // 渲染列表项的组件
  const renderListItem = ({ item }: { item: ListItem }) => (
    <Pressable style={styles.listItem} onPress={() => router.push({pathname: '/detail/[id]', params: {id: item.id, title: item.title}})}>
      <ThemedView style={styles.itemContainer}>
        <ThemedText type="subtitle" style={styles.itemTitle}>
          {item.title}
        </ThemedText>
        <ThemedText style={styles.itemDescription}>
          {item.description}
        </ThemedText>
        <ThemedView style={styles.categoryContainer}>
          <ThemedText style={styles.categoryText}>
            {item.category}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );

  return (
    
    <ThemedView style={styles.listContainer}>

      <ThemedText type="subtitle" style={styles.listTitle}>
        学习列表
      </ThemedText>
      <FlatList
        data={listData}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id} // 使用id作为唯一key
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>

  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  // 列表容器样式
  listContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  // 列表标题样式
  listTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  // 列表项样式
  listItem: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)', // 浅色背景
    overflow: 'hidden',
  },
  // 列表项容器样式
  itemContainer: {
    padding: 16,
  },
  // 列表项标题样式
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  // 列表项描述样式
  itemDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    opacity: 0.8,
  },
  // 分类容器样式
  categoryContainer: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  // 分类文本样式
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#007AFF',
  },
});
