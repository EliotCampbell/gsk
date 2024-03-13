'use client'
import React, { FC, FormEvent, useState } from 'react'
import classes from './BecomeMaster.module.css'
import SubmitButton from '@/modules/UI/SubmitButton/SubmitButton'
import Link from 'next/link'
import { useAppDispatch } from '@/clientServices/redux/hooks'
import { createService } from '@/clientServices/redux/features/services/servicesSlice'
import Input from '@/modules/UI/Input/Input'
import TextArea from '@/modules/UI/TextArea/TextArea'
import { setError } from '@/clientServices/redux/features/notification/notificationSlice'

const BecomeMaster: FC = () => {
  type FormFieldsType = Record<
    'title' | 'body' | 'phone',
    { value: string; error: boolean }
  >

  const dispatch = useAppDispatch()

  const handleTitle = (title: string) => {
    setFormFields({ ...formFields, title: { value: title, error: false } })
  }

  const handleBody = (body: string) => {
    setFormFields({ ...formFields, body: { value: body, error: false } })
  }

  const handlePhone = (phone: string) => {
    if (/^\+[0-9]{1,11}$/.test(phone))
      setFormFields({ ...formFields, phone: { value: phone, error: false } })
  }

  const handleCreateService = (
    event: FormEvent<HTMLFormElement>,
    formFields: FormFieldsType
  ) => {
    try {
      event.preventDefault()
      if (!/^.{5,}$/.test(formFields.title.value)) {
        setFormFields({
          ...formFields,
          title: { ...formFields.title, error: true }
        })
        throw new Error('Длина названия менее 5 символов')
      }
      if (!/^.{50,}$/.test(formFields.body.value)) {
        setFormFields({
          ...formFields,
          body: { ...formFields.body, error: true }
        })
        throw new Error('Длина описания менее 50 символов')
      }
      if (!/^.{12}$/.test(formFields.phone.value)) {
        setFormFields({
          ...formFields,
          phone: { ...formFields.phone, error: true }
        })
        throw new Error('Длина номера телефона должна быть равна 12 символам')
      }
      dispatch(
        createService({
          title: formFields.title.value,
          body: formFields.body.value,
          phone: formFields.phone.value
        })
      )
      return
    } catch (error) {
      dispatch(setError((error as Error).message))
    }
  }

  const [formFields, setFormFields] = useState<FormFieldsType>({
    title: { value: '', error: false },
    body: { value: '', error: false },
    phone: { value: '+7', error: false }
  })

  return (
    <div className={classes.becomeMaster}>
      <p className={classes.title}>
        Опубликуйте объявление мастера, чтобы начать оказывать услуги
      </p>
      <form
        className={classes.form}
        onSubmit={(event) => handleCreateService(event, formFields)}
      >
        <Input
          label={'Название услуги:'}
          name={'title'}
          placeholder={'Изготовление клеток для зайцев...'}
          value={formFields.title.value}
          error={formFields.title.error}
          onChange={(event) => handleTitle(event.target.value)}
        />
        <TextArea
          label={'Описание:'}
          name={'body'}
          placeholder={
            'Изготавливаю отличные домики для зайцев! Все сделано с любовью, чтоб вашим кроликам было уютно. Клетки прочные, просторные, с удобными мисками для еды...'
          }
          value={formFields.body.value}
          onChange={(event) => handleBody(event.target.value)}
          counter={{ min: 50 }}
          error={formFields.body.error}
        ></TextArea>
        <Input
          label={'Teлефон'}
          name={'phone'}
          placeholder={'+7(999)333-44-55'}
          value={formFields.phone.value}
          error={formFields.phone.error}
          onChange={(event) => handlePhone(event.target.value)}
        />
        <SubmitButton type={'submit'}>{'Стать мастером'}</SubmitButton>
      </form>
      <p className={classes.hint}>
        {'Нажатие этой кнопки публикует ваш профиль в раздел '}
        <Link href={'/services'} className={classes.masters}>
          'Мастера'
        </Link>
        {', чтобы другие пользователи могли видеть ваше предложение услуг'}
      </p>
    </div>
  )
}

export default BecomeMaster
