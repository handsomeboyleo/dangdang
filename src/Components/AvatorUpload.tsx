// 自定义上传按钮
import React, { FC, useState } from 'react';
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader';
import { ImageUploader } from 'antd-mobile';
import { PictureOutline } from 'antd-mobile-icons';
import { uploadAvatar } from '../Api/upload';

interface CustomUploadButtonProps {
    onImg: React.Dispatch<React.SetStateAction<string>>
}

const CustomUploadButton: FC<CustomUploadButtonProps> = ({ onImg }) => {
  const [fileList, setFileList] = useState<ImageUploadItem[]>([]);
  const mockUpload = async (file: File) => new Promise<ImageUploadItem>((resolve, reject) => {
    console.log(file);
    try {
      const params = new FormData();
      params.append('file', file, file.name);
      params.append('chunk', '0');
      uploadAvatar(params).then((res) => {
        // @ts-ignore
        onImg(res.data.url);
        resolve(res.data as ImageUploadItem);
      });
    } catch (e) {
      reject(e);
    }
  });
  return (
    <ImageUploader
      style={{
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#999999',
        alignSelf: 'center',
      }}
      value={fileList}
      onChange={setFileList}
      upload={mockUpload}
      maxCount={1}
      preview={false}
      deletable={false}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: '#f5f5f5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#999999',
        }}
      >
        <PictureOutline style={{ fontSize: 32 }} />
      </div>
    </ImageUploader>
  );
};
export default CustomUploadButton;
