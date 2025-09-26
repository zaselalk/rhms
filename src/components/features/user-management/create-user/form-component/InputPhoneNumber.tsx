import { Form, Input } from "antd";

export const InputPhoneNumber = () => {
  return (
    <Form.Item
      label="Phone Number"
      name="phone_number"
      rules={[{ required: true, message: "Please enter email" }]}
    >
      <Input placeholder="Enter Phone Number" type="number" />
    </Form.Item>
  );
};
