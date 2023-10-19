"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Modal, Progress, Upload, message } from "antd";
import { RcFile, UploadFile } from "antd/es/upload";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

type ImageUploadProps = {
  name: string;
  defaultImage?: string;
};

const UploadImage = ({ name, defaultImage }: ImageUploadProps) => {
  const [progress, setProgress] = useState<number>(0);
  const [defaultFileList, setDefaultFileList] = useState<UploadFile[]>(
    defaultImage
      ? [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: defaultImage,
          },
        ]
      : []
  );

  const { setValue } = useFormContext();

  const uploadImage = async ({ onSuccess, onError, file, onProgress }: any) => {
    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event: any) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };

    fmData.append("image", file);

    try {
      const res: AxiosResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=64f67bdf230832be947d8c18566f658b`,
        fmData,
        config
      );

      onSuccess("Ok");

      setValue(name, res?.data?.data?.url);
    } catch (err) {
      message.error("Upload Failed");
      onError(err);
    }
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleOnChange = ({ file, fileList, event }: any) => {
    setDefaultFileList(fileList);
  };
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const handleCancel = () => setPreviewOpen(false);
  return (
    <>
      <div className="container">
        <Upload
          accept="image/*"
          customRequest={uploadImage}
          onChange={handleOnChange}
          listType="picture-card"
          defaultFileList={defaultFileList}
          onPreview={handlePreview}
        >
          {defaultFileList.length >= 1 ? null : (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
        {progress > 0 ? <Progress percent={progress} /> : null}
      </div>
      <Modal open={previewOpen} footer={null} onCancel={handleCancel} centered>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadImage;
