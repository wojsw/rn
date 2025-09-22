import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PdfViewer from '../../components/PdfViewer';

// PDF 文档信息类型定义
type PdfDocument = {
  uri: string;
  name: string;
  size: number;
  mimeType: string;
};

export default function About() {
  // PDF 文档状态管理
  const [document, setDocument] = useState<PdfDocument | null>(null);
  // 预览显示状态
  const [showPreview, setShowPreview] = useState(false);
  // 上传加载状态
  const [isUploading, setIsUploading] = useState(false);

  /**
   * 处理 PDF 文件上传
   * 选择 PDF 文件并保存到状态中
   */
  const handlePress = async () => {
    console.log("开始选择PDF文件");
    setIsUploading(true);
    
    try {
      // 使用 DocumentPicker 选择 PDF 文件
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // 限制只能选择 PDF 文件
        copyToCacheDirectory: true, // 复制到缓存目录以提高访问速度
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedFile = result.assets[0];
        
        // 文件大小检查（限制为 50MB）
        const maxSizeInBytes = 50 * 1024 * 1024; // 50MB
        if (selectedFile.size && selectedFile.size > maxSizeInBytes) {
          Alert.alert(
            '文件过大',
            '请选择小于 50MB 的PDF文件',
            [{ text: '确定', style: 'default' }]
          );
          return;
        }

        // 保存文档信息
        const pdfDoc: PdfDocument = {
          uri: selectedFile.uri,
          name: selectedFile.name,
          size: selectedFile.size || 0,
          mimeType: selectedFile.mimeType || 'application/pdf',
        };
        
        setDocument(pdfDoc);
        console.log('PDF文件选择成功:', pdfDoc);
        
        // 显示成功提示
        Alert.alert(
          '文件上传成功',
          `已选择文件: ${selectedFile.name}`,
          [
            { text: '预览', onPress: () => setShowPreview(true), style: 'default' },
            { text: '确定', style: 'cancel' }
          ]
        );
      }
    } catch (error) {
      console.error('选择PDF文件失败:', error);
      Alert.alert(
        '文件选择失败',
        '无法选择PDF文件，请重试',
        [{ text: '确定', style: 'default' }]
      );
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * 格式化文件大小显示
   * @param bytes 文件大小（字节）
   * @returns 格式化后的文件大小字符串
   */
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  /**
   * 删除已选择的PDF文件
   */
  const handleDeleteDocument = () => {
    Alert.alert(
      '删除文件',
      '确定要删除这个PDF文件吗？',
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '删除', 
          style: 'destructive',
          onPress: () => {
            setDocument(null);
            setShowPreview(false);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 标题区域 */}
        <View style={styles.titleSection}>
          <MaterialIcons name="picture-as-pdf" size={48} color="#ff6b6b" />
          <Text style={styles.title}>PDF 文档管理</Text>
          <Text style={styles.subtitle}>选择并预览您的PDF文档</Text>
        </View>

        {/* 上传按钮 */}
        <TouchableOpacity 
          style={[styles.uploadButton, isUploading && styles.uploadButtonDisabled]}
          onPress={handlePress}
          disabled={isUploading}
          activeOpacity={0.7}
        >
          <MaterialIcons 
            name={isUploading ? "hourglass-empty" : "cloud-upload"} 
            size={24} 
            color="#fff" 
          />
          <Text style={styles.uploadButtonText}>
            {isUploading ? '正在选择文件...' : '选择PDF文件'}
          </Text>
        </TouchableOpacity>

        {/* 已选择文档显示区域 */}
        {document && (
          <View style={styles.documentCard}>
            <View style={styles.documentHeader}>
              <MaterialIcons name="description" size={24} color="#ff6b6b" />
              <Text style={styles.documentTitle}>已选择的文档</Text>
            </View>
            
            <View style={styles.documentInfo}>
              <Text style={styles.documentName}>{document.name}</Text>
              <Text style={styles.documentSize}>{formatFileSize(document.size)}</Text>
            </View>

            <View style={styles.documentActions}>
              <TouchableOpacity
                style={styles.previewButton}
                onPress={() => setShowPreview(true)}
                activeOpacity={0.7}
              >
                <MaterialIcons name="visibility" size={20} color="#007AFF" />
                <Text style={styles.previewButtonText}>预览</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDeleteDocument}
                activeOpacity={0.7}
              >
                <MaterialIcons name="delete" size={20} color="#ff6b6b" />
                <Text style={styles.deleteButtonText}>删除</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* PDF 预览模态窗口 */}
      {showPreview && document && (
        <PdfViewer
          uri={document.uri}
          fileName={document.name}
          onClose={() => setShowPreview(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  uploadButtonDisabled: {
    backgroundColor: '#95a5a6',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  documentCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  documentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginLeft: 12,
  },
  documentInfo: {
    marginBottom: 20,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#34495e',
    marginBottom: 8,
    lineHeight: 22,
  },
  documentSize: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  documentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 0.48,
    justifyContent: 'center',
  },
  previewButtonText: {
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 0.48,
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#ff6b6b',
    fontWeight: '600',
    marginLeft: 8,
  },
});