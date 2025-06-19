import { useState } from "react"

type EditFormData = Record<string, string>

export function useEditFormFactory() {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<EditFormData>({})
  const [editType, setEditType] = useState<"task" | "reminder" | null>(null)

  const startEdit = (
    id: number,
    formData: EditFormData,
    type: "task" | "reminder"
  ) => {
    setEditingId(id)
    setEditForm(formData)
    setEditType(type)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({})
    setEditType(null)
  }

  const saveEdit = async (
    dbRef: any,
    updateFn: (updated: any[]) => void,
    getFilteredFn: (all: any[], date: Date) => any[],
    date: Date
  ) => {
    if (!editingId || !editType) return

    const cleaned = Object.fromEntries(
      Object.entries(editForm).map(([k, v]) => [k, v.trim()])
    )

    await dbRef.update(editingId, cleaned)
    const all = await dbRef.toArray()
    updateFn(getFilteredFn(all, date))
    cancelEdit()
  }

  return {
    editingId,
    editForm,
    editType,
    setEditForm,
    startEdit,
    cancelEdit,
    saveEdit,
  }
}
