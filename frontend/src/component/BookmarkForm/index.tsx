import { Button, Form, Input } from 'antd';
import { Bookmark } from 'api/metaApi';
import styles from './BookmarkForm.module.scss';

export type BookmarkFormData = Omit<Bookmark, 'bookmarkId' | 'parentId'>;

export interface BookmarkFormProps {
  bookmarkData: BookmarkFormData;
  buttonName: string;
  onFinish: (data: BookmarkFormData) => Promise<void>;
  onFinishFailed: (data: any) => Promise<void>;
}

export const BookmarkForm = ({
  bookmarkData: { name, url, info = '', ...bookmarkData },
  buttonName,
  onFinish,
  onFinishFailed,
}: BookmarkFormProps) => {
  return (
    <Form<BookmarkFormData>
      name="folder"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ name, url, info }}
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
      <Form.Item
        label="URL"
        name="url"
        rules={[{ required: true, type: 'url', message: 'Please input url!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Info"
        name="info"
        rules={[{ message: 'Please input info!' }]}
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
