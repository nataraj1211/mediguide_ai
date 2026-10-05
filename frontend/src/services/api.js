const getAuthHeaders = () => {
  const token = localStorage.getItem('mediguide_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // Symptom Analysis
  analyzeSymptoms: async (payload) => {
    const res = await fetch('/api/symptoms/analyze', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to analyze symptoms.');
    }
    return data;
  },

  // Image Upload and Analysis
  analyzeImage: async (formData) => {
    const token = localStorage.getItem('mediguide_token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const res = await fetch('/api/images/analyze', {
      method: 'POST',
      headers,
      body: formData
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to analyze image.');
    }
    return data;
  },

  // Healthcare Discovery
  getNearbyHealthcare: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/healthcare/nearby?${query}`);
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to load healthcare facilities.');
    }
    return data.data;
  },

  searchHealthcare: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/healthcare/search?${query}`);
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to search healthcare facilities.');
    }
    return data.data;
  },

  getHealthcareById: async (id) => {
    const res = await fetch(`/api/healthcare/${id}`);
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Facility not found.');
    }
    return data.data;
  },

  getEmergencyResources: async () => {
    const res = await fetch('/api/healthcare/emergency');
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error('Failed to load emergency contacts.');
    }
    return data;
  },

  // History
  getHistory: async () => {
    const res = await fetch('/api/history', {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to load history.');
    }
    return data.data;
  },

  getHistoryDetail: async (id) => {
    const res = await fetch(`/api/history/${id}`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to fetch history details.');
    }
    return data.data;
  },

  deleteHistoryItem: async (id) => {
    const res = await fetch(`/api/history/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to delete record.');
    }
    return data;
  },

  // Feedback
  submitFeedback: async (payload) => {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to submit feedback.');
    }
    return data;
  },

  // Admin Endpoints
  getAdminStats: async () => {
    const res = await fetch('/api/admin/stats', {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to load admin stats.');
    }
    return data;
  },

  createFacility: async (payload) => {
    const res = await fetch('/api/admin/facilities', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to create facility.');
    }
    return data.data;
  },

  updateFacility: async (id, payload) => {
    const res = await fetch(`/api/admin/facilities/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to update facility.');
    }
    return data.data;
  },

  deleteFacility: async (id) => {
    const res = await fetch(`/api/admin/facilities/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to delete facility.');
    }
    return data;
  },

  toggleVerifyFacility: async (id) => {
    const res = await fetch(`/api/admin/facilities/${id}/toggle-verify`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to toggle verification.');
    }
    return data.data;
  }
};
