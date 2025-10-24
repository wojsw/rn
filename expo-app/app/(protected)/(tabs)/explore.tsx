import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { StyleSheet, FlatList, Pressable } from 'react-native';
import { useState } from 'react';

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
    }
  ]);

  // 渲染列表项的组件
  const renderListItem = ({ item }: { item: ListItem }) => (
    <Pressable style={styles.listItem} onPress={() => router.push(`/explore/${item.id}`)}>
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
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Explore
        </ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
      <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <ThemedView style={styles.listContainer}>
        <ThemedText type="subtitle" style={styles.listTitle}>
          学习列表
        </ThemedText>
        <FlatList
          data={listData}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id} // 使用id作为唯一key
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
        />
      </ThemedView>
    </ParallaxScrollView>
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
  // FlatList 样式
  flatList: {
    maxHeight: 400, // 限制列表高度，避免与 ParallaxScrollView 冲突
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
