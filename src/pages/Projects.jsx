import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Calendar, 
  Clock, 
  Users, 
  ChevronRight, 
  Plus, 
  Search,
  CheckCircle2,
  AlertTriangle,
  Zap,
  MoreVertical,
  Settings2
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge, Input, Select } from '../components/ui/Forms';
import Modal from '../components/ui/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../hooks/useData';
import { useToast } from '../hooks/useToast';

const ProjectCard = ({ project, onManage }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'On Track': return 'text-green-500 bg-green-500/10';
      case 'At Risk': return 'text-amber-500 bg-amber-500/10';
      case 'Overdue': return 'text-red-500 bg-red-500/10';
      case 'Completed': return 'text-primary-500 bg-primary-500/10';
      default: return 'text-slate-500 bg-slate-500/10';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-6 group hover:border-primary-500/30 transition-all border-transparent"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary-500 transition-colors">
            <Briefcase size={24} />
          </div>
          <div>
            <h3 className="font-black text-lg text-slate-900 dark:text-white leading-tight">{project.name}</h3>
            <p className="text-xs text-slate-500 font-bold">{project.client}</p>
          </div>
        </div>
        <Badge variant={project.status === 'On Track' ? 'success' : project.status === 'At Risk' ? 'warning' : 'danger'}>
          {project.status}
        </Badge>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-400">
          <span>Development Progress</span>
          <span className="text-primary-500">{project.progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            className="h-full bg-primary-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex flex-col gap-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deadline</p>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Calendar size={14} className="text-primary-500" />
            {project.deadline}
          </div>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex flex-col gap-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Team</p>
          <div className="flex -space-x-2">
            {project.team.map((member, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-primary-500 border-2 border-white dark:border-slate-900 text-[8px] font-black flex items-center justify-center text-white">
                {member}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1 text-[10px] font-black uppercase tracking-widest py-2.5 h-auto" onClick={() => onManage(project)}>
          <Settings2 size={14} className="mr-2" /> Workflow
        </Button>
        <Button variant="ghost" className="w-10 h-10 p-0 rounded-xl">
          <Zap size={16} />
        </Button>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { projects, addProject } = useData();
  const { addToast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', client: '', deadline: '' });

  const filteredProjects = useMemo(() => {
    return projects.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.client.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, projects]);

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.name || !newProject.client || !newProject.deadline) {
      addToast('Please fill all fields', 'error');
      return;
    }
    
    addProject({
      id: `PJ-${Math.floor(Math.random() * 1000)}`,
      ...newProject,
      progress: 0,
      status: 'On Track',
      team: ['Admin']
    });
    
    addToast('New project initialized!', 'success');
    setIsModalOpen(false);
    setNewProject({ name: '', client: '', deadline: '' });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Active Projects</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Monitoring operational workflows and delivery timelines.</p>
        </div>
        <Button className="gap-2 shadow-primary-500/30" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> New Project
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Active', value: projects.length, color: 'text-primary-500' },
          { label: 'On Track', value: projects.filter(p => p.status === 'On Track').length, color: 'text-green-500' },
          { label: 'At Risk', value: projects.filter(p => p.status === 'At Risk').length, color: 'text-amber-500' },
          { label: 'Overdue', value: projects.filter(p => p.status === 'Overdue').length, color: 'text-red-500' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-4 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Filter projects by name or client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary-500/50"
        />
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p) => (
            <ProjectCard key={p.id} project={p} onManage={(proj) => addToast(`Opening workflow for ${proj.name}`, 'warning')} />
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Initialize New Project Pipeline"
        footer={
          <div className="flex gap-3 w-full">
            <Button variant="secondary" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button className="flex-1" onClick={handleAddProject}>Launch Project</Button>
          </div>
        }
      >
        <div className="space-y-5 py-2">
          <Input 
            label="Project Identification" 
            placeholder="e.g. Website Overhaul v2" 
            value={newProject.name}
            onChange={(e) => setNewProject({...newProject, name: e.target.value})}
            className="h-12"
          />
          <Input 
            label="Associated Client" 
            placeholder="Search client list..." 
            value={newProject.client}
            onChange={(e) => setNewProject({...newProject, client: e.target.value})}
            className="h-12"
          />
          <Input 
            label="Delivery Deadline" 
            type="date"
            value={newProject.deadline}
            onChange={(e) => setNewProject({...newProject, deadline: e.target.value})}
            className="h-12"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Projects;
