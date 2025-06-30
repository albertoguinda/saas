// pages/dashboard/projects.tsx
import { useState, useEffect, useRef } from "react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { Input } from "@heroui/input";
import { Alert } from "@heroui/alert";
import { Plus, Lock, Eye, Trash, Pencil } from "lucide-react";
import { useRouter } from "next/router";

// Límite de proyectos para el plan FREE
const FREE_PROJECT_LIMIT = 1;

export default function ProjectsPage() {
  const router = useRouter();

  // Estados principales del componente
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const createInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  // --- Edición inline ---
  const [editing, setEditing] = useState<{ id: string; title: string } | null>(
    null,
  );
  const [editTitle, setEditTitle] = useState("");
  const [editError, setEditError] = useState("");
  const [updating, setUpdating] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);

  // Carga los proyectos del backend al montar
  useEffect(() => {
    fetchProjects();
  }, []);

  // Refresca la lista de proyectos
  const fetchProjects = async () => {
    setLoading(true);
    setApiError("");
    try {
      const res = await fetch("/api/sites");
      const data = await res.json();

      setProjects(data.sites || []);
    } catch {
      setApiError("No se pudieron cargar los proyectos.");
    }
    setLoading(false);
  };

  // Crea un nuevo proyecto (POST /api/sites)
  const handleCreate = async () => {
    setError("");
    if (projects.length >= FREE_PROJECT_LIMIT) return;
    if (!newName.trim()) {
      setError("El nombre es obligatorio");

      return;
    }
    const res = await fetch("/api/sites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newName }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "No se pudo crear el proyecto");

      return;
    }
    setProjects([data.site, ...projects]);
    setCreating(false);
    setNewName("");
  };

  // Elimina un proyecto (DELETE /api/sites/[id])
  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Seguro que quieres borrar este proyecto?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/sites/${id}`, { method: "DELETE" });

      if (res.ok) {
        setProjects(projects.filter((p) => p._id !== id));
      } else {
        setApiError("No se pudo borrar el proyecto.");
      }
    } catch {
      setApiError("Error al borrar el proyecto.");
    }
    setDeleting(null);
  };

  // --- Edición: abre el modal con datos del proyecto a editar
  const openEdit = (project: any) => {
    setEditing({ id: project._id, title: project.title });
    setEditTitle(project.title);
    setEditError("");
  };

  // PATCH para editar el título de un proyecto (PATCH /api/sites/[id])
  const handleEdit = async () => {
    setEditError("");
    if (!editTitle.trim()) {
      setEditError("El título es obligatorio");

      return;
    }
    setUpdating(true);
    const res = await fetch(`/api/sites/${editing?.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle }),
    });
    const data = await res.json();

    setUpdating(false);
    if (!res.ok) {
      setEditError(data.error || "No se pudo actualizar");

      return;
    }
    // Actualiza en la lista
    setProjects(projects.map((p) => (p._id === data.site._id ? data.site : p)));
    setEditing(null);
  };

  useEffect(() => {
    if (creating) {
      createInputRef.current?.focus();
    }
  }, [creating]);

  useEffect(() => {
    if (editing) {
      editInputRef.current?.focus();
    }
  }, [editing]);

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Mis proyectos</h2>
        {projects.length < FREE_PROJECT_LIMIT ? (
          <Button startContent={<Plus />} onClick={() => setCreating(true)}>
            Nuevo proyecto
          </Button>
        ) : (
          <Button
            color="warning"
            startContent={<Lock />}
            variant="bordered"
            onClick={() => router.push("/pricing")}
          >
            Mejorar plan
          </Button>
        )}
      </div>

      {/* Errores generales */}
      {apiError && (
        <Alert className="mb-4" color="danger">
          {apiError}
        </Alert>
      )}

      {/* Estado de carga */}
      {loading && (
        <Card className="flex flex-col items-center gap-6 py-12">
          <span className="text-default-500">Cargando proyectos...</span>
        </Card>
      )}

      {/* Sin proyectos */}
      {!loading && projects.length === 0 && (
        <Card className="flex flex-col items-center gap-6 py-12">
          <span className="text-default-500">Todavía no tienes proyectos.</span>
          <Button startContent={<Plus />} onClick={() => setCreating(true)}>
            Crear mi primer proyecto
          </Button>
        </Card>
      )}

      {/* Listado de proyectos */}
      <div className="grid gap-6">
        {projects.map((project) => (
          <Card
            key={project._id}
            className="flex items-center justify-between px-6 py-4"
          >
            <div>
              <div className="font-medium">{project.title}</div>
              <div className="text-xs text-default-400">
                Creado el {new Date(project.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge color="success">activo</Badge>
              <Button
                size="sm"
                startContent={<Eye />}
                onClick={() => router.push(`/${project.slug}`)}
              >
                Ver
              </Button>
              <Button
                color="secondary"
                size="sm"
                startContent={<Pencil />}
                onClick={() => openEdit(project)}
              >
                Editar
              </Button>
              <Button
                color="danger"
                disabled={deleting === project._id}
                size="sm"
                startContent={<Trash />}
                variant="light"
                onClick={() => handleDelete(project._id)}
              >
                {deleting === project._id ? "Borrando..." : "Borrar"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal para crear proyecto */}
      {creating && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Card className="p-8 w-full max-w-sm flex flex-col gap-5">
            <h3 className="text-lg font-semibold">Nuevo proyecto</h3>
            {error && <Alert color="danger">{error}</Alert>}
            <Input
              ref={createInputRef}
              label="Nombre del proyecto"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <div className="flex gap-2">
              <Button onClick={handleCreate}>Crear</Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setCreating(false);
                  setError("");
                  setNewName("");
                }}
              >
                Cancelar
              </Button>
            </div>
            <div className="text-xs text-default-400">
              Límite de {FREE_PROJECT_LIMIT} proyecto en el plan Free.
            </div>
          </Card>
        </div>
      )}

      {/* Modal para editar proyecto */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Card className="p-8 w-full max-w-sm flex flex-col gap-5">
            <h3 className="text-lg font-semibold">Editar proyecto</h3>
            {editError && <Alert color="danger">{editError}</Alert>}
            <Input
              ref={editInputRef}
              label="Título del proyecto"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <div className="flex gap-2">
              <Button isLoading={updating} onClick={handleEdit}>
                Guardar
              </Button>
              <Button
                disabled={updating}
                variant="ghost"
                onClick={() => setEditing(null)}
              >
                Cancelar
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Aviso de límite para plan FREE */}
      {projects.length >= FREE_PROJECT_LIMIT && (
        <div className="mt-8 text-center">
          <Alert className="inline-block" color="warning">
            Has alcanzado el máximo de proyectos en el plan Free.
            <Button
              className="ml-2"
              color="warning"
              size="sm"
              variant="light"
              onClick={() => router.push("/pricing")}
            >
              Mejorar plan
            </Button>
          </Alert>
        </div>
      )}
    </div>
  );
}

/*
  - Carga proyectos del usuario autenticado vía API (GET /api/sites)
  - Permite crear, editar (PATCH) y borrar (DELETE) proyectos de forma robusta
  - UX completo: feedback en todos los casos y control de estados
  - El botón "Ver" te lleva a la ruta pública del proyecto (por implementar)
  - Documentado para escalar con lógica real de BBDD
*/
