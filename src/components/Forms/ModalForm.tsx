import { Modal } from "antd";
import { Dispatch, ReactNode, SetStateAction } from "react";

type ModalFormProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  title: string;
  isLoading: boolean;
  width?: number;
};

const ModalForm = ({
  open,
  setOpen,
  children,
  title,
  isLoading,
  width,
}: ModalFormProps) => {
  return (
    <Modal
      title={`Edit ${title}`}
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={width ?? 1000}
      confirmLoading={isLoading}
      okText={`Update ${title}`}
      footer={null}
    >
      {children}
    </Modal>
  );
};

export default ModalForm;
