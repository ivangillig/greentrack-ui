import { getSeeds } from '@/src/features/seed/seedActions'
import { Modal, Form, Input, DatePicker, Select } from 'antd'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'

const { Option } = Select

const BatchModal = ({ visible, onCancel, onAddBatch, onEditBatch, batch }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const seeds = useSelector((state) => state.seed.seeds || [])

  useEffect(() => {
    if (seeds.length === 0) {
      dispatch(getSeeds())
    }
  }, [dispatch, seeds])

  useEffect(() => {
    if (batch) {
      const selectedSeed = seeds.find((seed) => seed._id === batch.seedId._id)
      form.setFieldsValue({
        ...batch,
        production_date: dayjs(batch.production_date),
        seedId: selectedSeed ? selectedSeed._id : undefined,
      })
    } else {
      form.resetFields()
    }
  }, [batch, form, seeds])

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (batch) {
        onEditBatch({ ...values, id: batch._id })
      } else {
        onAddBatch(values)
      }
      form.resetFields()
    })
  }

  return (
    <Modal
      title={batch ? 'Edit Batch' : 'Add Batch'}
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="production_date"
          label="Production Date"
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="seedId" label="Genetic" rules={[{ required: true }]}>
          <Select>
            {seeds.map((seed) => (
              <Option key={seed._id} value={seed._id}>
                {`${seed.seedBank} - ${seed.genetic}`}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="thc" label="THC (%)" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="cbd" label="CBD (%)" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="drying_time"
          label="Drying Time"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="quantity_produced"
          label="Quantity Produced (g)"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item name="rav" label="RAV" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default BatchModal
