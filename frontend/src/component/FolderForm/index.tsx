import { Button, Form, Input } from 'antd';
import { Folder } from 'api/metaApi';
import styles from './FolderForm.module.scss';

export type FolderFormData = Omit<Folder, 'folderId' | 'parentId'>;

export interface FolderFormProps {
  folderData: FolderFormData;
  buttonName: string;
  onFinish: (data: FolderFormData) => Promise<void>;
  onFinishFailed: (data: any) => Promise<void>;
}

export const FolderForm = ({
  folderData: { name },
  buttonName,
  onFinish,
  onFinishFailed,
}: FolderFormProps) => {
  return (
    <Form<FolderFormData>
      name="folder"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ name }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles.form}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input folder name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {buttonName}
        </Button>
      </Form.Item>
    </Form>
  );
};
