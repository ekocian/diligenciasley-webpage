import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { userService, Tasks, authService } from '../services/api';

const TasksPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [loading, setLoading] = useState(true);

  const showMessage = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setMessage(text);
    setMessageType(type);
  };

  const loadTasks = async () => {
    try {
      const tasks = await userService.getTasksByUser();
      setTasks(tasks);
      setMessage('');
    } catch (error) {
      showMessage(error instanceof Error ? error.message : 'Error al cargar tareas', 'error');
      // Si hay error de autenticación, redirigir al login
      if (error instanceof Error && error.message.includes('autorizado')) {
        setTimeout(() => navigate('/platform'), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      showMessage('Sesión cerrada', 'success');
      setTimeout(() => navigate('/platform'), 1000);
    } catch (error) {
      showMessage(error instanceof Error ? error.message : 'Error al cerrar sesión', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  if (loading && !tasks?.length) {
    return (
      <div className="main-container">
        <Card className="auth-card">
          <div className="text-center">Cargando...</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="main-container">
      <Card className="auth-card">
        {message && <Message severity={messageType} text={message} className="mb-3" />}
        {tasks.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">Mis Tareas</h2>
            
            <div className="flex flex-column gap-4 mb-5">
              {tasks.map(task => (
                <Card key={task.id} className="task-card">
                  <div className="task-content">
                    <div className="task-description mb-3">
                      <h4 className="text-lg font-medium mb-2">Descripción:</h4>
                      <p className="text-gray-700 line-height-3">{task.description}</p>
                    </div>
                    
                    <div className="task-status">
                      <span className="font-semibold">Estado: </span>
                      <span className={`px-2 py-1 border-round text-sm font-medium ${
                        task.state.name === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                        task.state.name === 'En Proceso' ? 'bg-blue-100 text-blue-800' :
                        task.state.name === 'Completada' ? 'bg-green-100 text-green-800' :
                        task.state.name === 'Cancelada' ? 'bg-red-100 text-red-800' :
                        task.state.name === 'En Revisión' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.state.name}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex flex-column gap-3">
              <Button
                label="Volver al perfil"
                icon="pi pi-user"
                className="w-full"
                onClick={() => navigate('/platform/perfil')}
                disabled={loading}
                severity="info"
              />
              <Button
                label="Cerrar sesión"
                icon="pi pi-sign-out"
                className="w-full"
                onClick={handleLogout}
                disabled={loading}
                severity="secondary"
              />
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-5">
              <i className="pi pi-inbox text-6xl text-gray-400 mb-3"></i>
              <h3 className="text-xl text-gray-600 mb-2">No tienes tareas asignadas</h3>
              <p className="text-gray-500">Cuando se te asignen tareas, aparecerán aquí.</p>
            </div>
            
            <div className="flex flex-column gap-3">
              <Button
                label="Volver al perfil"
                icon="pi pi-user"
                className="w-full"
                onClick={() => navigate('/platform/perfil')}
                disabled={loading}
                severity="info"
              />
              <Button 
                label="Cerrar sesión" 
                icon="pi pi-sign-out" 
                className="w-full" 
                onClick={handleLogout} 
                disabled={loading}
                severity="secondary"
              />
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default TasksPage;