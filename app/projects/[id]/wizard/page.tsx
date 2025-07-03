'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Card } from '@heroui/card'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'
import { Alert, FormAlert } from '@heroui/alert'
import { toast } from '@heroui/toast'

const schema = z.object({
  title: z.string().min(3, 'Mínimo 3 caracteres'),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'Solo minúsculas, números y guiones'),
  template: z.enum(['one-page', 'blog']),
})

type FormData = z.infer<typeof schema>

interface WizardPageProps {
  params: { id: string }
}

export default function WizardPage({ params }: WizardPageProps) {
  const router = useRouter()
  const [apiError, setApiError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', slug: '', template: 'one-page' },
  })
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: FormData) => {
    setApiError('')
    // Verifica unicidad del slug
    try {
      const check = await fetch(`/api/sites?slug=${data.slug}`)
      const checkJson = await check.json()
      if (checkJson.exists) {
        setError('slug', { type: 'manual', message: 'Slug ya existe' })
        return
      }
    } catch {
      setError('slug', { type: 'manual', message: 'No se pudo verificar el slug' })
      return
    }

    setLoading(true)
    const res = await fetch(`/api/projects/${params.id}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const json = await res.json()
    setLoading(false)
    if (!res.ok) {
      setApiError(json.error || 'Error al generar el sitio')
      return
    }

    toast.success('Sitio generado')
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'wizard_completed' }),
    }).catch(() => {})
    router.push(`/projects/${params.id}/preview`)
  }

  return (
    <div className="max-w-lg mx-auto py-12">
      <Card className="p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Crear sitio</h1>
        {apiError && <Alert color="danger">{apiError}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input label="Título" {...register('title')} />
          {errors.title && <FormAlert color="danger">{errors.title.message}</FormAlert>}
          <Input label="Slug" {...register('slug')} />
          {errors.slug && <FormAlert color="danger">{errors.slug.message}</FormAlert>}
          <div>
            <label className="mb-1 font-medium text-sm" htmlFor="template">
              Plantilla
            </label>
            <select id="template" {...register('template')} className="w-full p-2 rounded-md border">
              <option value="one-page">One Page</option>
              <option value="blog">Blog</option>
            </select>
            {errors.template && (
              <FormAlert color="danger">{errors.template.message}</FormAlert>
            )}
          </div>
          <Button type="submit" isLoading={loading} className="w-full">
            Generar sitio
          </Button>
        </form>
      </Card>
    </div>
  )
}
