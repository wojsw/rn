import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

// PDF 查看器组件类型定义
type PdfViewerProps = {
  uri: string; // PDF 文件的 URI
  onClose: () => void; // 关闭预览的回调函数
  fileName?: string; // 可选的文件名
};

/**
 * PDF 文件预览组件
 * 使用 WebView 来显示 PDF 文件，支持全屏预览
 */
export default function PdfViewer({ uri, onClose, fileName }: PdfViewerProps) {
  const { width, height } = Dimensions.get('window');

  /**
   * 处理 WebView 加载错误
   */
  const handleError = () => {
    Alert.alert(
      '预览错误',
      'PDF 文件无法预览，可能是文件格式不支持或文件损坏。',
      [{ text: '确定', onPress: onClose }]
    );
  };

  return (
    <View style={[styles.container, { width, height }]}>
      {/* 顶部工具栏 */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          activeOpacity={0.7}
        >
          <MaterialIcons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.fileName} numberOfLines={1}>
          {fileName || 'PDF 预览'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* PDF 预览区域 */}
      <View style={styles.webviewContainer}>
        <WebView
          source={{ 
            uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(uri)}` 
          }}
          style={styles.webview}
          onError={handleError}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <MaterialIcons name="picture-as-pdf" size={48} color="#666" />
              <Text style={styles.loadingText}>正在加载PDF...</Text>
            </View>
          )}
          // 启用缩放功能
          scalesPageToFit={true}
          allowsInlineMediaPlayback={true}
          // 安全性设置
          mixedContentMode="compatibility"
          thirdPartyCookiesEnabled={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#000',
    zIndex: 1000,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#25292e',
    paddingTop: 50, // 适应状态栏高度
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  fileName: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: 16,
  },
  placeholder: {
    width: 40, // 与关闭按钮宽度保持平衡
  },
  webviewContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
});
