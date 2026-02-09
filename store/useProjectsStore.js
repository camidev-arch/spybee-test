import { create } from 'zustand';

const useProjectsStore = create((set, get) => ({
  // Data
  projects: [],
  filteredProjects: [],
  
  // UI State
  currentPage: 1,
  itemsPerPage: 10,
  searchQuery: '',
  sortBy: 'alphabetical', // 'alphabetical', 'incidents', 'rfi', 'tasks'
  viewMode: 'table', // 'table', 'map'
  selectedProject: null,
  
  // Auth
  isAuthenticated: false,
  user: null,

  // Actions
  setProjects: (projects) => {
    set({ projects, filteredProjects: projects });
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query, currentPage: 1 });
    get().filterAndSortProjects();
  },

  setSortBy: (sortBy) => {
    set({ sortBy, currentPage: 1 });
    get().filterAndSortProjects();
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  setViewMode: (mode) => {
    set({ viewMode: mode });
  },

  setSelectedProject: (project) => {
    set({ selectedProject: project });
  },

  login: (user) => {
    set({ isAuthenticated: true, user });
  },

  logout: () => {
    set({ isAuthenticated: false, user: null });
  },

  filterAndSortProjects: () => {
    const { projects, searchQuery, sortBy } = get();
    
    let filtered = [...projects];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.city?.toLowerCase().includes(query) ||
        project.address?.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        
        case 'incidents': {
          const aIncidents = a.incidents?.filter(i => i.item === 'incidents' && i.status === 'active').length || 0;
          const bIncidents = b.incidents?.filter(i => i.item === 'incidents' && i.status === 'active').length || 0;
          return bIncidents - aIncidents;
        }
        
        case 'rfi': {
          const aRFI = a.incidents?.filter(i => i.item === 'RFI' && i.status === 'active').length || 0;
          const bRFI = b.incidents?.filter(i => i.item === 'RFI' && i.status === 'active').length || 0;
          return bRFI - aRFI;
        }
        
        case 'tasks': {
          const aTasks = a.incidents?.filter(i => i.item === 'task' && i.status === 'active').length || 0;
          const bTasks = b.incidents?.filter(i => i.item === 'task' && i.status === 'active').length || 0;
          return bTasks - aTasks;
        }
        
        default:
          return 0;
      }
    });

    set({ filteredProjects: filtered });
  },

  // Computed values
  getPaginatedProjects: () => {
    const { filteredProjects, currentPage, itemsPerPage } = get();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProjects.slice(startIndex, endIndex);
  },

  getTotalPages: () => {
    const { filteredProjects, itemsPerPage } = get();
    return Math.ceil(filteredProjects.length / itemsPerPage);
  },

  getItemCounts: (project) => {
    if (!project.incidents) return { incidents: 0, rfi: 0, tasks: 0 };
    
    const incidents = project.incidents.filter(i => i.item === 'incidents' && i.status === 'active').length;
    const rfi = project.incidents.filter(i => i.item === 'RFI' && i.status === 'active').length;
    const tasks = project.incidents.filter(i => i.item === 'task' && i.status === 'active').length;
    
    return { incidents, rfi, tasks };
  }
}));

export default useProjectsStore;
